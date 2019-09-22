import React, { Component } from "react";
import styles from "./index.module.css";
import AceEditor from 'react-ace';

import 'brace/mode/python';
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/theme/cobalt';


class Index extends Component {
  constructor() {
    super();
    this.state = { 
      loopCode: null,
      startingValues: null,
      response: null,
      syntax: "python"
      }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeLoopEditor = this.handleChangeLoopEditor.bind(this);
    this.handleChangeStartEditor = this.handleChangeStartEditor.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()
    try {
    if(!(this.state.loopCode && this.state.startingValues)) {
      throw new Error("notFilledIn")
    }

    fetch('/Index', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(this.state)
    }
    ).then(res => res.json())
    .then(
      (res) => {
        this.setState({
          response:res
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

  render() {

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label className={styles.syntaxLabel}>Syntax:</label>
          <select style={{ margin: 20 }} name="syntax" onChange={this.handleChange} className={styles.selectSyntax}>
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
            value={this.state.loopCode ? this.state.loopCode: ""} // die haakjes moeten leeg zijn Alex anders komt wat er in staat elke keer terug als je het weghaalt in de IDE
            className={styles.loopEditor} 
            onChange={this.handleChangeLoopEditor}
          />

          <AceEditor
            mode={this.state.syntax} 
            theme="cobalt" 
            name="startingValues"
            value={this.state.startingValues ? this.state.startingValues: ""} // die haakjes moeten leeg zijn Alex anders komt wat er in staat elke keer terug als je het weghaalt in de IDE
            className={styles.startEditor} 
            onChange={this.handleChangeStartEditor}
          />

            
        </form>
        {this.state.response ? JSON.stringify(this.state.response) : ""}
      </React.Fragment>
    );
  }
}

export default Index;