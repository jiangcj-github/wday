import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import exchangeViewBase from "../ExchangeViewBase";


let recommendController,
  marketController;

import "./stylus/index.styl"

export default class Home extends exchangeViewBase {
  constructor(props) {
    super(props);

    this.onScroll = () => {
      let headerName = document.getElementById('header'), activeHeight = document.getElementById('active');
      let buttonTop = document.querySelector('.aside-nav-top');
      let buttonKf = document.querySelector('.aside-nav-desk');
      let buttonK = document.getElementById('udesk_container');
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

      // if (activeHeight) {
      //   if (scrollTop >= activeHeight.offsetHeight - 120) {
      //     headerName.className = 'headerNav clearfix'
      //   } else {
      //     headerName.className = 'homeNav clearfix'
      //   }
      // }


      if (scrollTop > 0) {
        headerName.className = 'headerNav clearfix'
        // headerName.style.opacity = 0.5
      } else {
        headerName.className = 'homeNav clearfix'
      }


      if (scrollTop >= document.documentElement.clientHeight) {
        buttonTop.style.display = "block";
        buttonKf.style.display = "block";
        buttonK && (buttonK.style.display = "block");
      } else {
        buttonTop.style.display = "none";
        buttonKf.style.display = "none";
        buttonK && (buttonK.style.display = "none");
      }
    };
  }


  render() {
    return (
      <div className="home-wrap">
        <div className="home-top">
           emm
        </div>
      </div>
    );
  }
}
