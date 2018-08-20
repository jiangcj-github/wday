import React, { Component } from "react";
import {
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import ViewBase from "../../components/ViewBase";
import List from "./children/NewsList";
import Detail from "./children/News";

export default class NewsManage extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //设置导航栏菜单
    // this.bus.emit("selectItem","project");
  }

  render() {
    let {match} = this.props;

    const list = ({ match, location, history }) =>
      <List location={location} history={history}/>;

    const detail = ({ match, location }) =>
      <Detail location={location}/>;

    return (
      <div className="project-route">
        <Switch>
          <Route path={`${match.url}/list`} component={list} />
          <Route path={`${match.url}/detail`} component={detail} />
          <Redirect to={`${match.url}/list`}/>
        </Switch>
      </div>
    );
  }
}
