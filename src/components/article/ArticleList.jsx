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

export default class ArticleList extends ViewBase {
  constructor(props) {
    super(props);
    let { controller } = props;
    console.log(controller);
    controller.setView(this);
    this.getArticleList = controller.getArticleList.bind(controller);

  }

  async componentDidMount() {
    await this.getArticleList();

  }

  render() {
    return (
      <div className="article">
        <ul>
          {this.state && this.state.articleList && this.state.articleList.map((v,index) =>(
            <li key={index}>
              /* 根据有无img 来切换不同的文章列表样式 */
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
                (<div>
                  <p className="article-title">
                    {v.title}
                  </p>
                  <p className="article-content">
                    {v.content}
                  </p>
                </div>)
              }

              <div className="article-info">
                <div>
                  <span className="article-author">{v.author}</span>
                  <span className="article-date">{v.date}</span>
                </div>
                <div>
                  <img src="../../../static/web/icon.png" />
                  <span className="article-read-span">10.1k</span>
                  <img src="../../../static/web/icon.png" />
                  <span className="article-love-span">20.2k</span>
                  <img src="../../../static/web/icon.png" />
                  <span className="article-favorite-span">收藏</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

