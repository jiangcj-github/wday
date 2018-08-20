import React, { Component } from 'react';
import ViewBase from "../../ViewBase";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import "../stylus/news.styl"
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
    let controller = new NewsController();
    let result = await controller.getNewsDetail();
    this.setState({
      newsDetail: result
    });

  }

  render() {
    return (

      <div className="news">
        {this.state && this.state.newsDetail &&
          <div className="news-main">
            <div className="date-card">
              <div className="date-card-main">
                <p className="month">7月</p>
                <p className="day">05</p>
              </div>
              <div className="date-card-other">
                <p className="date-is">今天</p>
                <p className="week">星期五</p>
              </div>
            </div>
            <div className="news-date">19:00</div>
            <div className="news-title">i和阿嘎尔哦估计哦阿瓦达</div>
            <div className="news-content">过600个BCD全节点，这将使得比特币钻石区块链安全性及稳定性得到提升。暴风播酷云是暴风新影的核心硬件设备，并其可在非工作状态下利用闲置的存储空间和带宽帮助暴风系列软件，第三方CDN业务，第三方区块链业务进行超大文件网络加速甚至区块链网络全节点的部署并同时赚取BFC积分。</div>
            <div className="news-thumbs">
              <Thumbs />
            </div>
          </div>

        }
      </div>
    )
  }
}

