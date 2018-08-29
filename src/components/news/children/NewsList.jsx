import React, {Component} from 'react';
import ViewBase from "../../ViewBase";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';
import NewsListComponent from "./NewsListComponent";


export default class NewsList extends ViewBase{
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    let {history} = this.props;
    return (
      <div className="news-list">
        <div className="list-main">
          <NewsListComponent isWindowScroll={true}  history={history} />
        </div>
      </div>

    );
  }
}