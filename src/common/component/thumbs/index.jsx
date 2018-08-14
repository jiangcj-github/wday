import React, { Component } from "react";
import ViewBase from "../../../components/ViewBase";
import "./style/index.styl";

/*
 利好、利空、分享
 goodCount 利好数量
 goodClicked 利好是否已点击
 badClicked 利空是否已点击
 badClicked 利空是否已点击
 goodClick 点击利好 回调函数
 badClick 点击利空 回调函数
 share 点击分享图标 回调函数
*/

export default class Thumbs extends ViewBase {
  constructor(props) {
    super(props);
    let {goodCount,  badCount, share} = props;
    this.state = {
      goodCount: goodCount,
      badCount: badCount,
      goodClicked: false,
      badClicked: false,
      share: share
    };
    this.changeGood = this.changeGood.bind(this);
    this.changeBad = this.changeBad.bind(this);
  }

  changeGood(e) {
    let { goodClick } = this.props;
    let {clientX, clientY} = e;
    if(!this.state.goodClicked) {
      //撤销利空的操作
      if(this.state.badClicked) {
        this.state.badClicked = false;
      }
      let span = document.createElement("span");
      span.innerText = "+1";
      span.className = "tip-good";
      document.querySelector(".thumbs-good").appendChild(span);
      setTimeout(() => {
        document.querySelector(".thumbs-good").removeChild(span);
      },2000);
    } else {
      let span = document.createElement("span");
      span.innerText = "-1";
      span.className = "tip-good";
      document.querySelector(".thumbs-good").appendChild(span);
      setTimeout(() => {
        document.querySelector(".thumbs-good").removeChild(span);
      },2000);
    }
    this.state.goodClicked = !this.state.goodClicked;
    goodClick();
  }

  changeBad(e) {
    let { badClicked } = this.props;
    let {clientX, clientY} = e;
    if(!this.state.badClicked) {
      //撤销利好的操作
      if(this.state.goodClicked) {
        this.state.goodClicked = false;
      }
      let span = document.createElement("span");
      span.innerText = "+1";
      span.className = "tip-bad";
      document.querySelector(".thumbs-bad").appendChild(span);
      setTimeout(() => {
        document.querySelector(".thumbs-bad").removeChild(span);
      },2000);
    } else {
      let span = document.createElement("span");
      span.innerText = "-1";
      span.className = "tip-bad";
      document.querySelector(".thumbs-bad").appendChild(span);
      setTimeout(() => {
        document.querySelector(".thumbs-bad").removeChild(span);
      },2000);
    }
    this.state.badClicked = !this.state.badClicked;

    // badClick();
  }

  render() {
    return (
      <div className="thumbs">
        <div className="thumbs-good" onClick={this.changeGood}>
          {
            this.state.goodClicked ?<img className="thumbs-good-img" src="../../../../static/web/icon.png" />
              : <img className="thumbs-good-img" src="../../../../static/web/icon.png" />
          }
          <span className="thumbs-good-span">利好</span>
          <span className="thumbs-good-span-count">{this.state.goodCount}</span>
        </div>

        <div className="thumbs-bad" onClick={this.changeBad}>
          {
            this.state.badClicked ? <img className="thumbs-bad-img" src="../../../../static/web/icon.png" />
              : <img className="thumbs-bad-img" src="../../../../static/web/icon.png" />
          }
          <span className="thumbs-bad-span">利空</span>
          <span className="thumbs-bad-span-count">{this.state.badCount}</span>
        </div>



        <div className="thumbs-share">
          <img className="thumbs-bad-share" src="../../../../static/web/icon.png" />
          <div className="share-div">
            <div className="copyContent">
              <img className="thumbs-share-img" src="../../../../static/web/icon.png" />
              <span className="thumbs-share-span">复制快讯</span>
            </div>

            <span className="little"><i className="ii"></i></span>
          </div>
        </div>


      </div>
    );
  }
}
