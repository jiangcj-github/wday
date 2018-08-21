import React, { Component } from "react";
import ViewBase from "../../../components/ViewBase";
/*
  currentPage	当前页码，默认为1
  total	数据总条数
  pageSize 每页数据条数
  onChange页码跳转的回调
*/

export default class Pagination extends ViewBase {
  constructor(props) {
    super(props);
    this.state = { currentPage: props.currentPage ? props.currentPage : 1 };
    this.totalPage =
      props.total % props.pageSize === 0
        ? parseInt(props.total / props.pageSize)
        : parseInt(props.total / props.pageSize) + 1;
  }

  list(totalPage, currentPage) {
    if (totalPage < 7) {
      return Array.from({ length: totalPage }, (item, index) => index + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPage];
    }
    if (currentPage < totalPage - 3) {
      return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPage];
    }
    if (currentPage >= totalPage - 3) {
      return [1, "...", totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
    }
  }

  shouldComponentUpdate (nextProps,nextState){
    if (nextState.currentPage === this.state.currentPage) return false;
    this.props.onChange && this.props.onChange(nextState.currentPage);
    return true;
  }

  render() {
    let { total, pageSize } = this.props;
    let currentPage = this.state.currentPage;
    let pagelist = this.list(this.totalPage, currentPage);

    return (
      <div className="pagination-wrap" style={{ display: (total / pageSize) <= 1 ? 'none' : ''}}>
        <ul className="pagination">
          {/*上一页*/}
          {currentPage>1 &&
            <li className="last"
                onClick={() => {
                    if (currentPage - 1 < 1) return;
                    this.setState({ currentPage: currentPage - 1 });
                }}>上一页</li>}
          {/*页码列表*/}
          {pagelist.map((item, index) =>
            <li key={index}
                className={`page-button ${item === currentPage ? "active" : ""} ${item === "..." ? "omit" : ""}`}
                onClick={() => {
                  if (item === "...") return;
                  this.setState({ currentPage: item });
                }}>{item}</li>)}
          {/*下一页*/}
          {currentPage<this.totalPage &&
            <li className="next"
                onClick={() => {
                    if (currentPage + 1 > this.totalPage) return;
                    this.setState({currentPage: currentPage + 1});
                }}>下一页</li>}
        </ul>
      </div>
    );
  }
}
