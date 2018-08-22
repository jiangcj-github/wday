import React, {Component} from 'react';
import ViewBase from "../../ViewBase";
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import "../stylus/newslistcomponent.styl";
import NewsController from "../../../class/news/NewsController";
import NewsDayItem from "../../news/children/NewsDayItem";

export default class NewsListComponent extends ViewBase {
  constructor(props) {
    super(props);
    let {isWindowScroll} = props;
    this.state = {
      isWindowScroll: isWindowScroll
    };
  }

  async componentDidMount() {
    let controller = new NewsController();
    let result = await controller.getNewsList();
    console.log("view news", result);
    this.nowIndex = 0;
    this.setState({newsList: result});

    if (result.length > 0) {
      //抚平两种滚动的差距
      let fix = this.state.isWindowScroll ? 110 : -10;
      (this.state.isWindowScroll ? window : document.querySelector(".news-wrap")).onscroll = () => {
        let dom = this.state.isWindowScroll ? document.documentElement : document.querySelector(".news-wrap");
        let day = ReactDom.findDOMNode(this.refs[`Day${this.nowIndex}`]);
        if (day) {
          if (dom.scrollTop >= (day.offsetTop + fix)) {
            this.setState({
              newsList: result,
              cardMonth: result && result[this.nowIndex] && new Date(result[this.nowIndex].dayDate * 1000).dateHandle("MM"),
              cardDay: result && result[this.nowIndex] && new Date(result[this.nowIndex].dayDate * 1000).dateHandle("dd"),
              cardWeek: result && result[this.nowIndex] && new Date(result[this.nowIndex].dayDate * 1000).dateHandle("www"),
              // TODO 今天是哪天
              cardDayis: this.nowIndex,
            });
            this.nowIndex++;
          } else if (this.nowIndex !== 0) {
            this.nowIndex--;
            this.setState({
              newsList: result,
              cardMonth: result && result[this.nowIndex] && new Date(result[this.nowIndex].dayDate * 1000).dateHandle("MM"),
              cardDay: result && result[this.nowIndex] && new Date(result[this.nowIndex].dayDate * 1000).dateHandle("dd"),
              cardWeek: result && result[this.nowIndex] && new Date(result[this.nowIndex].dayDate * 1000).dateHandle("www"),
              cardDayis: this.nowIndex,
            });
          }
        }
        // window滚动需要删除卡片
        if(this.state.isWindowScroll && document.documentElement.scrollTop < 100) {
          console.log("clear card");
          this.setState({
            cardMonth: ""
          });
        }

      }
    }

  }

  componentWillUnmount() {
    (this.state.isWindowScroll ? window : document.querySelector(".news-wrap")).onscroll = null;
  }

  render() {
    let {history, show} = this.props;
    return (
      <div className="scroll-sign">
        <div className="news-list-by-day">
          {
            this.state.newsList && this.state.newsList.map((v, index) => {
              return (index === 0 && show) ?
                <NewsDayItem key={index} ref={`Day${index}`} dayDate={v.dayDate} showList={true} news={v.news}
                                 history={history}/>
                :
                <NewsDayItem key={index} ref={`Day${index}`} dayDate={v.dayDate} showList={false} news={v.news}
                             history={history}/>
            })
          }

        </div>

        <div className={"top-card " + (this.state.cardMonth ? "run" : "stop")}>
          {/* 跟着滚动的卡片日历 */}
          {
            this.state.cardMonth &&
            <div className="hidden-card">
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
                  show?
                    <div className="jump">
                      <img src={this.imageDict.$_news_next_normal}/>
                    </div>
                    : null
                }
              </div>
            </div>
          }
          {/* 新快讯通知 */}
          {
            !this.state.hasMore &&
            <div className={"has-more-news " + (this.state.cardMonth ? "run" : "stop")}>
              <span>有n条新快讯！</span>
            </div>
          }
        </div>
      </div>
    )
  }
}


