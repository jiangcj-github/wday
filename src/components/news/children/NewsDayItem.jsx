import React from 'react';
import ViewBase from "../../ViewBase";
import {
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';


import "../stylus/newsdayitem.styl"
import Thumbs from "../../../common/components/thumbs/index";
import Alert from "../../../common/components/Alert";

export default class NewsDayItem extends ViewBase {
  constructor(props) {
    super(props);
    let {dayDate, news, showList, dayis} = props;
    let time = new Date(dayDate * 1000);
    this.state = {
        cardMonth: time.dateHandle("M") + "月",
        cardDay: time.dateHandle("dd"),
        cardDayis: dayis,
        cardWeek: time.dateHandle("www"),
        showList: showList,
        showAlert: false
      };
    this.today = Math.round(new Date().getTime()/1000);
    this.copyLink = this.copyLink.bind(this);
  }

  compareDate(time) {
    if(this.today - time < 86400) {
        return "今天";
    }
    return this.today - time > 86400 && this.today - time < 172800 ? "昨天" : new Date(time * 1000).dateHandle("MM-dd");
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

  render() {
    let { history, titleLen, contentLen, news } = this.props;
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
            </div>
          }
        </div>
        {/* 每天的快讯*/}
        {
          news && news.map((v, index) =>
            <div className="news-item" key={index}>
              <div className="news-time">
                <span>19: 00</span>
              </div>
              {/* 时间线 最后一个没有样式，实现快讯之间相连 */}
              <div className={"time-line" + ((index === news.length -1) ? "last" : "") }><i></i></div>
              <div className="news-main">
                <div className="for-hover">
                  <div className="news-title" onClick={()=>history.push(`/news/detail?id=${v.id}`)} >
                    {
                      v.title && v.title.length > titleLen ? v.title.shearStr(titleLen) : v.title
                    }
                  </div>
                  <div className="news-content" >
                    {
                      v.content && v.content.length > contentLen ? v.content.shearStr(contentLen) : v.content
                    }
                  </div>
                </div>
                <div className="news-thumbs">
                  <Thumbs goodCount={v.like} badCount={v.dislike} share={this.copyLink.bind(this, `${v.title} ${window.location.origin}/news/detail?id=${v.id}`)}/>
                </div>
              </div>

            </div>
          )
        }
        {/* 提示 */}
        {
          this.state.showAlert && <Alert content="复制成功"/>

        }

      </div>
    );
  }

}