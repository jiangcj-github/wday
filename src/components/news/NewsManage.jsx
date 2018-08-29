import React, { Component } from "react";
import {
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import ViewBase from "../../components/ViewBase";
import List from "./children/NewsList";
import Detail from "./children/NewsInfo";
import "./stylus/news.styl";

export default class NewsManage extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    let {match} = this.props;

    const list = ({ match, location, history }) =>
      <List location={location} history={history}/>;

    const detail = ({ match, location }) =>
      <Detail location={location}/>;

    return (
      <div className="news-route">
        <Switch>
          <Route path={`${match.url}/list`} component={list} />
          <Route path={`${match.url}/detail`} component={detail} />
          <Redirect to={`${match.url}/list`}/>
        </Switch>
      </div>
    );
  }
}
