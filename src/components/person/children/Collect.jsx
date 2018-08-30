import React, {Component} from 'react';
import ViewBase from "../../../components/ViewBase";
import {
  NavLink,
} from "react-router-dom";
import ArticleController from "../../../class/article/ArticleController";
import UserController from "../../../class/user/UserController";
import LoginController from "../../../class/login/LoginController";
import Pagination from "../../../common/components/Pagination";
import Alert from "../../../common/components/Alert";


export default class Collect extends ViewBase {
  constructor() {
    super();
    this.state = {
      articleList: [],
      curPage: 1,
      pageSize: 5,
      showAlert: false,
    };
    this.toPage = this.toPage.bind(this);
    this.addCollect = this.addCollect.bind(this);
  }

  //添加收藏
  async addCollect(item){
    if(!LoginController().isLogin()){
      this.bus.emit("showLoginDialog");
      return;
    }
    let data = await UserController().setCollect(2, item.id, !item.isCollect);
    if(data.msg){
      this.setState({showAlert: true, alertContent: data.msg});
      return;
    }
    item.isCollect = !item.isCollect;
    this.setState({showAlert: true, alertContent: item.isCollect ? "收藏成功" : "取消收藏成功"});
  }

  async toPage(page) {
    let {pageSize} = this.state;
    let result = await UserController().getCollectList(2, page, pageSize);
    if (!result.msg) {
      let {total, list} = result;
      this.setState({articleList: list, total: total, curPage: page});
    }
  }

  async componentDidMount() {
    await this.toPage(1);
  }

  render() {
    let {history} = this.props;
    let {articleList, total, pageSize, curPage, showAlert, alertContent} = this.state;
    return (
      <div className="collect">
        <h3>我的收藏</h3>
        <div className="content">

          <ul>
            { articleList && articleList.map((v,index) =>(
              <li key={index}>
                {/* 根据是否有文章大图 切换显示 */}
                {v.img ?
                  (
                    <div className="article-has-img">
                      <div>
                        <p className="article-title" onClick={()=>history.push(`/article/detail?id=${v.id}`)}>
                          {v.title && v.title.toString().length > 36 ? v.title.toString().shearStr(36) : v.title.toString()}

                        </p>
                        <p className="article-content">
                          {v.content && v.content.toString().length > 100 ? v.content.toString().shearStr(100) : v.content.toString()}

                        </p>
                      </div>
                      <div className="img-div">
                        <img src={v.img}/>
                      </div>
                    </div>
                  ) :
                  (<div className="article-no-img">
                    <p className="article-title" onClick={()=>history.push(`/article/detail?id=${v.id}`)}>
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
                    {/* 作者 */}
                    <span className="article-author">{v.author}</span>
                    {/* 文章日期 */}
                    <span className="article-date">{v.date}</span>
                    {/* 文章标签 */}
                    {
                      this.state.tags && this.state.tags.map((v, index) => (
                        <span key={index} className="tag-name">{v}</span>
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
                        <div className={"isfav favourite"}
                             onClick={this.addCollect.bind(this, v.id)}>
                          <div className={"isfav favourite-div"}></div>
                          <span className="favourite-span">收藏</span>
                        </div>
                    }
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* 分页 */}
          {total>pageSize &&
          <div className="page">
            <Pagination curPage={curPage} total={total} pageSize={pageSize} onChange={page=>this.toPage(page)}/>
          </div>}

          {/*提示*/}
          {showAlert &&
          <Alert content={alertContent} onClose={()=>this.setState({showAlert: false})}/>}

          {/* 无结果 */}
          {
            articleList.length === 0  && <div className="no-result">还没有收藏过内容，快去收藏吧</div>
          }

        </div>
      </div>
    )
  }
}