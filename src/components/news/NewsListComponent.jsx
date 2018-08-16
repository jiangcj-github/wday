import React, {Component} from 'react';
import ViewBase from "../ViewBase";
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import "./stylus/newslistcomponent.styl";
import NewsController from "../../class/news/NewsController";
import NewsDayItem from "./NewsDayItem";

export default class NewsListComponent extends ViewBase {
  constructor(props) {
    super(props);
    let { scrollType } = props;
    console.error(scrollType);
    this.state = {
      scrollType: scrollType || "window"
    };
  }

  async componentDidMount() {
    let controller = new NewsController();
    let result = await controller.getNewsList();
    this.setState({
      newsList: result
    });
    console.log("refs -> ", this.refs);
    let arr = [];
    Object.keys(this.refs).forEach((v, index) => {
      let dom = ReactDom.findDOMNode(this.refs[v]);
      console.log(dom);
      arr.push({
        name: v,
        value: dom.offsetTop
      });
    });
    console.log(arr);
    (this.state.scrollType === "window" ? window : document.querySelector(".news-wrap")).onscroll = () => {

      arr.forEach((v, index) => {
        let dom = this.state.scrollType === "window" ? document.documentElement : document.querySelector(".news-wrap");
        // 加上这个，两个页面都能平稳滚动。慢慢找哪里不对
        let num =  this.state.scrollType === "window" ? 0 : 20;
        if (dom.scrollTop >= v.value - num) {
          console.log(1111);
          this.setState({
            cardMonth: this.refs[v.name].state.cardMonth,
            cardDay: this.refs[v.name].state.cardDay,
            cardDayis: this.refs[v.name].state.cardDayis,
            cardContent: this.refs[v.name].state.cardContent,
            cardWeek: this.refs[v.name].state.cardWeek,
            cardTitle: this.refs[v.name].state.cardTitle,
          });
        }
      });
      // window滚动需要删除卡片
      if(this.state.scrollType === "window" && document.documentElement.scrollTop < 115) {
        console.log("clear state");
        this.setState({
          cardMonth: ""
        });
      }
    };
  }

  render() {
    return (
      <div className="scroll-sign">
        <div className="news-list-by-day">
          <NewsDayItem ref="test" news={""} cardMonth="1yue" cardDay="20" cardDayis="zuotian" cardWeek="1"/>
          <NewsDayItem ref="test2" news={""} cardMonth="2yue" cardDay="22" cardDayis="jintian" cardWeek="2"/>
          <NewsDayItem ref="test3" news={""} cardMonth="3yue" cardDay="23" cardDayis="mingtian" cardWeek="3"/>
        </div>

        <div className="top-card">
          {
            this.state && this.state.cardMonth &&
            <div className="hidden-card">
              <div className="date-card">
                <div className="date-card-main">
                  <p className="month">{this.state && this.state.cardMonth}</p>
                  <p className="day">{this.state && this.state.cardDay}</p>
                </div>
                <div className="date-card-other">
                  <p className="date-is">{this.state && this.state.cardDayis}</p>
                  <p className="week">{this.state && this.state.cardWeek}</p>
                </div>
                {/*<div className="jump">*/}
                  {/*<img src={this.imageDict.$_news_next_normal} />*/}
                {/*</div>*/}
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}


