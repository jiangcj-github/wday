import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import "./stylus/home.styl"
import ViewBase from "../ViewBase";
import ProjectList from "./children/ProjectList";
import ArticleList from "../article/children/ArticleList";
import NewsListComponent from "./children/NewsListComponent";

export default class Home extends ViewBase {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //设置导航栏菜单
    this.bus.emit("selectItem", "home");

    // 滚动判断快讯是否滚出屏幕
    window.addEventListener("scroll", () => {
      let go = document.querySelector(".go-to-top");
      let dom = document.querySelector(".news-wrap");
      if(document.documentElement.scrollTop > dom.offsetHeight || document.documentElement.scrollTop <300){
        go.style.visibility = "hidden";
      }
      else {
        go.style.visibility = "visible";
      }
    });
  }

  render() {
    let {history} = this.props;
    return (
      <div className="home-wrap">
        <div className="home">
          {/*项目列表*/}
          <ProjectList history={history}/>
          {/*文章列表*/}
          <div className="article-wrap">
            <ArticleList history={history}/>
          </div>
          {/*快讯列表*/}
          <div className="remove-scroll-bar">
            <div className="news-wrap">
              <NewsListComponent isWindowScroll={false} history={history}/>
            </div>
          </div>
          {/* 快讯滚动顶部按钮 未完 */}
          <div className="go-to-top"></div>
        </div>
      </div>
    );
  }
}
