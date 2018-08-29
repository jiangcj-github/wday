import React, {Component} from "react";
import ViewBase from "../../../components/ViewBase";
import "../../components/stylus/thumbs.styl";
import NewsController from "../../../class/news/NewsController";

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
    this.changeGood = this.changeGood.bind(this);
    this.changeBad = this.changeBad.bind(this);
  }

  changeGood(id, goodClicked, badClicked, i) {
    // 先向服务器传值
    // 再存local storage 显示动画 改变state
    console.log("stroage ",this.storage);
    console.log(i, id);
    i.persist();
    let span = document.createElement("span");
    span.innerText = goodClicked ? "-1" : "+1";
    span.className = "tip-good";
    i.target.append(span);

    setTimeout(() => {
      i.target.removeChild(span);
    }, 2000);

    NewsController().saveVote(id,true);
    if(badClicked) {
      NewsController().saveVote(id,false);
    }
    this.setState({a:1});
    // 点利好的回调
    // this.state.clickGoodDo();

  }

  changeBad(id, goodClicked, badClicked, i) {
    i.persist();
    let span = document.createElement("span");
    span.innerText = badClicked ? "-1" : "+1";
    span.className = "tip-bad";
    i.target.append(span);
    setTimeout(() => {
      i.target.removeChild(span);
    }, 2000);
    NewsController().saveVote(id,false);
    if(goodClicked) {
      NewsController().saveVote(id,true);
    }
    this.setState({});
    // 点利空的回调
    // this.state.clickBadDo();

  }

  render() {
    let {id, goodCount, badCount, share} = this.props;
    let goodC = NewsController().isVote(id, true);
    let badC = NewsController().isVote(id, false);
    console.log('gg', goodC, 'badc', badC);
      return (
      <div className="thumbs">
        <div onClick={this.changeGood.bind(this, id, goodC, badC)} className={(goodC ? "clicked " : "normal ") + "thumbs-good"}>
          <div className={(goodC ? "clicked " : "normal ") + "good-div"}></div>
          <span className={(goodC ? "clicked " : "normal ") + "thumbs-good-span"}>利好 {goodCount}</span>
        </div>

        <div onClick={this.changeBad.bind(this, id, goodC, badC)}
             className={(badC ? "clicked " : "normal ") + "thumbs-bad"}>
          <div className={(badC ? "clicked " : "normal ") + "bad-div"}></div>
          <span className={(badC ? "clicked " : "normal ") + "thumbs-bad-span" }>利空 {badCount}</span>
        </div>


        <div className="thumbs-share">
          <div className="thumbs-share-div"></div>
          <div className="share-div">
            <div className="copyContent" onClick={share}>
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
