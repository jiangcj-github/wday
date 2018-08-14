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
import Thumbs from "../../common/component/thumbs";

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

  goodClick() {
    alert("我点了good");
  }

  badClick() {
    alert("我点了bad");
  }

  render() {
    let {title, author, speak, date, topImg, content, tags} = this.state.articleDetail;
    console.log("tags", tags);
    return (
      <div className="article-main">
        <div className="left-tool">
          <div className="tool-icon">
            <img src="../../../static/web/icon.png" />

          </div>
          <span className="article-love-span">点赞</span>
          <div className="tool-icon">
            <img src="../../../static/web/icon.png" />

          </div>
          <span className="article-share-span">分享</span>
          <div className="tool-icon">
            <img src="../../../static/web/icon.png" />

          </div>
          <span className="article-favorite-span">收藏</span>
        </div>
        <Thumbs
          goodCount = "12"
          badCount = "222"
          share = "link-content"
          goodClicked = {false}
          badClicked = {false}
          goodClick = {this.goodClick}
          badClick = {this.badClick}
        />
        {
          title ?
            <div className="article-detail">
              <h1>{title}</h1>
              <div className="article-info">
                <div className="article-author-info">
                  <span className="author">{author}</span>
                  <span className="speak">{speak}</span>
                </div>
                <div>
                  <span className="date">{date}</span>
                </div>
              </div>
              <img src={topImg} className="top-image" />
              <div className="article-content">
                {content}
              </div>
              <div className="article-bottom">
                <div className="tag-place">
                  {
                    tags && tags.map((v, index) => (
                      <span key={index} className="tag-name">{v}</span>
                    ))
                  }
                </div>
                <div className="article-fun">
                  <img src="../../../static/web/icon.png" />
                  <span className="article-love-span">点赞</span>
                  <img src="../../../static/web/icon.png" />
                  <span className="article-share-span">分享</span>
                  <img src="../../../static/web/icon.png" />
                  <span className="article-favorite-span">收藏</span>
                </div>
              </div>
            </div> : null
        }



      </div>
    )
  }
}

