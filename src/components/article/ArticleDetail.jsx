import React, {Component} from 'react';
import ViewBase from "../ViewBase";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import "./stylus/articleDetail.styl"

export default class ArticleDetail extends ViewBase {
  constructor(props) {
    super(props);
    let {controller} = props;
    controller.setView(this);
    this.state = {
      articleDetail: {}
    };
    this.getArticleDetail = controller.getArticleDetail.bind(controller);

  }

  async componentDidMount() {
    await this.getArticleDetail();

  }

  render() {
    let {title, author, speak, date, topImg, content} = this.state.articleDetail;
    return (
      <div className="article-detail">
        <div className="left-tool">

        </div>
        {
          title?<div className="article-content">
            <h1>{title}</h1>

          </div>:null
        }

      </div>
    )
  }
}

