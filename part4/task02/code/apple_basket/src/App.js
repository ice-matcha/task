import React, { Component } from 'react';
import Total from "./components/total.js";
import List from './components/list.js';
import "./app.css";

class App extends Component 
{
  render () {
    return (
      <div className="app">
        <Total></Total>
        <List></List>
      </div>
    )
  }
}

export default App;