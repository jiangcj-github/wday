import React, {Component} from 'react';
import ViewBase from "../../../components/ViewBase";
import {
    NavLink,
} from "react-router-dom";
import Pagination from "../../../common/components/Pagination"
import Progress from "../../../common/components/Progress"
import Heat from "../../../common/components/Heat"

export default class ProjectSearch extends ViewBase {
    constructor() {
        super();
        this.state = {
            sortByTime: 0 ,      // 时间排序
        };
    }

    render() {
        let {history,curPage,total,pageSize,onSearch} = this.props;
        let {sortByTime} = this.state;
        let resultList = this.props.resultList;

        return (
            <div className="project-search">
                <div className="table">
                    {/*表头*/}
                    <div className="thead">
                        <p className="name">项目名称</p>
                        <p className="time sortable"
                           onClick={()=>this.setState({sortByTime: ++sortByTime%3})}>
                            时间<i className={["none","up","down"][sortByTime]}/>
                        </p>
                        <p className="price">众筹价格</p>
                        <p className="minmax">目标金额</p>
                        <p className="step">实际进度</p>
                        <p className="heat">热度</p>
                        <p className="collect">收藏</p>
                    </div>
                    {/*项目列表*/}
                    {resultList.map((item,index)=>
                        <div className="tr" key={index}>
                            {/*项目名称*/}
                            <div className="name">
                                <p className="p1">
                                    <img src={item.logo}
                                         onClick={()=>history.push(`/project/detail?id=${item.id}`)}/>
                                    <b onClick={()=>history.push(`/project/detail?id=${item.id}`)}>{item.name}</b>
                                </p>
                                <p className="p2">
                                    <i>#智能合约#</i>
                                </p>
                            </div>
                            {/*时间*/}
                            <div className="time">
                                <p>始：06-25</p>
                                <p>终：07-25</p>
                            </div>
                            {/*众筹价格*/}
                            <div className="price">
                                <p>$1.234</p>
                                <p>$1.234</p>
                                <p>$1.234</p>
                            </div>
                            {/*目标金额*/}
                            <div className="minmax">
                                <p>低：100万 USD</p>
                                <p>高：1000万 USD</p>
                            </div>
                            {/*实际进度*/}
                            <div className="step">
                                <p>500万 USD</p>
                                <Progress step={30}/>
                                <i>85%</i>
                            </div>
                            {/*热度*/}
                            <div className="heat">
                                <Heat width={20} height={60} step={80}/>
                                <i>80</i>
                            </div>
                            {/*收藏*/}
                            <div className="collect">
                                <i className={["yes","no"][0]}/>
                            </div>
                        </div>)}
                </div>
                {/*翻页*/}
                <div className="page">
                    <Pagination curPage={curPage} total={total} pageSize={pageSize} onChange={p=>onSearch(p)}/>
                </div>
            </div>
        );
    }
}