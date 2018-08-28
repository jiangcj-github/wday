import React, { Component } from 'react';
import ViewBase from "../../ViewBase";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import "../stylus/newsinfo.styl"
import Thumbs from "../../../common/components/thumbs/index";
import NewsController from "../../../class/news/NewsController";

export default class NewsInfo extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {
      newsDetail: {}
    }

  }

  async componentDidMount() {
    let id = this.getQuery("id");
    let controller = new NewsController();
    let result = await controller.getNewsDetail(id);
    this.setState({
      newsDetail: result
    });

  }

  render() {
    let detail = this.state.newsDetail;
    console.log("detail", detail);
    return (

      <div className="news">
        {this.state.newsDetail &&
          <div className="news-main">
            <div className="date-card">
              <div className="date-card-main">
                <p className="month">{detail && detail.cardMonth}</p>
                <p className="day">{detail && detail.cardDay}</p>
              </div>
              <div className="date-card-other">
                <p className="date-is">{detail && detail.cardDayis}</p>
                <p className="week">{detail && detail.cardWeek}</p>
              </div>
            </div>
            <div className="news-date">{detail && detail.time}</div>
            <div className="news-title">{detail && detail.title}</div>
            <div className="news-content">{detail && detail.content}</div>
            <div className="news-thumbs">
              <Thumbs goodCount={detail.like} badCount={detail.dislike}/>
            </div>
          </div>

        }
      </div>
    )
  }
}

