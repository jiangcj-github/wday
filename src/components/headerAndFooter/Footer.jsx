import React, { Component } from 'react';
import ViewBase from "../ViewBase";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import './stylus/footer.styl'

export default class Footer extends ViewBase {
  constructor() {
      super();
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="footer-wrap">
          <div className="footer">
              {/*每日必读*/}
              <div className="logo">
                  <b>每日必读</b>
                  <small>meiribidu.com</small>
              </div>
              {/*商务合作，友情链接，社交媒体，免责条款*/}
              <div className="col">
                  <p>商务合作</p>
                  <a>电话：123456</a>
                  <a>邮箱：123456@163.com</a>
                  <a>Q Q：123456</a>
                  <a>微信：123456</a>
              </div>
              <div className="col">
                  <p>友情链接</p>
                  <a><img src=""/>Token.so</a>
                  <a><img src=""/>QB.com</a>
              </div>
              <div className="col">
                  <p>社交媒体</p>
                  <a><img src=""/>QB.com</a>
                  <a><img src=""/>微博</a>
              </div>
              <div className="col">
                  <p>免责条款</p>
              </div>
          </div>
          {/*备案*/}
          <div className="ba">© 2018 每日必读 | 京ICP备11017824号-4</div>
          {/*右侧固定菜单*/}
          <div className="rf">
              <a><img src="/"/></a>
          </div>
      </div>
    )
  }
}

