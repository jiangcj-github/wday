import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect,
  Switch
} from 'react-router-dom'
import ViewBase from "../ViewBase";
import './stylus/header.styl'

export default class Header extends ViewBase {
  constructor(props) {
      super(props);
      this.state = {}
  }

  async componentDidMount() {

  }

  render() {
    return (
      <div className="header">
          {/*顶部价格滚动栏*/}
          <div className="price">
              <ul>
                  <li>
                      <img src=""/>
                      <span>USDT</span>
                      <i>$6,000(-5.2%)</i>
                  </li>
                  <li>
                      <img src=""/>
                      <span>USDT</span>
                      <i>$6,000(-5.2%)</i>
                  </li>
                  <li>
                      <img src=""/>
                      <span>USDT</span>
                      <i>$6,000(-5.2%)</i>
                  </li>
                  <li>
                      <img src=""/>
                      <span>USDT</span>
                      <i>$6,000(-5.2%)</i>
                  </li>
                  <li>
                      <img src=""/>
                      <span>USDT</span>
                      <i>$6,000(-5.2%)</i>
                  </li>
              </ul>
          </div>
          {/*顶部菜单栏*/}
          <div className="nav-wrap">
              <div className="nav">
                  {/*logo*/}
                  <a className="logo">每日必读</a>
                  {/*左侧菜单项*/}
                  <div className="nav-left">
                      <a className="active">首页</a>
                      <a>项目库</a>
                      <a>快讯</a>
                      <input type="text" placeholder="搜索ico项目、文章、快讯"/>
                      <img src=""/>
                  </div>
                  {/*右侧菜单项*/}
                  <div className="nav-right">
                      <div className="drop-wrap">
                          <img src=""/>
                          <div className="drop">
                              <img src=""/>
                          </div>
                      </div>
                      <img src=""/>
                      <a>登录/注册</a>
                      <div className="drop-wrap">
                          <img src=""/>
                          <ul className="drop">
                              <li>我的收藏</li>
                              <li>退出</li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}
