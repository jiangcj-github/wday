import React, { Component } from 'react';
import ViewBase from "../ViewBase";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import './stylus/footer.styl'

export default class Footer extends ViewBase {
  constructor() {
      super();
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="footer">

      </div>
    )
  }
}

