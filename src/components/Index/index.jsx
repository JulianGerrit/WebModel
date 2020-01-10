import React, { Component } from "react";
import styles from "./index.module.css";
import AceEditor from 'react-ace';
import LoadingOverlay from "react-loading-overlay";
import Graph from "./graph"
import Download from '@axetroy/react-download';

import 'brace/mode/python';
import 'brace/theme/cobalt';

class Index extends Component {
  constructor() {
    super();
    this.state = { 
      loopCode: null,
      startingValues: null,
      // xAxisRes: null,
      syntax: "python",
      response: null,
      stage: "editor",
      error: null
      };
    this.uploadFile = this.uploadFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeLoopEditor = this.handleChangeLoopEditor.bind(this);
    this.handleChangeStartEditor = this.handleChangeStartEditor.bind(this);
    this.backToEditor = this.backToEditor.bind(this);
    this.backToGraph = this.backToGraph.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    try {
      if(!(this.state.loopCode && this.state.startingValues)) {
        throw new Error("notFilledIn")
      }

      this.setState({stage:"loading"});

      fetch('/Index', {
        method: 'POST',
	mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          loopCode: this.state.loopCode,
          startingValues: this.state.startingValues,
          syntax: this.state.syntax
        })
      }
      ).then(res => res.json())
      .then(
        (res) => {
          // je kan gewoon zien dat freek dit heeft geschreven aangezien er geen semicolons gebruikt zijn
          console.log(res);
          if (res.message === "Request failed with status code 500"){
            this.setState({
              response: res,
              stage: "editor",
              error:"syntax"
            })
          } else {
            // this.setState({xAxisRes: null})
            // try{ 
              // for(let a of res.vars){
              //   if(a.axis === true)
              //   if(a.name === this.state.xAxis) {
              //       this.setState({xAxisRes: a});
              //       break;
              //   }
              // }
              
              // if(!this.state.xAxisRes) {
              //   this.setState({
              //     response:res,
              //     error: "x",
              //     stage: "editor"
              //   })
              // } else {
                this.setState({
                  response:res,
                  error: null,
                  stage:"graph"
                });
              // }

            // } catch(e) {
              // this.setState({
                // response:res,
                // stage:"editor",
                // error: "server"
              // });
            // }
          
            
          }
        }
      );
    } catch (e) {
      console.log(e)
    }
  }

  handleChange(event) { // ALWAYS try using this change handler first before making a seperate one line below
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  // The editors need separate handleChange functions or it will error out
  handleChangeLoopEditor(newValue) {
    this.setState({
      loopCode: newValue
    });
  }

  handleChangeStartEditor(newValue) {
    this.setState({
      startingValues: newValue
    });
  }


  backToEditor(){
    this.setState({
      stage:"editor"
    });
  }

  backToGraph(){
    this.setState({
      stage:"graph"
    });
  }

  uploadFile(event) { 
    var file = event.target.files[0];
    var reader = new FileReader();
    var that = this;
    
    
    reader.onload = function(evt) {
        var parsedFile = JSON.parse(evt.target.result);
        // console.log(JSON.parse(evt.target.result));
        that.setState({
          loopCode: parsedFile.loopCode,
          startingValues: parsedFile.startingValues
        });
    };
    reader.readAsText(file);
}

  render() {
    if (this.state.stage === "editor" || this.state.stage === "loading") {
      return (
        <LoadingOverlay
          active={this.state.stage === "loading"}
          spinner
          text='Parsing data...'
        >
          {this.state.error === "syntax" ? 
          <div className="alert alert-danger" role="alert"> Syntax error, please try again. </div>
          : ""}

          {this.state.error === "x" ? 
          <div className="alert alert-danger" role="alert"> Defined x-axis variable {this.state.xAxis} is not in data. please try again</div>
          :""}

          {this.state.error === "server" ? 
          <div className="alert alert-danger" role="alert"> Internal server error, please try again </div>
          :""}

          <form onSubmit={this.handleSubmit}>
            {this.state.response && !this.state.error ? <button className={styles.submitButton} onClick={this.backToGraph}>← Back to graph</button> : ""}
              <button className={styles.submitButton}>Submit</button>
              {/* <label className={styles.xAxisLabel}>X-axis variable:</label> */}
              {/* <input  onChange={this.handleChange} placeholder="x" name="xAxis" type="text"></input> */}
              <br/>
              <label className={styles.loopEditorLabel}>Model</label>
              <label className={styles.startEditorLabel}>Start instructions</label>
              <br/>

              <AceEditor
                id="loopCode"
                mode="python"
                theme="cobalt"
                name="loopCode"
                value={this.state.loopCode ? this.state.loopCode : ""}
                className={styles.loopEditor}
                onChange={this.handleChangeLoopEditor}
                width='45vw'
              />

              <AceEditor
                id="startingValues"
                mode="python"
                theme="cobalt"
                name="startingValues"
                value={this.state.startingValues ? this.state.startingValues : ""}
                className={styles.startEditor}
                onChange={this.handleChangeStartEditor}
                width='45vw'
              />
            </form>
            <Download
              file="webmodel.json"
              content={JSON.stringify({loopCode: this.state.loopCode, startingValues: this.state.startingValues})}>
              <button className={styles.submitButton}>Download model</button>
            </Download>
            
            <input type="file"
            name="myFile"
            className={styles.submitButton}
            onChange={this.uploadFile}
            />
            

        </LoadingOverlay>
      );
    } else if (this.state.stage === "graph") {
      return (
          <React.Fragment>
            <button className={styles.submitButton} onClick={this.backToEditor}>← Back to editor</button>
            <Graph res={this.state.response}/>
          </React.Fragment>)
    }
  }
}

export default Index;
