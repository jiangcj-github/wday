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
import Alert from "../../../common/components/Alert";

export default class NewsInfo extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {
      newsDetail: {},
      showAlert: false
    };
    this.copyLink = this.copyLink.bind(this);
  }

  copyLink(msg) {
    let input = document.createElement("input");
    input.value = msg;
    document.body.appendChild(input);
    if(this.copy(input)) {
      this.setState({
        showAlert: true
      });
      setTimeout(()=>this.setState({
        showAlert: false
      }), 2000);
    }
    document.body.removeChild(input);
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
    return (
      <div className="news">
        {detail &&
          <div className="news-main">
            <div className="date-card">
              <div className="date-card-main">
                <p className="month">{detail.cardMonth}</p>
                <p className="day">{detail.cardDay}</p>
              </div>
              <div className="date-card-other">
                <p className="date-is">{detail.cardDayis}</p>
                <p className="week">{detail.cardWeek}</p>
              </div>
            </div>
            <div className="news-date">{detail.time}</div>
            <div className="news-title">{detail.title}</div>
            <div className="news-content">{detail.content}</div>
            <div className="news-thumbs">
              <Thumbs  id={detail.id} goodCount={detail.like} badCount={detail.dislike} share={this.copyLink.bind(this, detail.title )}/>

            </div>
          </div>
        }
        {
          this.state.showAlert &&
            <Alert content="复制成功"/>
        }
      </div>
    )
  }
}

