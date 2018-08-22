import React, {Component} from "react";
import ViewBase from "../../../components/ViewBase";
import "../../components/stylus/thumbs.styl";

/*
 利好、利空、分享
 goodCount 利好数量
 goodClicked 利好是否已点击
 badClicked 利空是否已点击
 badClicked 利空是否已点击
 clickGoodDo 点击利好 回调函数
 clickBadDo 点击利空 回调函数
 share 点击分享图标 回调函数
*/

export default class Thumbs extends ViewBase {
  constructor(props) {
    super(props);
    let {goodCount, badCount, goodClicked, badClicked, share, clickGoodDo, clickBadDo} = props;
    this.state = {
      goodCount: goodCount,
      badCount: badCount,
      goodClicked: goodClicked,
      badClicked: badClicked,
      share: share,
      clickGoodDo: clickGoodDo,
      clickBadDo: clickBadDo
    };
    this.changeGood = this.changeGood.bind(this);
    this.changeBad = this.changeBad.bind(this);
  }

  changeGood(i) {
    i.persist();
    let span = document.createElement("span");
    span.innerText = this.state.goodClicked ? "-1" : "+1";
    span.className = "tip-good";
    i.target.append(span);

    setTimeout(() => {
      i.target.removeChild(span);
    }, 2000);
    this.setState({
      goodClicked: !this.state.goodClicked,
      badClicked: false
    });
    // 点利好的回调
    // this.state.clickGoodDo();

  }

  changeBad(i) {
    i.persist();
    let span = document.createElement("span");
    span.innerText = this.state.badClicked ? "-1" : "+1";
    span.className = "tip-bad";
    i.target.append(span);
    setTimeout(() => {
      i.target.removeChild(span);
    }, 2000);
    this.setState({
      badClicked: !this.state.badClicked,
      goodClicked: false
    });
    // 点利空的回调
    // this.state.clickBadDo();

  }

  render() {
    return (
      <div className="thumbs">
        <div onClick={this.changeGood} className={(this.state.goodClicked ? "clicked " : "normal ") + "thumbs-good"}>
          <div className={(this.state.goodClicked ? "clicked " : "normal ") + "good-div"}></div>
          <span className={(this.state.goodClicked ? "clicked " : "normal ") + "thumbs-good-span"}>利好 {this.state.goodCount}</span>
        </div>

        <div onClick={this.changeBad.bind(this)}
             className={(this.state.badClicked ? "clicked " : "normal ") + "thumbs-bad"}>
          <div className={(this.state.badClicked ? "clicked " : "normal ") + "bad-div"}></div>
          <span className={(this.state.badClicked ? "clicked " : "normal ") + "thumbs-bad-span" }>利空 {this.state.badCount}</span>
        </div>


        <div className="thumbs-share">
          <div className="thumbs-share-div"></div>
          <div className="share-div">
            <div className="copyContent">
              <img className="thumbs-share-img" src={this.imageDict.$_pop_link}/>
              <span className="thumbs-share-span">复制快讯</span>
            </div>
            {/* 以后增加 */}
            {/*<div className="share-weibo">*/}
              {/*<img className="thumbs-share-img" src={this.imageDict.$_pop_link}/>*/}
              {/*<span className="thumbs-share-span">新浪微博</span>*/}
            {/*</div>*/}
            {/*<div className="share-qq">*/}
              {/*<img className="thumbs-share-img" src={this.imageDict.$_pop_link}/>*/}
              {/*<span className="thumbs-share-span">腾讯QQ</span>*/}
            {/*</div>*/}
            {/*<div className="share-wechat">*/}
              {/*<img className="thumbs-share-img" src={this.imageDict.$_pop_link}/>*/}
              {/*<span className="thumbs-share-span">微信扫一扫</span>*/}
            {/*</div>*/}

            <span className="little"><i className="ii"></i></span>
          </div>
        </div>


      </div>
    );
  }
}
