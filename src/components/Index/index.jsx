import React, { Component } from "react";
import styles from "./index.module.css";

class Index extends Component {
  
  componentDidMount(){
    
  }

  render() {
    return (
      <React.Fragment>
        <form action="/Index" method="POST">
          <textarea name="data" id="" cols="30" rows="20"></textarea>
          <button action="submit">Submit</button>
        </form>
      </React.Fragment>
    );
  }
}

export default Index;