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

import "./stylus/newslist.styl";
import NewsController from "../../class/news/NewsController";
import NewsDayItem from "./NewsDayItem";

export default class NewsList extends ViewBase {
  constructor(props) {
    super(props);
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
    document.querySelector(".scroll-sign").onscroll = () => {
    // window.onscroll = () => {
      arr.forEach((v, index) => {
        // 这里可以直接取传入给组件的值
        if (document.documentElement.scrollTop > v.value) {
          console.log("card change");
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
      if(document.documentElement.scrollTop < 115) {
        this.setState({
          cardMonth: ""
        });

      }
    };
  }

  render() {
    return (
      <div className="scroll-sign">
        <div className="news-list">
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


