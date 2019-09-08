import React, { Component } from "react";
import styles from "./index.module.css";

class Index extends Component {
  constructor() {
    super();
    this.state = { code: null}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    fetch('/Index', {
      method: 'POST',
      body: this.state.code,
    }
    ).then(res => res.json())
    .then(
      (res) => {
      //   this.setState({
      //     data:res.data
      // })
      console.log(res)
        }
      );
  }

  handleChange(event) {
    this.setState({ code: event.target.value })
  }


  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <textarea name="code" onChange={this.handleChange} value={this.state.code} id="" cols="30" rows="10"></textarea>
          <button>Submit</button>
        </form>
      </React.Fragment>
    );
  }
}

export default Index;