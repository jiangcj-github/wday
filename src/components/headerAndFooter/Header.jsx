import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect,
  Switch
} from 'react-router-dom'
import ViewBase from "../ViewBase";
import './stylus/header.styl'

export default class Header extends ViewBase {
  constructor(props) {
      super(props);
      this.state = {}
  }

  async componentDidMount() {

  }

  render() {
    return (
      <div className="header">

      </div>
    )
  }
}
