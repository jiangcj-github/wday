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
    let { isWindowScroll } = props;
    this.state = {
      isWindowScroll: isWindowScroll
    };
  }

  async componentDidMount() {
    let controller = new NewsController();
    let result = await controller.getNewsList();
    console.log("view news", result);
    this.setState({
      newsList: result
    });

    (this.state.isWindowScroll ? window : document.querySelector(".news-wrap")).onscroll = () => {
      // didmount 只执行一次。应该放在onscroll里
      let arr = [];
      Object.keys(this.refs).forEach(v => {
        let dom = ReactDom.findDOMNode(this.refs[v]);
        arr.push({
          name: v,
          value: dom.offsetTop
        });
      });

      arr.forEach(v => {
        let dom = this.state.isWindowScroll ? document.documentElement : document.querySelector(".news-wrap");

        let num =  this.state.isWindowScroll ? -120 : 20;
        if (dom.scrollTop >= v.value - num) {
          console.log("该");

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
      if(this.state.isWindowScroll && document.documentElement.scrollTop < 115) {
        console.log("clear card");
        this.setState({
          cardMonth: ""
        });
      }
    };
  }

  componentWillUnmount() {
    (this.state.isWindowScroll ? window : document.querySelector(".news-wrap")).onscroll = null;
  }

  render() {
    let {history} = this.props;
    return (
      <div className="scroll-sign">
        <div className="news-list-by-day">
          {
            // TODO controller 中处理数组，每项有自己卡片该显示的数据
            // this.state.newsList && this.state.newsList.map((v, index) => {
            //   if(index === 0) {
            //     return <NewsDayItem ref={`Day${index}`} showList={true}  news={v.news} cardMonth={v.cardMonth} cardDay={v.cardDay} cardDayis={v.cardDayis} cardWeek={v.cardWeek}/>
            //   }
            //   return <NewsDayItem ref={`Day${index}`} showList={false} news={v.news} cardMonth={v.cardMonth} cardDay={v.cardDay} cardDayis={v.cardDayis} cardWeek={v.cardWeek}/>
            // })
          }

          <NewsDayItem history={history} ref="test1" news={[1,2,3]} cardMonth="1yue" cardDay="20" cardDayis="zuotian" cardWeek="1"/>
          <NewsDayItem history={history} ref="test2" news={[1,2,3]} cardMonth="2yue" cardDay="22" cardDayis="jintian" cardWeek="2"/>
          <NewsDayItem history={history} ref="test3" news={[1,2,3]} cardMonth="3yue" cardDay="23" cardDayis="mingtian" cardWeek="3"/>
          <NewsDayItem history={history} ref="test4" news={[1,2,3]} cardMonth="1yue" cardDay="20" cardDayis="zuotian" cardWeek="1"/>

        </div>

        <div className={"top-card " + ( this.state.cardMonth ? "run" : "stop" )}>
          {/* 跟着滚动的卡片日历 */}
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
                <div className="jump" >
                  <img src={this.imageDict.$_news_next_normal} />
                </div>
              </div>
            </div>
          }
          {/* 新快讯通知 */}
          {
            !this.state.hasMore &&
            <div className={"has-more-news " + ( this.state.cardMonth ? "run" : "stop" ) }>
              <span>有n条新快讯！</span>
            </div>
          }
        </div>
      </div>
    )
  }
}


