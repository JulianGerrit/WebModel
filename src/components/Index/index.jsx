import React, { Component } from "react";
import styles from "./index.module.css";
import AceEditor from 'react-ace';

import 'brace/mode/c_cpp';
import 'brace/mode/python';
import 'brace/theme/solarized_dark';


class Index extends Component {
  constructor() {
    super();
    this.state = { 
      code: null,
      response: null,
      syntax: "python"
      }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeEditor = this.handleChangeEditor.bind(this)
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

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleChangeEditor(newValue) {
    this.setState({
      code: newValue
    });
  }

  render() {

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <AceEditor 
          mode={this.state.syntax} 
          theme="solarized_dark" 
          name="code" 
          value={this.state.code ? this.state.code : ""}  
          className={styles.editor} 
          onChange={this.handleChangeEditor} 
          />
           Syntax: <select name="syntax" onChange={this.handleChange}>
              <option value="python">Python</option>
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