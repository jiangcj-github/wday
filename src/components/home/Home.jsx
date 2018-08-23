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
    this.scrollFunction = this.scrollFunction.bind(this);
  }

  scrollFunction() {
    let go = document.querySelector(".go-to-top");
    let dom = document.querySelector(".news-wrap");
    if (document.documentElement.scrollTop > dom.offsetHeight || document.documentElement.scrollTop < 300) {
      go.style.visibility = "hidden";
    }
    else {
      go.style.visibility = "visible";
    }
  }

  componentDidMount() {
    // 滚动判断快讯是否滚出屏幕
    window.addEventListener("scroll", this.scrollFunction);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollFunction);
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
              <NewsListComponent show={true} isWindowScroll={false} history={history}/>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
