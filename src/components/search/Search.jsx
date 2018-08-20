import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ViewBase from "../ViewBase";
import Thumbs from "../../common/components/thumbs";
import "./stylus/search.styl";
import RiceTextEditor from "../article/RiceTextEditor";

export default class Search extends ViewBase {
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
      articleList2: []
    }
  }

  changeFav() {

  }

  render() {
    let {tabSelect} = this.state;
    let tags = ["数字数字", "你瞅啥"];
    return (
      <div className="search-main">
        {/* tab */}
        <div className="search-tab">
          <ul className="tab-ul">
            <li onClick={() => this.setState({tabSelect: "article"})}
                className={(tabSelect === "article" ? "active" : "")}><a>文章</a></li>
            <li onClick={() => this.setState({tabSelect: "news"})} className={(tabSelect === "news" ? "active" : "")}>
              <a>快讯</a></li>
            <li onClick={() => this.setState({tabSelect: "project"})}
                className={(tabSelect === "project" ? "active" : "")}><a>项目</a></li>
          </ul>
        </div>
        {/* 文章*/}
        {
          this.state.tabSelect === "article" &&
          <div className="search-article">
            <div className="article">
              <ul>
                {this.state && this.state.articleList && this.state.articleList.map((v, index) => (
                  <li key={index}>
                    {/* 根据是否有文章大图 切换显示 */}
                    {v.img ?
                      (
                        <div className="article-has-img">
                          <div>
                            <p className="article-title">
                              {v.title && v.title.toString().length > 36 ? v.title.toString().shearStr(36) : v.title.toString()}

                            </p>
                            <p className="article-content">
                              {v.content && v.content.toString().length > 100 ? v.content.toString().shearStr(100) : v.content.toString()}

                            </p>
                          </div>
                          <div>
                            <img src={v.img}/>
                          </div>
                        </div>
                      ) :
                      (<div className="article-no-img">
                        <p className="article-title">
                          {v.title && v.title.toString().length > 29 ? v.title.toString().shearStr(29) : v.title.toString()}

                        </p>
                        <p className="article-content">
                          {v.content && v.content.toString().length > 75 ? v.content.toString().shearStr(75) : v.content.toString()}
                        </p>
                      </div>)
                    }
                    {/* 文章信息，作者 时间 点赞数量及收藏等 */}
                    <div className="article-info">
                      <div className="left-info">
                        <span className="article-author">{v.author}</span>
                        <span className="article-date">{v.date}</span>
                        {
                          tags && tags.map((v, index) => (
                            <span key={index} className="tag-name">{v}</span>
                          ))
                        }
                      </div>
                      <div className="right-info">
                        <div className="watch">
                          <div className="watch-div"></div>
                          <span className="watch-span">66</span>
                        </div>
                        <div className="love">
                          <div className="love-div"></div>
                          <span className="love-span">55</span>
                        </div>
                        <div className={(v.favourite ? "isfav " : "notfav ") + "favourite"}
                             onClick={this.changeFav.bind(v.id, this)}>
                          <div className={(v.favourite ? "isfav " : "notfav ") + "favourite-div"}></div>
                          <span className="favourite-span">收藏</span>
                        </div>

                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {
                // 没有搜索结果时候显示空图
                this.state && this.state.articleList && this.state.articleList.length === 0 &&
                <div className="no-result">
                  <img className="no-result-img" src={this.imageDict.$_no_result}/>
                  <span>没有搜索到相关内容</span>
                </div>
              }
            </div>
          </div>
        }

        {/* 快讯*/}
        {
          this.state.tabSelect === "news" &&
          <div className="search-news">
            {
              [1, 2, 3].map((v, index) => (
                <div className="news-item" key={index}>
                  <p className="news-time">2018-09-09 09:09:09</p>
                  <div className="news-main">
                    {/*<div className="news-title">安慰基地啊忘记了多亏了你的是国内克拉斯</div>*/}
                    <div className="news-title">
                      {/*{ v.newsTitle && v.newsTitle.toString().length > 29 ? v.newsTitle.toString().shearStr(29) : v.newsTitle.toString()  }*/}
                      {this.state.articleList[0].title && this.state.articleList[0].title.toString().length > 45 ? this.state.articleList[0].title.toString().shearStr(45) : this.state.articleList[0].title.toString()}
                    </div>
                    {/*<div className="news-content">爱我的吗看了代码卡拉塑料口袋里面卡掉了；莫拉蒂glass发明了里面的买了吗马拉松发完了妈妈拉尔购买了美国麦克拉的美丽的里卡多看了看拉萨付款啦大概看了离开</div>*/}
                    <div className="news-content">
                      {this.state.articleList[0].content && this.state.articleList[0].content.toString().length > 100 ? this.state.articleList[0].content.toString().shearStr(100) : this.state.articleList[0].content.toString()}

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
              this.state && this.state.articleList2 && this.state.articleList2.length === 0 &&
              <div className="no-result">
                <img className="no-result-img" src={this.imageDict.$_no_result}/>
                <span>没有搜索到相关内容</span>
              </div>

            }

          </div>
        }

        {/* 项目*/}
        {
          this.state.tabSelect === "project" &&
          <div className="search-project">
            <RiceTextEditor />
            <div className="no-result">
              <img className="no-result-img" src={this.imageDict.$_no_result}/>
              <span>没有搜索到相关内容</span>
            </div>

          </div>
        }
      </div>
    );
  }

}
