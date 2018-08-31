import React, {Component} from 'react';
import ViewBase from "../../ViewBase";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import "../stylus/articleSearch.styl";
import LoginController from "../../../class/login/LoginController";
import Pagination from "../../../common/components/Pagination";
import Alert from "../../../common/components/Alert";
import UserController from "../../../class/user/UserController";

export default class ArticleSearch extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alertContent: "",
    };
    this.highLight = this.highLight.bind(this);
    this.highLightTag = this.highLightTag.bind(this);
    this.addCollect = this.addCollect.bind(this);
  }

  highLight(word, txt){
    let txtArr = txt.split(word);
    let resJsx = [];
    for(let i=0; i<txtArr.length-1; i++){
      resJsx.push(txtArr[i],<i key={i} className="light">{word}</i>);
    }
    resJsx.push(txtArr[txtArr.length-1]);
    return resJsx;
  }

  highLightTag(word, tagTxt) {
    if(!tagTxt) return null;
    let txtArr = tagTxt.split(word);
    let resJsx = [];
    for(let i=0; i<txtArr.length-1; i++){
      resJsx.push(txtArr[i],<i key={i} className="light">{word}</i>);
    }
    resJsx.push(txtArr[txtArr.length-1]);
    let span = <span className={txtArr.length > 1 ? "tag-choose" : "tag-name"}>{resJsx}</span>;
    return span;
  }

  async addCollect(item) {
    if (!LoginController().isLogin()) {
      this.bus.emit("showLoginDialog");
      return;
    }
    let data = await UserController().setCollect(2, item.id, !item.isCollect);
    if (data.msg) {
      this.setState({showAlert: true, alertContent: data.msg});
      return;
    }
    item.isCollect = !item.isCollect;
    this.setState({showAlert: true, alertContent: item.isCollect ? "收藏成功" : "取消收藏成功"});
  }

  render() {
    let {showAlert, alertContent} = this.state;
    let {history, onSearch} = this.props;
    let {curPage, total, pageSize, word, resultList} = this.props.data;

    return (
      <div className="article-search">
        <div className="article">
          <ul>
            {resultList && resultList.map((v, index) => (
              <li key={index}>
                {/* 根据是否有文章大图 切换显示 */}
                {v.img ?
                  (
                    <div className="article-has-img">
                      <div>
                        <p className="article-title" onClick={() => history.push(`/article/detail?id=${v.id}`)}>
                          {v.title && v.title.length > 36 ? v.title.shearStr(36) : this.highLight(word, v.title) }

                        </p>

                        <p className="article-content">
                          {v.content && v.content.length > 100 ? v.content.shearStr(100) : v.content}

                        </p>
                      </div>
                      <div className="img-div">
                        <img src={v.img}/>
                      </div>
                    </div>
                  ) :
                  (<div className="article-no-img">
                    <p className="article-title" onClick={() => history.push(`/article/detail?id=${v.id}`)}>
                      {v.title && v.title.length > 29 ? v.title.shearStr(29) : v.title}

                    </p>
                    <p className="article-content">
                      {v.content && v.content.length > 75 ? v.content.shearStr(75) : v.content}
                    </p>
                  </div>)
                }
                {/* 文章信息，作者 时间 点赞数量及收藏等 */}
                <div className="article-info">
                  <div className="left-info">
                    {/* 作者 */}
                    <span className="article-author">{v.id}</span>
                    {/* 文章日期 */}
                    <span className="article-date">{v.date}</span>
                    {/* 文章标签 */}
                    {
                      v.tags && v.tags.map((v, index) =>(
                        <span key={index}>
                          {
                            this.highLightTag(word,v)
                          }
                        </span>
                      ))
                    }
                  </div>
                  <div className="right-info">
                    {/* 阅读次数 */}
                    <div className="watch">
                      <div className="watch-div"></div>
                      <span className="watch-span">66</span>
                    </div>
                    {/* 点赞次数 */}
                    <div className="love">
                      <div className="love-div"></div>
                      <span className="love-span">55</span>
                    </div>
                    {/* 收藏 */}
                    {
                      <div className={(v.isCollect ? "isfav " : "notfav ") + "favourite"}
                           onClick={this.addCollect.bind(this, v)}
                      >
                        <div className={(v.isCollect ? "isfav " : "notfav ") + "favourite-div"}></div>
                        <span className="favourite-span">收藏</span>
                      </div>
                    }
                  </div>
                </div>
              </li>
            ))}
          </ul>

        </div>
        {/*翻页*/}
        {total > pageSize &&
        <div className="page">
          <Pagination curPage={curPage} total={total} pageSize={pageSize} onChange={page => onSearch(page)}/>
        </div>}

        {/*提示*/}
        {showAlert &&
        <Alert content={alertContent} onClose={() => this.setState({showAlert: false})}/>}

      </div>

    )
  }
}

