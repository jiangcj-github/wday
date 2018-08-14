import React, { Component } from 'react';
import ViewBase from "../ViewBase";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import "./stylus/newslist.styl"
import Thumbs from "../../common/components/thumbs/index";

export default class NewsList extends ViewBase {
  constructor(props) {
    super(props);
    let { controller } = props;
    console.log(controller);
    controller.setView(this);
    this.getNewsList = controller.getNewsList.bind(controller);
    this.setCard = this.setCard.bind(this);
  }

  async componentDidMount() {
    await this.getNewsList();
    window.onscroll = this.setCard;
  }

  setCard(e) {
    let doms = document.querySelectorAll(".news-list-item .date-card");
    doms.forEach((item, index) => {

      if(document.documentElement.scrollTop >= item.offsetTop + 100) {
        console.log("has");
        // console.log({
        //   cardMonth: item.querySelector(".month").innerText,
        //   cardDay: item.querySelector(".day").innerText,
        //   cardDayis: item.querySelector(".date-is").innerText,
        //   cardWeek: item.querySelector(".week").innerText,
        // });
        this.setState({
          cardMonth: item.querySelector(".month").innerText,
          cardDay: item.querySelector(".day").innerText,
          cardDayis: item.querySelector(".date-is").innerText,
          cardWeek: item.querySelector(".week").innerText,
        });
      }

    });
    if(document.documentElement.scrollTop < 100) {
      this.setState({
        cardMonth: ""
      });
    }

  }

  render() {
    return (
      <div className="news-list">
        {
          this.state && this.state.cardMonth &&
          <div className="hiddenCard">
            <div className="date-card">
              <div className="date-card-main">
                <p className="month">{this.state && this.state.cardMonth}</p>
                <p className="day">{this.state && this.state.cardDay}</p>
              </div>
              <div className="date-card-other">
                <p className="date-is">{this.state && this.state.cardDayis}</p>
                <p className="week">{this.state && this.state.cardWeek}</p>
              </div>
              <div className="jump">
                >
              </div>
            </div>
          </div>
        }

        {this.state && this.state.newsList && this.state.newsList.map((v,index) =>(
          <div className="news-list-item" key={index}>
            {/* 每天的日历卡片 */}
            <div className="date-card">
              <div className="date-card-main">
                <p className="month">{v.date}</p>
                <p className="day">{v.date+"day"}</p>
              </div>
              <div className="date-card-other">
                <p className="date-is">{v.date+"is"}</p>
                <p className="week">{v.date+"week"}</p>
              </div>
              <div className="jump">
                >
              </div>
            </div>
            {/* 每天的快讯*/}
            {
              v.data && v.data.map( (item, index2) => (
                <div className="news-item" key={index2}>
                  <div className="news-time">
                    <span>19: 00</span>

                  </div>
                  <div className="time-line"><i>@</i></div>
                  <div className="news-main">

                    <div className="news-title">{item.title}</div>
                    <div className="news-content">{item.content}</div>
                    <div className="news-thumbs">
                      <Thumbs />
                    </div>
                  </div>

                </div>
              ))
            }
          </div>

        ))}
      </div>
    )
  }
}

