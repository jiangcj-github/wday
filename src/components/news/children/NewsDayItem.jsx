import React, { Component } from 'react';
import ViewBase from "../../ViewBase";
import {
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import "../stylus/newsdayitem.styl"
import Thumbs from "../../../common/components/thumbs/index";

export default class NewsDayItem extends ViewBase {
  constructor(props) {
    super(props);
    let {dayDate, news, showList, mark} = props;
    let time = new Date(dayDate * 1000);
    console.log("geted mark is ", mark);
    this.state = {
        cardMonth: time.dateHandle("M") + "月",
        cardDay: time.dateHandle("dd"),
        cardDayis: mark,
        cardWeek: time.dateHandle("www"),
        news: news,
        showList: showList
      };
  }

  render() {
    let { history } = this.props;
    return (
      <div className="news-day-item">
        {/* 每天的日历卡片 */}
        <div className="date-card">
          <div className="date-card-main">
            <p className="month">{this.state.cardMonth}</p>
            <p className="day">{this.state.cardDay}</p>
          </div>
          <div className="date-card-other">
            <p className="date-is">{this.state.cardDayis}</p>
            <p className="week">{this.state.cardWeek}</p>
          </div>
          {
            this.state.showList &&
            <div className="jump" onClick={()=>history.push('/news/list')}>
            <img src={this.imageDict.$_news_next_normal}/>
            </div>
          }
        </div>
        {/* 每天的快讯*/}
        {
          this.state.news && this.state.news.map((v, index) =>
            <div className="news-item" key={index}>
              <div className="news-time">
                <span>19: 00</span>
              </div>
              <div className="time-line"><i></i></div>
              <div className="news-main">
                <div className="for-hover">
                  <div className="news-title" onClick={()=>history.push(`/news/detail?id=${v.id}`)} >{v.title}</div>
                  <div className="news-content" >{v.content}</div>
                </div>
                <div className="news-thumbs">
                  <Thumbs />
                </div>
              </div>

            </div>
          )
        }

      </div>
    );
  }

}