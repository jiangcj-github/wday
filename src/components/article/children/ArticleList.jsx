import React, {Component} from 'react';
import ViewBase from "../../ViewBase";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import "../stylus/articlelist.styl"
import ArticleController from "../../../class/article/ArticleController"
import LoginController from "../../../class/login/LoginController";

export default class ArticleList extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {
      articleList: [],
    };
    this.page = 1;
    this.changeFav = this.changeFav.bind(this);
    this.scrollFunction = this.scrollFunction.bind(this);
    this.addMoreArticle = this.addMoreArticle.bind(this);
    this.can = true;
  }

  //滚动函数
  async scrollFunction() {
    if (this.can === false) {
      return;
    }
    let dom = document.querySelector(".article");
    if (dom.scrollHeight - document.documentElement.scrollTop < 400) {
      this.addMoreArticle(this.page, 1);
    }
  }

  // 加载函数
  async addMoreArticle(page, num) {
    this.can = false;
    let controller = new ArticleController();
    let result2 = await controller.getArticleList(page + 1, num);
    this.can = true;
    this.setState({
      articleList: this.state.articleList.concat(result2),
    });
    result2.length > 0 && this.page++;
  }

  async componentDidMount() {
    let controller = new ArticleController();
    let result = await controller.getArticleList(this.page, 1);
    console.log(result);
    this.setState({
      articleList: result
    });

    //对文章滑到底部的滚动检测
    window.addEventListener("scroll", this.scrollFunction);

  }

  // 改变文章收藏状态
  changeFav(id) {
    console.log(this.loginCheck(), id);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollFunction);
  }

  render() {
    let {history} = this.props;
    let isLogin = !!LoginController().loginInfo.userPhone;
    return (
      <div className="article">
        <ul>
          {this.state && this.state.articleList && this.state.articleList.map((v, index) => (
            <li key={index}>
              {/* 根据是否有文章大图 切换显示 */}
              {
                v.img ?
                  <div className="article-has-img">
                    <div>
                      <p className="article-title" onClick={() => history.push(`/article/detail?id=${v.id}`)}>
                        {v.title && v.title.length > 36 ? v.title.shearStr(36) : v.title}
                      </p>
                      <p className="article-content">
                        {v.content && v.content.length > 100 ? v.content.shearStr(100) : v.content}
                      </p>
                    </div>
                    <div>
                      <img src={v.img} onClick={() => history.push(`/article/detail?id=${v.id}`)}/>
                    </div>
                  </div>
                  :
                  <div className="article-no-img">
                    <p className="article-title" onClick={() => history.push(`/article/detail?id=${v.id}`)}>
                      {v.title && v.title.length > 29 ? v.title.shearStr(29) : v.title}

                    </p>
                    <p className="article-content">
                      {v.content && v.content.length > 75 ? v.content.shearStr(75) : v.content}
                    </p>
                  </div>
              }
              <div className="article-info">
                <div className="left-info">
                  {/* 作者 */}
                  <span className="article-author">{v.author}</span>
                  {/* 文章日期 */}
                  <span className="article-date">{v.date}</span>

                </div>
                <div className="right-info">
                  {/* 阅读次数 */}
                  <div className="watch">
                    <div className="watch-div"></div>
                    <span className="watch-span">{v.read}</span>
                  </div>
                  {/* 点赞次数 */}
                  <div className="love">
                    <div className="love-div"></div>
                    <span className="love-span">{v.like}</span>
                  </div>
                  {/* 收藏 */}
                  {
                    isLogin ?
                      <div className={(v.favourite ? "isfav " : "notfav ") + "favourite"}
                           onClick={this.changeFav.bind(this, v.id)}>
                        <div className={(v.favourite ? "isfav " : "notfav ") + "favourite-div"}></div>
                        <span className="favourite-span">收藏</span>
                      </div> :
                      <div className="notfav favourite"
                           onClick={() => this.bus.emit("showLoginDialog")}>
                        <div className="notfav favourite-div"></div>
                        <span className="favourite-span">收藏</span>
                      </div>
                  }
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="need-more" onClick={() => this.addMoreArticle(this.page, 1)}>
          <span>加载更多</span>

        </div>
      </div>
    )
  }
}

