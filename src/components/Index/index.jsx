import React, { Component } from "react";
import styles from "./index.module.css";
import AceEditor from 'react-ace';

import 'brace/mode/python';
import 'brace/mode/java';
import 'brace/mode/c_cpp';
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
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeLoopEditor = this.handleChangeLoopEditor.bind(this)
    this.handleChangeStartEditor = this.handleChangeStartEditor.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
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
  }

  handleChange(event) { // for any html
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleChangeLoopEditor(newValue) { // only for the editor
    this.setState({
      loopCode: newValue
    });
  }

  handleChangeStartEditor(newValue) { // only for the editor
    this.setState({
      startingValues: newValue
    });
  }

  render() {

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>

          <AceEditor 
            mode={this.state.syntax} 
            theme="cobalt" 
            name="code" 
            value={this.state.loopCode ? this.state.loopCode : ""}  
            className={styles.loopEditor} 
            onChange={this.handleChangeLoopEditor} 
          />

          <AceEditor 
            mode={this.state.syntax} 
            theme="cobalt" 
            name="code" 
            value={this.state.startingValues ? this.state.startingValues : ""}
            className={styles.startEditor} 
            onChange={this.handleChangeStartEditor} 
          />
          <br/>
            <label>Syntax:</label> <select style={{ margin: 20 }}name="syntax" onChange={this.handleChange}>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="c_cpp">C/C++</option>
            </select>

            <button>Submit</button>
        </form>
        {this.state.response ? JSON.stringify(this.state.response) : <p></p>}
      </React.Fragment>
    );
  }
}

export default Index;