import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ViewBase from "../ViewBase";
import "./stylus/search.styl";
import ProjectSearch from "./children/ProjectSearch";
import Empty from "./children/Empty";
import ArticleSearch from "./children/ArticleSearch";
import NewsSearch from "./children/NewsSearch";
import SearchController from "../../class/search/SearchController";

export default class Search2 extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {
      tabSelect: "project",

      resultList: [],       //搜索结果
      total: 0,
      pageSize: 3,
      curPage:  1,
    };
    this.word = "";     // 搜索关键词
  }

  async searchContent(page){
    console.log(999, page);
    let {pageSize,tabSelect} = this.state;
    let type = {"project":1,"article":2,"news":3}[tabSelect];
    let data = await SearchController().search(this.word, type, page, pageSize);
    if(data.msg){
      this.setState({resultList: [], total: 0, curPage: page});
      return
    }
    let {total, list} = data;
    this.setState({resultList: list, total: total, curPage: page});
  }

  componentDidMount() {
    //监听搜索消息
    this.bus.on("onSearch","search",word =>{
        this.word = word;
        this.searchContent(1);
    });
    let {word} = this.props.location.state || {};
    this.word = word;
    this.searchContent(1);
  }

  switchTab(tab){
      console.log("切换");
      this.setState({tabSelect: tab}, () => this.searchContent(1));
  }

  componentWillUnmount() {
    this.bus.off("onSearch","search");
  }

  render() {
    let {history} = this.props;
    let {tabSelect,curPage,pageSize,total} = this.state;
    let resultList = this.state.resultList || [];

    return (
      <div className="search-main">
        {/* 搜索结果-tab */}
        <div className="search-tab">
          <ul className="tab-ul">
            <li className={tabSelect === "article" ? "active" : ""}
                onClick={()=>this.switchTab("article")}>文章</li>
            <li className={tabSelect === "news" ? "active" : ""}
                onClick={()=>this.switchTab("news")}>快讯</li>
            <li className={tabSelect === "project" ? "active" : ""}
                onClick={()=>this.switchTab("project")}>项目</li>
          </ul>
          <span className="tip">关于“{this.word}”共 {total} 条相关信息</span>
        </div>
        {/* 搜索结果-文章*/}
        {
          tabSelect === "article" &&
          (resultList.length > 0 ?
            <ArticleSearch
              history = {history}
              data = {Object.assign({}, this.state)}
              onSearch = {p => this.searchContent(p)} />
            :
            <Empty /> )
        }

        {/* 搜索结果-快讯*/}
        {
          tabSelect === "news" &&
          (resultList.length > 0 ?
            <NewsSearch
              history = {history}
              data = {Object.assign({}, this.state)}
              onSearch = {p => this.searchContent(p)} />
            :
            <Empty />)
        }

        {/* 搜索结果-项目*/}
        {
          tabSelect === "project" &&
          (resultList.length > 0 ?
              <ProjectSearch
                  history = {history}
                  data = {Object.assign({}, this.state)}
                  onSearch = {p => this.searchContent(p)} />
              :
              <Empty/>)
        }
      </div>
    );
  }

}
