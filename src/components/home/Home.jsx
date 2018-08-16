import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import "./stylus/home.styl"
import ViewBase from "../ViewBase";
import ProjectList from "./children/ProjectList";
import ArticleList from "../article/ArticleList";
import NewsListComponent from "../news/NewsListComponent";

export default class Home extends ViewBase {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
      // // 隐藏快讯的fixed 抓狂
      // window.onscroll = ()=> {
      //   let card = document.querySelector(".hidden-card");
      //   if(card) {
      //     card.style.visibility = "hidden";
      //   }
      //
      // }
    }

    render() {

        return (
            <div className="home-wrap">
                <ProjectList/>
                <div className="article-wrap">
                  <ArticleList />
                </div>
                <div className="news-wrap">
                  <NewsListComponent scrollType="home"/>
                </div>
            </div>
        );
    }
}
