import React, { Component } from 'react';
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

export default class ArticleList extends ViewBase {
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
    console.log("初次result state",this.state.articleList);
    //对文章滑到底部的滚动检测
    let scrollFlag = true;
    window.onscroll = async ()=> {
      let dom = document.querySelector(".article");
      if ( dom.scrollHeight - document.documentElement.scrollTop < 400  && scrollFlag) {
        console.log("need 加载更多");
        scrollFlag = false;
        let controller = new ArticleController();
        let result2 = await controller.getArticleList({ct: (this.state.page + 1), ps: 10, issue: 1534687251});

        this.setState({
          articleList: this.state.articleList.concat(result2),
          page: this.state.page + 1
        });
        console.log("再次result state",this.state.articleList);
        scrollFlag = true;
        console.log(this.state.page + "页`````````````````````````````````````````");
      }
    }

  }

  // 改变文章收藏状态
  changeFav(id) {

  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  render() {
    let {history} = this.props;
    console.log(history,555);
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
                  <span className="article-author">{v.author}</span>
                  <span className="article-date">{v.date}</span>
                  {
                    this.state.tags && this.state.tags.map((v, index) => (
                      <span key={index} className="tag-name">{v}</span>
                    ))
                  }
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
                  <div className={(v.favourite ? "isfav " : "notfav ") + "favourite"}
                       onClick={this.changeFav.bind(v.id, this)}>
                    <div className={(v.favourite ? "isfav " : "notfav ") + "favourite-div"}></div>
                    <span className="favourite-span">收藏</span>
                  </div>

                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="need-more">
          <span>加载更多</span>

        </div>
      </div>
    )
  }
}

