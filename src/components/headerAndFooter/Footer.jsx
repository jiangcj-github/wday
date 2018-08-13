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
              <h3>
                  <b>每日必读</b>
                  <small>meiribidu.com</small>
              </h3>
              {/*商务合作，友情链接，社交媒体，免责条款*/}
              <div className="col">
                  <p>商务合作</p>
                  <ul>
                      <li>
                          <span>电话：123456</span>
                      </li>
                      <li>
                          <span>邮箱：123456@163.com</span>
                      </li>
                      <li>
                          <span>Q Q：123456</span>
                      </li>
                      <li>
                          <span>微信：123456</span>
                      </li>
                  </ul>
              </div>
              <div className="col">
                  <p>友情链接</p>
                  <ul>
                      <li>
                          <img src=""/>
                          <span>Token.so</span>
                      </li>
                      <li>
                          <img src=""/>
                          <span>QB.com</span>
                      </li>
                  </ul>
              </div>
              <div className="col">
                  <p>社交媒体</p>
                  <ul>
                      <li>
                          <img src=""/>
                          <span>QB.com</span>
                      </li>
                      <li>
                          <img src=""/>
                          <span>微博</span>
                      </li>
                  </ul>
              </div>
              <div className="col">
                  <p>免责条款</p>
              </div>
          </div>
          {/*备案*/}
          <div className="ba">© 2018 每日必读 | 京ICP备11017824号-4</div>
      </div>
    )
  }
}

