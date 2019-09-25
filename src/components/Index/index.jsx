import React, { Component } from "react";
import styles from "./index.module.css";
import AceEditor from 'react-ace';
import Graph from "./graph"

import 'brace/mode/python';
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/theme/cobalt';
import LoadingOverlay from "react-loading-overlay";


class Index extends Component {
  constructor() {
    super();
    this.state = { 
      loopCode: null,
      startingValues: null,
      syntax: "python",
      response: null,
      stage: "editor"
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeLoopEditor = this.handleChangeLoopEditor.bind(this);
    this.handleChangeStartEditor = this.handleChangeStartEditor.bind(this);
    this.backToEditor = this.backToEditor.bind(this);
    this.backToGraph = this.backToGraph.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()
    try {
    if(!(this.state.loopCode && this.state.startingValues)) {
      throw new Error("notFilledIn")
    }

    this.setState({stage:"loading"});

    fetch('/Index', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      // body: JSON.stringify(this.state)
      body: JSON.stringify({
        loopCode: this.state.loopCode,
        startingValues: this.state.startingValues,
        syntax: this.state.syntax
      })
    }
    ).then(res => res.json())
    .then(
      (res) => {
        this.setState({
          response:res,
          stage:"graph"
      })
        }
      );
    } catch (e) {
      console.log(e)
    }
  }

  handleChange(event) { // for any html
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

  render() {
    if (this.state.stage === "editor" || this.state.stage === "loading") {
      return (
            <LoadingOverlay
                active={this.state.stage === "loading"}
                spinner
                text='Parsing data...'
            >
                {this.state.response ? <button onClick={this.backToGraph}>←Back to graph</button> : ""}
                <form onSubmit={this.handleSubmit}>
                  <label className={styles.syntaxLabel}>Syntax:</label>
                  <select style={{margin: 20}} name="syntax" onChange={this.handleChange}
                          className={styles.selectSyntax}>
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                  </select>
                  <button className={styles.submitButton}>Submit</button>

                  <br/>
                  <AceEditor
                      mode={this.state.syntax}
                      theme="cobalt"
                      name="loopCode"
                      value={this.state.loopCode ? this.state.loopCode : ""} // die haakjes moeten leeg zijn Alex anders komt wat er in staat elke keer terug als je het weghaalt in de IDE
                      className={styles.loopEditor}
                      onChange={this.handleChangeLoopEditor}
                      width='45vw'
                  />

                  <AceEditor
                      mode={this.state.syntax}
                      theme="cobalt"
                      name="startingValues"
                      value={this.state.startingValues ? this.state.startingValues : ""} // die haakjes moeten leeg zijn Alex anders komt wat er in staat elke keer terug als je het weghaalt in de IDE
                      className={styles.startEditor}
                      onChange={this.handleChangeStartEditor}
                      width='45vw'
                  />
                </form>
            </LoadingOverlay>
      );
    } else if (this.state.stage === "graph") {
      return (
          <React.Fragment>
            <button onClick={this.backToEditor}>←Back to editor</button>
            <Graph res={this.state.response}/>
          </React.Fragment>)
    }
  }
}

export default Index;