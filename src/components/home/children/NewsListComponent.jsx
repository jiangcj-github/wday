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
import ConfigController from "../../../class/config/ConfigController";

export default class NewsListComponent extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: 0
    };
    this.nowIndex = 0;
    this.addMoreNews = this.addMoreNews.bind(this);
    this.scrollFunction = this.scrollFunction.bind(this);
    this.scrollTop = this.scrollTop.bind(this);
    this.addLatestNews = this.addLatestNews.bind(this);
    this.otherScrollFunction = this.otherScrollFunction.bind(this);
    this.windowScrollFunction = this.windowScrollFunction.bind(this);
  }

  // 获取更多快讯
  async addMoreNews(page) {
    console.log("add more");
    let controller = new NewsController();
    let result = await controller.getNewsList();
    // 上次的数据  最后一天时间戳 === 更多数据 第一天的时间戳    then 合并两个
    if (this.state.newsList[this.state.newsList.length - 1].dayDate === (result && result[0] && result[0].dayDate)) {
      let data = result;
      this.state.newsList[this.state.newsList.length - 1].concat(data.shift());

    }
    this.setState({
      newsList: this.state.newsList.concat(result)
    });
  }

  // 获取最新快讯
  async addLatestNews() {
    console.log("add Latest");
    // 对于快讯，只更新自己的数据， 对于接口，需要当前时间戳来计算还有多少条未读快讯
    ConfigController().setTimestamp(Date.now());
    let controller = new NewsController();
    let result = await controller.getNewsList();
    this.setState({
      newsList: result
    });
    // 更新数据成功后返回快讯顶部
    this.scrollTop();

  }

  // 快讯回到顶部 瞬间回去
  scrollTop() {
    let {isWindowScroll} = this.props;
    let dom = isWindowScroll ? document.documentElement : document.querySelector(".news-wrap");
    dom.scrollTop = 0;
    dom.scrollIntoView(true);
    this.nowIndex = 0;
  }

  // window滚动方法 快讯列表页
  windowScrollFunction() {
    let sc_result = this.state.newsList;
    let target = document.documentElement;
    let day = ReactDom.findDOMNode(this.refs[`Day${this.nowIndex}`]);
    if (day) {
      if (day.getBoundingClientRect().top <= 0) {
        this.setState({
          cardMonth: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("MM"),
          cardDay: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("dd"),
          cardWeek: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("www"),
          // TODO 今天是哪天
          cardDayis: this.nowIndex,
        });
        this.nowIndex++;
        return;
      }
      else if (this.nowIndex !== 0) {
        this.nowIndex--;
        this.setState({
          cardMonth: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("MM"),
          cardDay: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("dd"),
          cardWeek: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("www"),
          cardDayis: this.nowIndex,
        });
      }
    }

    // window滚动需要删除卡片 非空才删除，否则会报在已经卸载的页面setState的错误
    if (document.documentElement.scrollTop < 100 && this.state.cardMonth) {
      // console.log("clear card", document.documentElement.scrollTop );
      this.setState({
        cardMonth: ""
      });
    }

    // 滑动到底部需要加载更多
    // scrollTop + clientHeight == scrollHeight
    if (target.scrollTop + target.clientHeight === target.scrollHeight) {
      console.log("到底啦");
      this.addMoreNews();
      console.log("addMoreNews 完事啦");
    }
  }

  // 首页滚动方法
  otherScrollFunction(target) {
    let sc_result = this.state.newsList;
    let day = ReactDom.findDOMNode(this.refs[`Day${this.nowIndex}`]);
    if (day) {
      if (target.offsetTop >= day.getBoundingClientRect().top -110) {
        this.setState({
          cardMonth: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("MM"),
          cardDay: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("dd"),
          cardWeek: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("www"),
          // TODO 今天是哪天
          cardDayis: this.nowIndex,
        });
        this.nowIndex++;
        return;
      } else if (this.nowIndex !== 0) {
        this.nowIndex--;
        this.setState({
          cardMonth: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("MM"),
          cardDay: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("dd"),
          cardWeek: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("www"),
          cardDayis: this.nowIndex,
        });
      }
    }
    // 滑动到底部需要加载更多
    // scrollTop + clientHeight == scrollHeight
    console.log("AA -> ", target.scrollTop + target.clientHeight);
    console.log("BB -> ", target.scrollHeight);
    // 该加载的临界条件
    let condition = target.scrollHeight - (target.scrollTop + target.clientHeight) < 100;
    if (condition) {
      console.log("到底啦");
      this.addMoreNews();
      console.log("addMoreNews 完事啦");
    }
  }

  // 旧方法
  scrollFunction(target, isWindowScroll) {
    let fix = isWindowScroll ? 110 : -10;
    let fixR = isWindowScroll ? 0 : 104;
    let sc_result = this.state.newsList;
    let day = ReactDom.findDOMNode(this.refs[`Day${this.nowIndex}`]);
    console.log(1111, day, day.getBoundingClientRect());

    if (day && isWindowScroll) {
      if (day.getBoundingClientRect().top <= 0) {

      } else if (this.nowIndex !== 0) {
        this.nowIndex--;
        this.setState({
          cardMonth: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("MM"),
          cardDay: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("dd"),
          cardWeek: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("www"),
          cardDayis: this.nowIndex,
        });
      }
    }


    // try
    // if (day) {
    //   if (target.offsetTop >= day.getBoundingClientRect().top) {
    //     this.setState({
    //       cardMonth: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("MM"),
    //       cardDay: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("dd"),
    //       cardWeek: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("www"),
    //       // TODO 今天是哪天
    //       cardDayis: this.nowIndex,
    //     });
    //     this.nowIndex++;
    //     return;
    //   } else if (this.nowIndex !== 0) {
    //     this.nowIndex--;
    //     this.setState({
    //       cardMonth: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("MM"),
    //       cardDay: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("dd"),
    //       cardWeek: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("www"),
    //       cardDayis: this.nowIndex,
    //     });
    //   }
    // }


    // if (day) {
    //   if (target.scrollTop >= (day.offsetTop + fix)) {
    //     this.setState({
    //       cardMonth: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("MM"),
    //       cardDay: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("dd"),
    //       cardWeek: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("www"),
    //       // TODO 今天是哪天
    //       cardDayis: this.nowIndex,
    //     });
    //     this.nowIndex++;
    //     return ;
    //   } else if (this.nowIndex !== 0) {
    //     this.nowIndex--;
    //     this.setState({
    //       cardMonth: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("MM"),
    //       cardDay: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("dd"),
    //       cardWeek: sc_result && sc_result[this.nowIndex] && new Date(sc_result[this.nowIndex].dayDate * 1000).dateHandle("www"),
    //       cardDayis: this.nowIndex,
    //     });
    //   }
    // }

    // window滚动需要删除卡片 非空才删除，否则会报在已经卸载的页面setState的错误
    if (isWindowScroll && document.documentElement.scrollTop < 100 && this.state.cardMonth) {
      // console.log("clear card", document.documentElement.scrollTop );
      this.setState({
        cardMonth: ""
      });
    }

    // 滑动到底部需要加载更多
    // scrollTop + clientHeight == scrollHeight
    if (target.scrollTop + target.clientHeight === target.scrollHeight) {
      console.log("到底啦");
      this.addMoreNews();
      console.log("addMoreNews 完事啦");
    }
  }

  async componentDidMount() {
    let controller = new NewsController();
    let result = await
      controller.getNewsList();
    let {isWindowScroll} = this.props;
    console.log("view news", result);

    this.bus.on("updateNewsNum", "NewsListCom", num => {
      this.setState({
        hasMore: num
      });
    });

    this.setState({newsList: result});

    if (result.length > 0) {
      // 添加滚动事件
      let scrollDom = isWindowScroll ? window : document.querySelector(".news-wrap");
      isWindowScroll ?
        window.addEventListener("scroll", this.windowScrollFunction) :
        scrollDom.addEventListener("scroll",this.otherScrollFunction.bind(this, scrollDom));
    }

  }

  componentWillUnmount() {
    // 卸载全局通知
    this.bus.off("updateNewsNum", "NewsListCom");
    // 卸载滚动监听
    this.props.isWindowScroll ?
      window.removeEventListener("scroll", this.windowScrollFunction)
      : document.querySelector(".news-wrap").removeEventListener("scroll", this.otherScrollFunction);
  }

  render() {
    let {history, show, titleLen, contentLen} = this.props;
    return (
      <div className="scroll-sign">
        {/* 每天 */}
        <div className="news-list-by-day">
          {
            this.state.newsList && this.state.newsList.map((v, index) => {
              // TODO 判断 <今天> <昨天>
              // 若是第一条  根据情况设置跳转按钮显示
              return (index === 0 && show) ?
                <NewsDayItem key={index} mark={index} ref={`Day${index}`} dayDate={v.dayDate} showList={true}
                             news={v.news}
                             history={history} titleLen={titleLen} contentLen={contentLen}/>
                :
                <NewsDayItem key={index} ref={`Day${index}`} mark={index} dayDate={v.dayDate} showList={false}
                             news={v.news}
                             history={history} titleLen={titleLen} contentLen={contentLen}/>
            })
          }

        </div>
        {/* 跟着滚动的卡片日历 */}
        <div className={"top-card " + (this.state.cardMonth ? "run" : "stop")}>
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
                  show ?
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
            this.state.hasMore ?
            <div className={"has-more-news " + (this.state.cardMonth ? "run" : "stop")} onClick={this.addLatestNews}>
              <span>有{this.state.hasMore}条新快讯！</span>
            </div> : null
          }
        </div>
        {/* 快讯滚动顶部按钮 未完 */}
        <div className="go-to-top" onClick={this.scrollTop}></div>
      </div>
    )
  }
}


