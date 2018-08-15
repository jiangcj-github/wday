import React, { Component } from 'react';
import ViewBase from "../ViewBase";
import {
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import "./stylus/newsdayitem.styl"
import Thumbs from "../../common/components/thumbs/index";

export default class NewsDayItem extends ViewBase {
  constructor(props) {
    super(props);
    let {cardMonth, cardDay, cardDayis, cardWeek, news, showList} = props;
    // this.state = {
    //   cardMonth: "7yue",
    //   cardDay: "02",
    //   cardDayis: "今天",
    //   cardWeek: "星期五",
    //   newsTitle: "aaaa",
    //   newsContent: "正如多名评论人士所报道的那样，该计划可能有助于缓解比特币巨头的一些可疑现金流问题正如多名评论人士所报道的那样，该计划可能有助于缓解比特币巨头的一些可疑现金流问题。",
    // };
    this.state = {
        cardMonth: cardMonth,
        cardDay: cardDay,
        cardDayis: cardDayis,
        cardWeek: cardWeek,
        news: news,
        showList: false,
        newsTitle: "aaaa",
        newsContent: "正如多名评论人士所报道的那样，该计划可能有助于缓解比特币巨头的一些可疑现金流问题正如多名评论人士所报道的那样，该计划可能有助于缓解比特币巨头的一些可疑现金流问题。",
      };
  }

  render() {
    return (
      <div className="news-day-item">
        {/* 每天的日历卡片 */}
        <div className="date-card">
          <div className="date-card-main">
            <p className="month">{this.state && this.state.cardMonth}</p>
            <p className="day">{this.state && this.state.cardDay}</p>
          </div>
          <div className="date-card-other">
            <p className="date-is">{this.state && this.state.cardDayis}</p>
            <p className="week">{this.state && this.state.cardWeek}</p>
          </div>
          {
            this.state && this.state.showList &&
            <div className="jump">
            <img src={this.imageDict.$_news_next_normal}/>
            </div>
          }
        </div>
        {/* 每天的快讯*/}
        <div className="news-item">
          <div className="news-time">
            <span>19: 00</span>
          </div>
          <div className="time-line"><i>·</i></div>
          <div className="news-main">
            <div className="news-title">{this.state.newsTitle}</div>
            <div className="news-content">{this.state.newsContent}</div>
            <div className="news-thumbs">
              <Thumbs />
            </div>
          </div>

        </div>
      </div>
    );
  }

}