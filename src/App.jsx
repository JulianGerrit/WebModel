import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Index from "./components/Index";
//TODO Web Template Studio: Add routes for your new pages here.
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
          <Redirect exact path = "/" to = "/Index" />
          <Route path = "/Index" component = { Index } />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
