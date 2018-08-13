import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import {AsyncComponent} from './core'

import "./common/css/base.styl";
import "./common/css/reset.styl";
import "./common/component/style/index.styl";
import Header from "./components/headerAndFooter/Header.jsx";
import Footer from "./components/headerAndFooter/footer.jsx";


let loginController;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { initDone: false };
    let Loign = AsyncComponent(()=>import("./components/login/Login.jsx"), {controller:loginController});
    let HomeComponent = AsyncComponent(()=>import("./components/home/Home.jsx"));

    let Routers = [
      { path: "/home", component: HomeComponent }
    ];
  }


  render() {
    return (
      <div>空的</div>
    );
  }
}
