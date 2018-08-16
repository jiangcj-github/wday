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
import Login from "./children/Login"
import LoginController from "../../class/login/LoginController"

import './stylus/header.styl'

export default class Header extends ViewBase {
    constructor(props) {
      super(props);
      this.state = {
          phone: "",
          showLogin: false,
          top1: 0,
          top2: 40,
      }
    }

    componentDidMount() {
        let controller = LoginController();

        //轮播
        let {top1, top2} = this.state;
        controller.swiper("carousel", top1, top2, [0, 40], 5, 3000,(layer,layerCache)=>{
            this.setState({top1: layer, top2: layerCache});
        });

        //监听登录消息
        this.bus.on("login","header",data=>{
            let {phone} = controller.loginInfo;
            this.setState({phone: phone});
        });
    }

    componentWillUnmount() {
        this.bus.off("login","header");
    }

    async logout(){
        let controller = LoginController();
        let data = await controller.logout();
    }

    render() {

        let {showLogin,top1,top2,phone} = this.state;

        return (
          <div className="header">
              {/*价格轮播*/}
              <div className="price-wrap">
                  <div className="price">
                      <ul style={{top: top1}}>
                          <li>
                              <img src={this.imageDict.$icon_coin_five}/>
                              <span>USDT</span>
                              <i className="up">$6,000(-5.2%)</i>
                          </li>
                          <li>
                              <img src={this.imageDict.$icon_coin_five}/>
                              <span>USDT</span>
                              <i className="up">$6,000(-5.2%)</i>
                          </li>
                          <li>
                              <img src={this.imageDict.$icon_coin_five}/>
                              <span>USDT</span>
                              <i className="up">$6,000(-5.2%)</i>
                          </li>
                          <li>
                              <img src={this.imageDict.$icon_coin_five}/>
                              <span>USDT</span>
                              <i className="up">$6,000(-5.2%)</i>
                          </li>
                          <li>
                              <img src={this.imageDict.$icon_coin_five}/>
                              <span>USDT</span>
                              <i className="up">$6,000(-5.2%)</i>
                          </li>
                      </ul>
                      <ul style={{top: top2}}>
                          <li>
                              <img src={this.imageDict.$icon_coin_five}/>
                              <span>USDT</span>
                              <i className="up">$6,000(-5.2%)</i>
                          </li>
                          <li>
                              <img src={this.imageDict.$icon_coin_five}/>
                              <span>USDT</span>
                              <i className="down">$6,000(-5.2%)</i>
                          </li>
                          <li>
                              <img src={this.imageDict.$icon_coin_five}/>
                              <span>USDT</span>
                              <i className="down">$6,000(-5.2%)</i>
                          </li>
                          <li>
                              <img src={this.imageDict.$icon_coin_five}/>
                              <span>USDT</span>
                              <i className="down">$6,000(-5.2%)</i>
                          </li>
                          <li>
                              <img src={this.imageDict.$icon_coin_five}/>
                              <span>USDT</span>
                              <i className="down">$6,000(-5.2%)</i>
                          </li>
                      </ul>
                  </div>
              </div>
              {/*顶部菜单栏*/}
              <div className="nav-wrap">
                  <div className="nav">
                      {/*logo*/}
                      <img className="logo" src={this.imageDict.$icon_logo}/>
                      {/*左侧菜单项*/}
                      <div className="nav-left">
                          <a className="active">首页</a>
                          <a>项目库</a>
                          {/*<a>快讯</a>*/}
                          <Link to="/newslist">快讯</Link>
                          <p className="srch">
                              <input type="text" placeholder="搜索ico项目、文章、快讯"/><i/>
                          </p>
                      </div>
                      {/*右侧菜单项*/}
                      <div className="nav-right">
                          {/*分享*/}
                          <div className="ri">
                              <i className="share"/>
                          </div>
                          {/*微信*/}
                          <div className="ri">
                              <i className="wechat"/>
                              <div className="drop wechat-drop">

                              </div>
                          </div>
                          {/*登录注册, 个人中心*/}
                          {phone ?
                              <div className="ri">
                                  <a onClick={()=>this.setState({showLogin: true})}>登录/注册</a>
                              </div>
                                :
                              <div className="ri">
                                  <i className="person"/>
                                  <ul className="drop person-drop">
                                      <li>
                                          <img src={this.imageDict.$icon_collect_big_normal}/>
                                          <span>我的收藏</span>
                                      </li>
                                      <li onClick={this.logout.bind(this)}>
                                          <img src={this.imageDict.$icon_menu_quit}/>
                                          <span>退出</span>
                                      </li>
                                  </ul>
                              </div>}
                      </div>
                  </div>
              </div>
              {/*登录组件*/}
              {showLogin && <Login onHide={()=>this.setState({showLogin: false})}/>}
          </div>
        )
    }
}
