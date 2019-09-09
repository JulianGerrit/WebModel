import React, { Component } from "react";
import styles from "./index.module.css";

class Index extends Component {
  constructor() {
    super();
    this.state = { 
      code: null,
      response: null
      }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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


  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <textarea name="code" onChange={this.handleChange} value={this.state.code} id="" cols="30" rows="10"></textarea>
          <button>Submit</button>
        </form>
        {this.state.response ? JSON.stringify(this.state.response) : <p></p>}
      </React.Fragment>
    );
  }
}

export default Index;