import React, {Component} from 'react';
import ViewBase from "../../ViewBase";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import ArticleController from "../../../class/article/ArticleController"
import UserController from "../../../class/user/UserController";
import LoginController from "../../../class/login/LoginController";
import Alert from "../../../common/components/Alert";

export default class ArticleDetail extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alertContent: ""
    };
    this.addFavourite = this.addFavourite.bind(this);
    this.goodClick = this.goodClick.bind(this);
    this.badClick = this.badClick.bind(this);
    this.addCollect = this.addCollect.bind(this);
  }

  // 添加/移除 收藏
  async addCollect(item) {
    if (!LoginController().isLogin()) {
      this.bus.emit("showLoginDialog");
      return;
    }
    console.log(123,item);
    let data = await UserController().setCollect(2, item.id, !item.isCollect);
    if (data.msg) {
      this.setState({showAlert: true, alertContent: data.msg});
      return;
    }

    this.setState({showAlert: true, isCollect: !item.isCollect,  alertContent: !item.isCollect ? "收藏成功" : "取消收藏成功"});
  }

  async componentDidMount() {
    let controller = new ArticleController();
    let id = this.getQuery("id");
    let result = await controller.getArticleDetail(id);
    console.log("ASDASD", result);
    this.setState({
      articleDetail: result,
      id: result && result.id,
      author: result && result.author,
      date: result && result.date,
      isCollect: result && result.isCollect,
      like: result && result.like,
      speak: result && result.speak,
      tags: result && result.tags,
      title: result && result.title,
      topImg: result && result.topImg,
      content: result && result.content,
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
    let {title, author, speak, date, topImg, content, tags, like, isCollect, id, alertContent, showAlert} = this.state;
    let {history} = this.props;
    return (
      <div className="article-main" ref="aaaa">
        <div className="left-tool">
          <div className="love-div"></div>
          <span className="article-love-span">{like}赞</span>
          <div className="share-div"></div>
          <span className="article-share-span">分享</span>
          <div className={ (isCollect ? "isfav " : "notfav ") + "favourite"}
            onClick={this.addCollect.bind(this,{id, isCollect})}
          >
            <div className={ (isCollect ? "isfav " : "notfav ") +"favourite-div" }></div>
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
                      v.pid ? <span key={index} onClick={() => history.push(`/project/detail/id=${v.pid}`)}  className="tag-project tag">{v.nam}</span>
                      : <span key={index} onClick={() => history.push(`/search/word=${v.nam}`)} className="tag-normal tag">{v.nam}</span>
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

                  <div className={ (isCollect ? "isfav " : "notfav ") + "favourite"} >
                    <div className={ (isCollect ? "isfav " : "notfav ") +"favourite-div" }></div>
                    <span className="favourite-span">收藏</span>
                  </div>

                </div>
              </div>
            </div> : null
        }

        {/*提示*/}
        {showAlert &&
        <Alert content={alertContent} onClose={() => this.setState({showAlert: false})}/>}

      </div>
    )
  }
}

