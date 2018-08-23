import React, { Component } from 'react';
import ViewBase from "../../ViewBase";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import "../stylus/articleSearch.styl"
import ArticleController from "../../../class/article/ArticleController"
import LoginController from "../../../class/login/LoginController";

export default class ArticleSearch extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {
      articleList: [],
      tags : ["数字数字", "你瞅啥"],
      page: 1
    }
  }

  async componentDidMount() {
    let controller = new ArticleController();
    let result = await controller.getArticleList({ct: this.state.page, ps: 10, issue: 1534687251});
    console.log(result);
    this.setState({
      articleList: result
    });

  }

  // 改变文章收藏状态
  changeFav(id) {

  }

  render() {
    let {history} = this.props;
    let isLogin = !!LoginController().loginInfo.userPhone;
    return (
      <div className="article">
        <ul>
          {this.state && this.state.articleList && this.state.articleList.map((v,index) =>(
            <li key={index}>
              {/* 根据是否有文章大图 切换显示 */}
              {v.img ?
                (
                  <div className="article-has-img">
                    <div>
                      <p className="article-title" onClick={()=>history.push(`/article/detail?id=${v.id}`)}>
                        {v.title && v.title.toString().length > 36 ? v.title.toString().shearStr(36) : v.title.toString()}

                      </p>
                      <p className="article-content">
                        {v.content && v.content.toString().length > 100 ? v.content.toString().shearStr(100) : v.content.toString()}

                      </p>
                    </div>
                    <div>
                      <img src={v.img}/>
                    </div>
                  </div>
                ) :
                (<div className="article-no-img">
                  <p className="article-title" onClick={()=>history.push(`/article/detail?id=${v.id}`)}>
                    {v.title && v.title.toString().length > 29 ? v.title.toString().shearStr(29) : v.title.toString()}

                  </p>
                  <p className="article-content">
                    {v.content && v.content.toString().length > 75 ? v.content.toString().shearStr(75) : v.content.toString()}
                  </p>
                </div>)
              }
              {/* 文章信息，作者 时间 点赞数量及收藏等 */}
              <div className="article-info">
                <div className="left-info">
                  {/* 作者 */}
                  <span className="article-author">{v.author}</span>
                  {/* 文章日期 */}
                  <span className="article-date">{v.date}</span>
                  {/* 文章标签 */}
                  {
                    this.state.tags && this.state.tags.map((v, index) => (
                      <span key={index} className="tag-name">{v}</span>
                    ))
                  }
                </div>
                <div className="right-info">
                  {/* 阅读次数 */}
                  <div className="watch">
                    <div className="watch-div"></div>
                    <span className="watch-span">66</span>
                  </div>
                  {/* 点赞次数 */}
                  <div className="love">
                    <div className="love-div"></div>
                    <span className="love-span">55</span>
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
                           onClick={()=>this.bus.emit("showLoginDialog")}>
                        <div className="notfav favourite-div"></div>
                        <span className="favourite-span">收藏</span>
                      </div>
                  }
                </div>
              </div>
            </li>
          ))}
        </ul>

      </div>
    )
  }
}

