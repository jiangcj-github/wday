import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ViewBase from "../ViewBase";
import Thumbs from "../../common/components/thumbs";
import "./stylus/search.styl";
import ArticleList from "../article/children/ArticleList";
import ProjectSearch from "./children/ProjectSearch";
import Empty from "./children/Empty";

export default class Search2 extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {
      tabSelect: "project",
      articleList: [
        {
          id: 1,
          title: "习近平谈如何打赢脱贫攻坚战如何打赢脱贫攻坚战如何打赢脱贫攻坚战谈如何打赢脱贫攻坚战如何打赢脱贫攻坚战如何打赢脱贫攻坚战谈如何打赢脱贫攻坚战如何打赢脱贫攻坚战如何打赢脱贫攻坚战如何打赢脱贫攻坚战",
          content: "坚决打赢脱贫攻坚战，让贫困人口和贫困地贫攻坚战，让贫困人口和贫困地贫攻坚战，让人口和贫困地贫攻坚战，让贫困人口和贫困地贫攻坚战，让人口和贫困地贫攻坚战，让贫困人口和贫困地贫攻坚战，让人口和贫困地贫攻坚战，让贫困人口和贫困地贫攻坚战，让贫困人口和贫困地贫攻坚战，让贫困人口和贫困地区同全国一道进坚决打赢脱贫攻坚战，让贫困人口和贫困地区同全国一道进坚决打赢脱贫攻坚战，让贫困人口和贫困地区同全国一道进坚决打赢脱贫攻坚战，让贫困人口和贫困地区同全国一道进坚决打赢脱贫攻坚战，让贫困人口和贫困地区同全国一道进入全面小康社会是我们党的庄严承诺。",
          author: "赵四",
          date: "18-01-11",
          favourite: true
        },
        {
          id: 2,
          title: "最高法：妥善审理民间借贷纠纷案件 防范审理民间借贷纠纷案件 防范审理民间借贷纠纷案件 防范审理民间借贷纠纷案件 防范化解各类风险",
          content: "新华社北京8月12日电（记者罗沙）记者12日从最高人民法院获悉，最高法日前下发关于依法妥新华社北京8月12日电（记者罗沙）记者12日从最高人民法院获悉，最高法日前下发关于依法妥新华社北京8月12日电（记者罗沙）记者12日从最高人民法院获悉，最高法日前下发关于依法妥新华社北京8月12日电（记者罗沙）记者12日从最高人民法院获悉，最高法日前下发关于依法妥新华社北京8月12日电（记者罗沙）记者12日从最高人民法院获悉，最高法日前下发关于依法妥善审理民间借贷案件的通知。",
          author: "赵四",
          date: "18-01-11",
          img: "https://bpic.588ku.com/element_banner/20/18/08/351737d428923be2f258e5b6b58c806d.jpg",
          favourite: false
        },
        {
          id: 3,
          title: "生态福建 交出绿色答卷",
          content: "2016年8月，中共中央办公厅、国务院办公厅印发《关于设立统一规范的国家生态文明试验区的意见》。",
          author: "赵四",
          date: "18-01-11",
          favourite: true
        },
      ],
      tags: ["数字数字", "你瞅啥"],
      projectList: [],
    }
  }

  componentDidMount() {
      //设置导航栏菜单
      this.bus.emit("selectItem", null);
  }

  render() {
    let {tabSelect} = this.state;
    //let projectList = this.state.projectList || [];
    let projectList =  [1,2,3,4,5,6,7];

    return (
      <div className="search-main">
        {/* tab */}
        <div className="search-tab">
          <ul className="tab-ul">
            <li onClick={() => this.setState({tabSelect: "article"})}
                className={(tabSelect === "article" ? "active" : "")}>文章</li>
            <li onClick={() => this.setState({tabSelect: "news"})}
                className={(tabSelect === "news" ? "active" : "")}>快讯</li>
            <li onClick={() => this.setState({tabSelect: "project"})}
                className={(tabSelect === "project" ? "active" : "")}>项目</li>
          </ul>
          <span className="tip">关于“区块链”共 12 条相关信息</span>
        </div>
        {/* 文章*/}
        {
          tabSelect === "article" &&
          <div className="search-article">
            <ArticleList />
          </div>
        }

        {/* 快讯*/}
        {
          tabSelect === "news" &&
          <div className="search-news">
            {
              [1, 2, 3].map((v, index) => (
                <div className="news-item" key={index}>
                  <p className="news-time">2018-09-09 09:09:09</p>
                  <div className="news-main">
                    <div className="news-title">
                      {this.state.articleList && this.state.articleList[0].title && this.state.articleList[0].title.toString().length > 45 ? this.state.articleList[0].title.toString().shearStr(45) : this.state.articleList[0].title.toString()}
                    </div>

                    <div className="news-content">
                      {this.state.articleList && this.state.articleList[0].content && this.state.articleList[0].content.toString().length > 100 ? this.state.articleList[0].content.toString().shearStr(100) : this.state.articleList[0].content.toString()}

                    </div>
                    <div className="news-thumbs">
                      <Thumbs/>
                    </div>
                  </div>

                </div>
              ))
            }
            {
              // 没有搜索结果时候显示空图
              this.state && this.state.articleList2 && this.state.articleList2.length === 0 && <Empty/>
            }

          </div>
        }

        {/* 搜索结果-项目*/}
        {tabSelect === "project" &&
          projectList.length > 0 ? <ProjectSearch/> : <Empty/>}
      </div>
    );
  }

}
