import React, { Component } from "react";
import {
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import ViewBase from "../../components/ViewBase";
import ArticleDetail from "./children/ArticleDetail";
import "./stylus/article.styl";

export default class ArticleManage extends ViewBase {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    let {match} = this.props;

    const detail = ({match, location}) =>
      <ArticleDetail location={location}/>;

    return (
      <div className="article-route">
        <Switch>
          <Route path={`${match.url}/detail`} component={detail}/>
          <Redirect to={`${match.url}/detail?id=xxx`}/>
        </Switch>
      </div>
    );
  }
}
