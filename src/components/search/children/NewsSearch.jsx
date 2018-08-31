import React, { Component } from 'react';
import ViewBase from "../../ViewBase";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import "../stylus/newsSearch.styl";
import Thumbs from "../../../common/components/thumbs";
import Pagination from "../../../common/components/Pagination";
import Alert from "../../../common/components/Alert";

export default class NewsSearch extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.highLight = this.highLight.bind(this);
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

  render(){
    let {history, onSearch} = this.props;
    let {curPage, total, pageSize, word, resultList} = this.props.data;
    console.log(2222, resultList);

    return (
      <div className="search-news">
      {
        resultList && resultList.map((v, index) => (
          <div className="news-item" key={index}>
            <p className="news-time">2018-09-09 09:09:09</p>
            <div className="news-main">
              <div className="news-title" onClick={() => history.push(`/news/detail?id=${v.id}`)}>
                {v.title && v.title.length > 45 ? this.highLight(v.title.shearStr(45)) : this.highLight(v.title)  }
              </div>

              <div className="news-content">
                {v.content && v.content.length > 100 ? v.content.shearStr(100) : v.title }
              </div>
              <div className="news-thumbs">
                <Thumbs goodCount={v.like} badCount={v.dislike}/>
              </div>
            </div>
          </div>
        ))
      }
        {/*翻页*/}
        {total > pageSize &&
        <div className="page">
          <Pagination curPage={curPage} total={total} pageSize={pageSize} onChange={page => onSearch(page)}/>
        </div>}

      </div>


    );
  }

}