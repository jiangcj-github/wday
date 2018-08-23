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
    this.state = {};
    this.nowIndex = 0;
    this.addMoreNews = this.addMoreNews.bind(this);
    this.scrollFunction = this.scrollFunction.bind(this);
    this.scrollTop = this.scrollTop.bind(this);
  }


  // 获取更多快讯
  async addMoreNews(page) {
    let controller = new NewsController();
    let result = await controller.getNewsList();
    // return result;
    this.setState({
      newsList: this.state.newsList.concat(result)
    })
  }

  // 快讯回到顶部 瞬间回去
  scrollTop(){
    let dom = document.querySelector(".news-wrap");
    dom.scrollTop = 0;
    dom.scrollIntoView(true);
    this.nowIndex = 0;
  }

  scrollFunction(target ,isWindowScroll) {
    let fix = isWindowScroll ? 110 : -10;
    let sc_result = this.state.newsList;
    let day = ReactDom.findDOMNode(this.refs[`Day${this.nowIndex}`]);
    if (day) {
      if (target.scrollTop >= (day.offsetTop + fix)) {
        this.setState({
          cardMonth: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("MM"),
          cardDay: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("dd"),
          cardWeek: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("www"),
          // TODO 今天是哪天
          cardDayis: this.nowIndex,
        });
        this.nowIndex++;
        console.log("this.nowIndex", this.nowIndex);
      } else if (this.nowIndex !== 0) {
        this.nowIndex--;
        console.log("this.nowIndex", this.nowIndex);
        this.setState({
          cardMonth: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("MM"),
          cardDay: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("dd"),
          cardWeek: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("www"),
          cardDayis: this.nowIndex,
        });
        // this.setState((preState, ()=> {
        //
        // }));
      }
    }

    // window滚动需要删除卡片
    if(isWindowScroll && document.documentElement.scrollTop < 100) {
      console.log("clear card");
      this.setState({
        cardMonth: ""
      });
    }

    // 滑动到底部需要加载更多
    // scrollTop + clientHeight == scrollHeight
    if(target.scrollTop + target.clientHeight === target.scrollHeight ) {
      console.log("到底啦");
      this.addMoreNews();
      console.log("addMoreNews 完事啦");
    }
  }

  async componentDidMount() {
    let controller = new NewsController();
    let result = await controller.getNewsList();
    let {isWindowScroll} = this.props;
    console.log("view news", result);

    this.setState({newsList: result});

    if (result.length > 0) {
      // 添加滚动事件
      let scrollTarget = isWindowScroll ? window : document.querySelector(".news-wrap");
      scrollTarget.addEventListener("scroll", this.scrollFunction.bind(this,scrollTarget, isWindowScroll));
    }

  }

  componentWillUnmount() {
    (this.props.isWindowScroll ? window : document.querySelector(".news-wrap")).removeEventListener("scroll", this.scrollFunction);
  }

  render() {
    let {history, show} = this.props;
    return (
      <div className="scroll-sign">
        <div className="news-list-by-day">
          {
            this.state.newsList && this.state.newsList.map((v, index) => {
              return (index === 0 && show) ?
                <NewsDayItem key={index} mark={index} ref={`Day${index}`} dayDate={v.dayDate} showList={true} news={v.news}
                             history={history}/>
                :
                <NewsDayItem key={index} ref={`Day${index}`} mark={index} dayDate={v.dayDate} showList={false} news={v.news}
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
                    <div className="jump" onClick={() => history.push("/news/list")}>
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

        {/* 快讯滚动顶部按钮 未完 */}
        <div className="go-to-top" onClick={this.scrollTop}></div>
      </div>
    )
  }
}


