import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ViewBase from "../ViewBase";
import "./stylus/search.styl"

export default class Search extends ViewBase {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="search-main">
        {/* tab */}
        <div className="search-tab">
          <ul className="tab-ul">
            <li className="active"><a>文章</a></li>
            <li><a>快讯</a></li>
            <li><a>项目</a></li>
          </ul>
        </div>
        {/* 文章*/}
        <div className="search-article"></div>
        {/* 快讯*/}
        <div className="search-news"></div>
        {/* 项目*/}
        <div className="search-project"></div>
      </div>
    );
  }

}
