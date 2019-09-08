import React, { Component } from "react";
import axios from "axios";
import styles from "./index.module.css";

class Main extends Component {
  state = {
    todo:null}

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(res=>{
        this.setState({
            todo:res.data
        })
    })
    .catch(err=>console.log(err))
  }

  render() {
    return (
      <React.Fragment>
        {this.state.todo ? <p>{this.state.todo.title}</p> : <p>Loading...</p>}
      </React.Fragment>
    );
  }
}

export default Main;