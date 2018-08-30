import React, { Component } from "react";
import ViewBase from "../../../components/ViewBase";
/*
  curPage	当前页码，默认为1
  total	数据总条数
  pageSize 每页数据条数
  onChange页码跳转的回调
*/

export default class Pagination extends ViewBase {
  constructor(props) {
    super(props);
  }

  list(totalPage, curPage) {
    if (totalPage < 7) {
      return Array.from({ length: totalPage }, (item, index) => index + 1);
    }
    if (curPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPage];
    }
    if (curPage < totalPage - 3) {
      return [1, "...", curPage - 1, curPage, curPage + 1, "...", totalPage];
    }
    if (curPage >= totalPage - 3) {
      return [1, "...", totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
    }
  }

  toPage(p){
    let {total, pageSize, onChange} = this.props;
    let totalPage = Math.ceil(total/pageSize);
    if(p < 1 || p > totalPage || p === "...") return;
    onChange && onChange(p);
  }

  render() {
    let {total, pageSize, curPage} = this.props;
    let totalPage = Math.ceil(total/pageSize);
    let pageList = this.list(totalPage, curPage);
    return (
      <div className="pagination-wrap" style={{"display": total<=pageSize ? 'none' : ''}}>
        <ul className="pagination">
          {/*上一页*/}
          {curPage>1 && <li className="last" onClick={() =>this.toPage(curPage-1)}>上一页</li>}
          {/*页码列表*/}
          {pageList.map((item, index) =>
            <li key={index} className={`page-button ${item === curPage ? "active" : ""} ${item === "..." ? "omit" : ""}`} 
                onClick={() =>this.toPage(item)}>{item}</li>)}
          {/*下一页*/}
          {curPage<totalPage && <li className="next" onClick={() =>this.toPage(curPage+1)}>下一页</li>}
        </ul>
      </div>
    );
  }
}
