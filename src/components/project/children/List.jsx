import React, {Component} from 'react';
import ViewBase from "../../../components/ViewBase";
import {
    NavLink,
} from "react-router-dom";
import Pagination from "../../../common/components/Pagination"
import Progress from "../../../common/components/Progress"
import Heat from "../../../common/components/Heat"

export default class List extends ViewBase {
    constructor() {
        super();
        this.state = {
            viewMode: 0 ,       // 视图模式 0-列表,1-卡片
            sortByTime: 0 ,      // 时间排序
            tabItem: 0,        //选中tab项, 0-收藏，1-进行中，2-即将开始，3-已结束
        };

        //滚动事件,固定tab
        this.onScroll= () => {
            let $content = document.querySelector(".project-list");
            let $tab = document.querySelector('.tab');
            if($content.getBoundingClientRect().top < 0){
                $tab.classList.add("fix");
            }else{
                $tab.classList.remove("fix");
            }
        };
    }

    componentDidMount() {
        window.addEventListener("scroll", this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll);
    }

    render() {
        let {history} = this.props;
        let {viewMode,sortByTime,tabItem} = this.state;
        return (
            <div className="project-list">
                {/*tab栏*/}
                <div className="tab-wrap">
                    <div className="tab">
                        {/*收藏，进行中，即将开始，已结束*/}
                        <ul className="classify">
                            <li className={tabItem === 0 ? "active" : ""} onClick={()=>this.setState({tabItem: 0})}>收藏</li>
                            <li className={tabItem === 1 ? "active" : ""} onClick={()=>this.setState({tabItem: 1})}>进行中</li>
                            <li className={tabItem === 2 ? "active" : ""} onClick={()=>this.setState({tabItem: 2})}>即将开始</li>
                            <li className={tabItem === 3 ? "active" : ""} onClick={()=>this.setState({tabItem: 3})}>已结束</li>
                        </ul>
                        {/*列表视图，卡片视图*/}
                        <ul className="view">
                            <li className={`v-list ${viewMode === 0 ? "active" : ""}`} onClick={()=>this.setState({viewMode:0})}/>
                            <li className={`v-card ${viewMode === 1 ? "active" : ""}`} onClick={()=>this.setState({viewMode:1})}/>
                        </ul>
                    </div>
                </div>
                <div className="table">
                    {/*表头*/}
                    <div className="thead">
                        <p className="name">项目名称</p>
                        <p className="time sortable" onClick={()=>this.setState({sortByTime: ++sortByTime%3})}>
                            时间<i className={["none","up","down"][sortByTime]}/>
                        </p>
                        <p className="price">众筹价格</p>
                        <p className="minmax">目标金额</p>
                        <p className="step">实际进度</p>
                        <p className="coin">接受币种</p>
                        <p className="heat">热度</p>
                        <p className="collect">收藏</p>
                    </div>
                    {/*项目列表*/}

                    <div className="tr" onClick={()=>history.push("/project/detail?id=xxx")}>
                        {/*项目名称*/}
                        <div className="name">
                            <img src="/static/web/icon_coin_five@3x.png"/>
                            <p className="p1">
                                <b>ISU</b>
                                <span>In Sue Usa</span>
                            </p>
                            <p className="p2">
                                <i>#智能合约#</i>
                                <i>#内容版权#</i>
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
                        {/*接受币种*/}
                        <div className="coin">
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
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
                    </div>
                    <div className="tr" onClick={()=>history.push("/project/detail?id=xxx")}>
                        {/*项目名称*/}
                        <div className="name">
                            <img src="/static/web/icon_coin_five@3x.png"/>
                            <p className="p1">
                                <b>ISU</b>
                                <span>In Sue Usa</span>
                            </p>
                            <p className="p2">
                                <i>#智能合约#</i>
                                <i>#内容版权#</i>
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
                        {/*接受币种*/}
                        <div className="coin">
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
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
                    </div>
                    <div className="tr" onClick={()=>history.push("/project/detail?id=xxx")}>
                        {/*项目名称*/}
                        <div className="name">
                            <img src="/static/web/icon_coin_five@3x.png"/>
                            <p className="p1">
                                <b>ISU</b>
                                <span>In Sue Usa</span>
                            </p>
                            <p className="p2">
                                <i>#智能合约#</i>
                                <i>#内容版权#</i>
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
                        {/*接受币种*/}
                        <div className="coin">
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
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
                    </div>
                    <div className="tr" onClick={()=>history.push("/project/detail?id=xxx")}>
                        {/*项目名称*/}
                        <div className="name">
                            <img src="/static/web/icon_coin_five@3x.png"/>
                            <p className="p1">
                                <b>ISU</b>
                                <span>In Sue Usa</span>
                            </p>
                            <p className="p2">
                                <i>#智能合约#</i>
                                <i>#内容版权#</i>
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
                        {/*接受币种*/}
                        <div className="coin">
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
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
                    </div>
                    <div className="tr" onClick={()=>history.push("/project/detail?id=xxx")}>
                        {/*项目名称*/}
                        <div className="name">
                            <img src="/static/web/icon_coin_five@3x.png"/>
                            <p className="p1">
                                <b>ISU</b>
                                <span>In Sue Usa</span>
                            </p>
                            <p className="p2">
                                <i>#智能合约#</i>
                                <i>#内容版权#</i>
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
                        {/*接受币种*/}
                        <div className="coin">
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
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
                    </div>
                    <div className="tr" onClick={()=>history.push("/project/detail?id=xxx")}>
                        {/*项目名称*/}
                        <div className="name">
                            <img src="/static/web/icon_coin_five@3x.png"/>
                            <p className="p1">
                                <b>ISU</b>
                                <span>In Sue Usa</span>
                            </p>
                            <p className="p2">
                                <i>#智能合约#</i>
                                <i>#内容版权#</i>
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
                        {/*接受币种*/}
                        <div className="coin">
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
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
                    </div>
                    <div className="tr" onClick={()=>history.push("/project/detail?id=xxx")}>
                        {/*项目名称*/}
                        <div className="name">
                            <img src="/static/web/icon_coin_five@3x.png"/>
                            <p className="p1">
                                <b>ISU</b>
                                <span>In Sue Usa</span>
                            </p>
                            <p className="p2">
                                <i>#智能合约#</i>
                                <i>#内容版权#</i>
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
                        {/*接受币种*/}
                        <div className="coin">
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
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
                    </div>
                    <div className="tr" onClick={()=>history.push("/project/detail?id=xxx")}>
                        {/*项目名称*/}
                        <div className="name">
                            <img src="/static/web/icon_coin_five@3x.png"/>
                            <p className="p1">
                                <b>ISU</b>
                                <span>In Sue Usa</span>
                            </p>
                            <p className="p2">
                                <i>#智能合约#</i>
                                <i>#内容版权#</i>
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
                        {/*接受币种*/}
                        <div className="coin">
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
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
                    </div>
                    <div className="tr" onClick={()=>history.push("/project/detail?id=xxx")}>
                        {/*项目名称*/}
                        <div className="name">
                            <img src="/static/web/icon_coin_five@3x.png"/>
                            <p className="p1">
                                <b>ISU</b>
                                <span>In Sue Usa</span>
                            </p>
                            <p className="p2">
                                <i>#智能合约#</i>
                                <i>#内容版权#</i>
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
                        {/*接受币种*/}
                        <div className="coin">
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
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
                    </div>
                    <div className="tr" onClick={()=>history.push("/project/detail?id=xxx")}>
                        {/*项目名称*/}
                        <div className="name">
                            <img src="/static/web/icon_coin_five@3x.png"/>
                            <p className="p1">
                                <b>ISU</b>
                                <span>In Sue Usa</span>
                            </p>
                            <p className="p2">
                                <i>#智能合约#</i>
                                <i>#内容版权#</i>
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
                        {/*接受币种*/}
                        <div className="coin">
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
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
                    </div>
                    <div className="tr" onClick={()=>history.push("/project/detail?id=xxx")}>
                        {/*项目名称*/}
                        <div className="name">
                            <img src="/static/web/icon_coin_five@3x.png"/>
                            <p className="p1">
                                <b>ISU</b>
                                <span>In Sue Usa</span>
                            </p>
                            <p className="p2">
                                <i>#智能合约#</i>
                                <i>#内容版权#</i>
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
                        {/*接受币种*/}
                        <div className="coin">
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
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
                    </div>
                    <div className="tr" onClick={()=>history.push("/project/detail?id=xxx")}>
                        {/*项目名称*/}
                        <div className="name">
                            <img src="/static/web/icon_coin_five@3x.png"/>
                            <p className="p1">
                                <b>ISU</b>
                                <span>In Sue Usa</span>
                            </p>
                            <p className="p2">
                                <i>#智能合约#</i>
                                <i>#内容版权#</i>
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
                        {/*接受币种*/}
                        <div className="coin">
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
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
                    </div>
                    <div className="tr" onClick={()=>history.push("/project/detail?id=xxx")}>
                        {/*项目名称*/}
                        <div className="name">
                            <img src="/static/web/icon_coin_five@3x.png"/>
                            <p className="p1">
                                <b>ISU</b>
                                <span>In Sue Usa</span>
                            </p>
                            <p className="p2">
                                <i>#智能合约#</i>
                                <i>#内容版权#</i>
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
                        {/*接受币种*/}
                        <div className="coin">
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
                            <p>
                                <span>BTC</span>
                                <span>BTC</span>
                            </p>
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
                    </div>

                </div>
                {/*翻页*/}
                <div className="page">
                    <Pagination currentPage={2} total={201} pageSize={20}/>
                </div>

            </div>)
    }
}