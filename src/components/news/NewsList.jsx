import React, { Component } from 'react';
import ViewBase from "../ViewBase";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import "./stylus/newslist.styl"

export default class NewsList extends ViewBase {
  constructor(props) {
    super(props);
    let { controller } = props;
    console.log(controller);
    controller.setView(this);
    this.getNewsList = controller.getNewsList.bind(controller);

  }

  async componentDidMount() {
    await this.getNewsList();

  }

  render() {
    return (
      <div className="newsList">
        <ul>
          {this.state && this.state.newsList && this.state.newsList.map((v,index) =>(
            <li key={index}>
              e,,
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

