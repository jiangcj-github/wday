import React, { Component } from 'react';
import ViewBase from "../ViewBase";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import "./stylus/articlelist.styl"
import ArticleController from "../../class/article/ArticleController"

export default class ArticleList extends ViewBase {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let controller = new ArticleController();
    let result = await controller.getArticleList();
    console.log(result);
    this.setState({
      articleList: result
    })
  }

  // 改变文章收藏状态
  changeFav(id) {

  }

  render() {
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
                      <p className="article-title">
                        {v.title}
                      </p>
                      <p className="article-content">
                        {v.content}
                      </p>
                    </div>
                    <div>
                      <img src={v.img}/>
                    </div>
                  </div>
                ) :
                (<div className="article-no-img">
                  <p className="article-title">
                    {v.title}
                  </p>
                  <p className="article-content">
                    {v.content}
                  </p>
                </div>)
              }
              {/* 文章信息，作者 时间 点赞数量及收藏等 */}
              <div className="article-info">
                <div className="left-info">
                  <span className="article-author">{v.author}</span>
                  <span className="article-date">{v.date}</span>
                </div>
                <div className="right-info">
                  <div className="watch">
                    <div className="watch-div"></div>
                    <span className="watch-span">66</span>
                  </div>
                  <div className="love">
                    <div className="love-div"></div>
                    <span className="love-span">55</span>
                  </div>
                  <div className={ (v.favourite ? "isfav " : "notfav ") + "favourite"} onClick={this.changeFav.bind(v.id, this)}>
                    <div className={ (v.favourite ? "isfav " : "notfav ") +"favourite-div" }></div>
                    <span className="favourite-span">收藏</span>
                  </div>

                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

