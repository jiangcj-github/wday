import React, { Component } from 'react';
import ViewBase from "../../ViewBase";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import "../stylus/newsSearch.styl";
import Thumbs from "../../../common/components/thumbs";

export default class NewsSearch extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {
      newsList: [
        {
          id: 1,
          title: "习近平谈如何打赢脱贫攻坚战如何打赢脱贫攻坚战如何打赢脱贫攻坚战谈如何打赢脱贫攻坚战如何打赢脱贫攻坚战如何打赢脱贫攻坚战谈如何打赢脱贫攻坚战如何打赢脱贫攻坚战如何打赢脱贫攻坚战如何打赢脱贫攻坚战",
          content: "坚决打赢脱贫攻坚战，让贫困人口和贫困地贫攻坚战，让贫困人口和贫困地贫攻坚战，让人口和贫困地贫攻坚战，让贫困人口和贫困地贫攻坚战，让人口和贫困地贫攻坚战，让贫困人口和贫困地贫攻坚战，让人口和贫困地贫攻坚战，让贫困人口和贫困地贫攻坚战，让贫困人口和贫困地贫攻坚战，让贫困人口和贫困地区同全国一道进坚决打赢脱贫攻坚战，让贫困人口和贫困地区同全国一道进坚决打赢脱贫攻坚战，让贫困人口和贫困地区同全国一道进坚决打赢脱贫攻坚战，让贫困人口和贫困地区同全国一道进坚决打赢脱贫攻坚战，让贫困人口和贫困地区同全国一道进入全面小康社会是我们党的庄严承诺。",
          author: "赵四",
          date: "18-01-11",
          favourite: true
        },
        {
          id: 2,
          title: "最高法：妥善审理民间借贷纠纷案件 防范审理民间借贷纠纷案件 防范审理民间借贷纠纷案件 防范审理民间借贷纠纷案件 防范化解各类风险",
          content: "新华社北京8月12日电（记者罗沙）记者12日从最高人民法院获悉，最高法日前下发关于依法妥新华社北京8月12日电（记者罗沙）记者12日从最高人民法院获悉，最高法日前下发关于依法妥新华社北京8月12日电（记者罗沙）记者12日从最高人民法院获悉，最高法日前下发关于依法妥新华社北京8月12日电（记者罗沙）记者12日从最高人民法院获悉，最高法日前下发关于依法妥新华社北京8月12日电（记者罗沙）记者12日从最高人民法院获悉，最高法日前下发关于依法妥善审理民间借贷案件的通知。",
          author: "赵四",
          date: "18-01-11",
          img: "https://bpic.588ku.com/element_banner/20/18/08/351737d428923be2f258e5b6b58c806d.jpg",
          favourite: false
        },
        {
          id: 3,
          title: "生态福建 交出绿色答卷",
          content: "2016年8月，中共中央办公厅、国务院办公厅印发《关于设立统一规范的国家生态文明试验区的意见》。",
          author: "赵四",
          date: "18-01-11",
          favourite: true
        },
        {
          id: 4,
          title: "生态福建 交出绿色答卷awdawdawdawdasdawd",
          content: "2016年8月，中共awdawfeagaeaeg挖法我发发哇哇方法哇哇方法无法无法娃娃安慰方法无法哇阿文 挖法无法发  中央办公厅、国务院办公厅印发《关于设立统一规范的国家生态文明试验区的意见》。",
          author: "赵awdawd",
          date: "18-01-11",
          favourite: true
        },
      ]
    }
  }
  render(){
    let {history} = this.props;
    return (
      <div className="search-news">
      {
        this.state.newsList && this.state.newsList.map((v, index) => (
          <div className="news-item" key={index}>
            <p className="news-time">2018-09-09 09:09:09</p>
            <div className="news-main">
              <div className="news-title" onClick={() => history.push(`/news/detail?id=${v.id}`)}>
                {v.title && v.title.length > 45 ? v.title.shearStr(45) : v.title }
              </div>

              <div className="news-content">
                {v.content && v.content.length > 100 ? v.content.shearStr(100) : v.title }
              </div>
              <div className="news-thumbs">
                <Thumbs/>
              </div>
            </div>
          </div>
        ))
      }
      </div>


    );
  }

}