import React, {Component} from 'react';
import ViewBase from "../../ViewBase";
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import NewsListComponent from "../../home/children/NewsListComponent";
import "../stylus/newslist.styl";

export default class NewsList extends ViewBase{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //设置导航栏菜单
    this.bus.emit("selectItem","news");
  }

  render() {
    return (
      <div className="news-list">
        <div className="list-main">
          <NewsListComponent scrollType="window" />
        </div>
      </div>

    );
  }
}