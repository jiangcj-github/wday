import React, {Component} from 'react';
import ViewBase from "../../../components/ViewBase";
import {
    NavLink,
} from "react-router-dom";
import Pagination from "../../../common/components/Pagination";
import Progress from "../../../common/components/Progress";
import Heat from "../../../common/components/Heat";
import UserController from "../../../class/user/UserController";
import LoginController from "../../../class/login/LoginController";

export default class ProjectSearch extends ViewBase {
    constructor() {
        super();
        this.state = {
            sortByTime: 0 ,      // 时间排序

            showAlert: false,     //提示框
            alertContent: "",
        };
    }

    highLight(word, txt){
        let txtArr = txt.split(word);
        let resJsx = [];
        for(let i=0; i<txtArr.length-1; i++){
            resJsx.push(txtArr[i],<i>{word}</i>);
        }
        resJsx.push(txtArr[txtArr.length-1]);
        return resJsx;
    }

    //添加收藏
    async addCollect(item){
        if(!LoginController().isLogin()){
            this.bus.emit("showLoginDialog");
            return;
        }
        let data = await UserController().setCollect(1, item.id, !item.isCollect);
        if(data.msg){
            this.setState({showAlert: true, alertContent: data.msg});
            return;
        }
        item.isCollect = !item.isCollect;
        this.setState({showAlert: true, alertContent: item.isCollect ? "收藏成功" : "取消收藏成功"});
    }

    render() {
        let {history, onSearch} = this.props;
        let {curPage, total, pageSize, word, resultList} = this.props.data;
        let {sortByTime, showAlert, alertContent} = this.state;

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
                                    <b onClick={()=>history.push(`/project/detail?id=${item.id}`)}>
                                        {this.highLight(word, item.name)}</b>
                                </p>
                                <p className="p2">
                                    {item.recvCoin && item.recvCoin.map((item,index) => <i key={index}>#{item}#</i>)}
                                </p>
                            </div>
                            {/*时间*/}
                            <div className="time">
                                <p>始：{item.startTime && new Date(item.startTime).end()}</p>
                                <p>终：{item.endTime && new Date(item.endTime).end()}</p>
                            </div>
                            {/*众筹价格*/}
                            <div className="price">
                                {item.icoPrices && item.icoPrices.map((item,index) => <p key={index}>$1.234</p>)}
                            </div>
                            {/*目标金额*/}
                            <div className="minmax">
                                <p>低：{item.minNum}{item.minUnit}</p>
                                <p>高：{item.maxNum}{item.maxUnit}</p>
                            </div>
                            {/*实际进度*/}
                            <div className="step">
                                <p>{item.actualNum}{item.actualUnit}</p>
                                <Progress step={item.step}/>
                                <i>{item.step}%</i>
                            </div>
                            {/*热度*/}
                            <div className="heat">
                                <Heat width={20} height={60} step={item.heat}/>
                                <i>{item.heat}</i>
                            </div>
                            {/*收藏*/}
                            <div className="collect">
                                <i className={item.isCollect ? "yes" : "no"} onClick={this.addCollect.bind(this,item)}/>
                            </div>
                        </div>)}
                </div>
                {/*翻页*/}
                <div className="page">
                    <Pagination curPage={curPage} total={total} pageSize={pageSize} onChange={p=>onSearch(p)}/>
                </div>
                {/*提示*/}
                {showAlert &&
                    <Alert content={alertContent} onClose={()=>this.setState({showAlert: false})}/>}

            </div>
        );
    }
}