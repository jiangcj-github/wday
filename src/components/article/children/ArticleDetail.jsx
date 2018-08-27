import React, {Component} from 'react';
import ViewBase from "../../ViewBase";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import "../stylus/articleDetail.styl";
import ArticleController from "../../../class/article/ArticleController"

export default class ArticleDetail extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {
      articleDetail: {}
    };
    this.addFavourite = this.addFavourite.bind(this);
    this.goodClick = this.goodClick.bind(this);
    this.badClick = this.badClick.bind(this);
  }

  async componentDidMount() {
    let controller = new ArticleController();
    let id = this.getQuery("id");
    let result = await controller.getArticleDetail(id);
    this.setState({
      articleDetail: result
    });
  }

  addFavourite() {

  }

  goodClick() {
    alert("我点了good");
  }

  badClick() {
    alert("我点了bad");
  }

  render() {
    let {title, author, speak, date, topImg, content, tags, like} = this.state.articleDetail;
    let {history} = this.props;
    return (
      <div className="article-main">
        <div className="left-tool">
          <div className="love-div"></div>
          <span className="article-love-span">{like}赞</span>
          <div className="share-div"></div>
          <span className="article-share-span">分享</span>
          <div className={ (this.state.favourite ? "isfav " : "notfav ") + "favourite"} >
            <div className={ (this.state.favourite ? "isfav " : "notfav ") +"favourite-div" }></div>
            <span className="favourite-span">收藏</span>
          </div>
        </div>

        {
          title ?
            <div className="article-detail">
              <h1>{title}</h1>
              <div className="article-info">
                {/* 文章作者 */}
                <div className="article-author-info">
                  <span className="author">{author}</span>
                  <span className="speak">{speak}</span>
                </div>
                {/* 文章日期 */}
                <div>
                  <span className="date">{date}</span>
                </div>
              </div>
              {/* 文章主题图 */}
              <img src={topImg} className="top-image" />
              <div className="article-content">
                {content}
              </div>
              {/* 文章 标签 */}
              <div className="article-bottom">
                <div className="tag-place">
                  {
                    tags && tags.map((v, index) => (
                      v.pid ? <span key={index} onClick={() => history.push(`/project/detail/id=${v.pid}`)}  className="tag-project tag">{v.name}</span>
                      : <span key={index} onClick={() => history.push(`/search/word=${v.name}`)} className="tag-normal tag">{v.name}</span>
                    ))
                  }
                </div>
                {/* 喜爱 分享 收藏 按钮组 */}
                <div className="right-info">

                  <div className="love">
                    <div className="love-div"></div>
                    <span className="love-span">{like}</span>
                  </div>

                  <div className="share">
                    <div className="share-div"></div>
                    <span className="share-span">分享</span>
                  </div>

                  <div className={ (this.state.favourite ? "isfav " : "notfav ") + "favourite"} >
                    <div className={ (this.state.favourite ? "isfav " : "notfav ") +"favourite-div" }></div>
                    <span className="favourite-span">收藏</span>
                  </div>

                </div>
              </div>
            </div> : null
        }

      </div>
    )
  }
}

