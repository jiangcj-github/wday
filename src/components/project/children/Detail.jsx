import React, {Component} from 'react';
import ViewBase from "../../../components/ViewBase";
import {
    NavLink,
} from "react-router-dom";
import Progress from "../../../common/components/Progress"
import Heat from "../../../common/components/Heat"
import ProjectController from "../../../class/project/ProjectController";

export default class List extends ViewBase {
    constructor() {
        super();
        this.state = {
            viewMode: "list" ,       // 视图模式 list,card
            sortByTime: 0 ,   // 时间排序
            tab: 0,        //tab选中项
        };
        this.controller = ProjectController();

        //滚动事件,固定tab
        this.onScroll= () => {
            let $content = document.querySelector(".content");
            let $tab = document.querySelector('.tab');
            if($content.getBoundingClientRect().top <= 0){
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

    scrollTab(tab){
        let sel = [".para1",".para4",".para6",".para7"][tab];
        let $tabItem = document.querySelector(sel);
        document.documentElement.scrollTop += $tabItem.getBoundingClientRect().top - 50;
        this.setState({tab: tab});
    }


    render() {
        let {viewMode,sortByTime,tab} = this.state;
        return (
            <div className="project-detail">
                {/*顶部-项目简介*/}
                <div className="profile-wrap">
                    <div className="profile">
                        {/*项目名称，分享，收藏*/}
                        <div className="d1">
                            <div className="d1-l">
                                <img src="/static/web/icon_coin_five@3x.png"/>
                                <p className="name">
                                    <b>ISU</b>
                                    <span>In Sue Usa</span>
                                </p>
                                <p className="badge">
                                    <i>#智能合约#</i>
                                    <i>#内容版权#</i>
                                </p>
                            </div>
                            <div className="d1-r">
                                <p className="status">ICO已结束</p>
                                <p className="share-wrap">
                                    <i className="tw"/>
                                    <i className="fb"/>
                                    <i className="share"/>
                                    <i className="br"/>
                                    <i className="collect no">收藏</i>
                                </p>
                            </div>
                        </div>
                        {/*项目参数*/}
                        <div className="d2">
                            <div className="thead">
                                <p className="time">时间</p>
                                <p className="minmax">目标金额</p>
                                <p className="recvCoin">接受币种</p>
                                <p className="step">实际进度</p>
                                <p className="heat">热度</p>
                            </div>
                            <div className="tr">
                                <div className="time">
                                    <p>始：06-25</p>
                                    <p>终：07-25</p>
                                </div>
                                <div className="minmax">
                                    <p>低：100万 USD</p>
                                    <p>高：1000万 USD</p>
                                </div>
                                <div className="recvCoin">
                                    <p>
                                        <span>BTC</span>
                                        <span>ETH</span>
                                    </p>
                                    <p>
                                        <span>BTC</span>
                                        <span>ETH</span>
                                    </p>
                                </div>
                                <div className="step">
                                    <p>500万 USD</p>
                                    <Progress step={30}/>
                                    <i>85%</i>
                                </div>
                                <div className="heat">
                                </div>

                            </div>
                        </div>
                        {/*官网，白皮书*/}
                        <div className="link">
                            <a>官网</a>
                            <a>白皮书</a>
                        </div>
                    </div>
                </div>
                {/*内容区*/}
                <div className="content">
                    {/*tab栏*/}
                    <div className="tab-wrap">
                        <div className="tab">
                            <a className={tab === 0 ? "active" : ""} onClick={this.scrollTab.bind(this,0)}>基本信息</a>
                            <a className={tab === 1 ? "active" : ""} onClick={this.scrollTab.bind(this,1)}>热度</a>
                            <a className={tab === 2 ? "active" : ""} onClick={this.scrollTab.bind(this,2)}>团队介绍</a>
                            <a className={tab === 3 ? "active" : ""} onClick={this.scrollTab.bind(this,3)}>路线图</a>
                            <a className={tab === 4 ? "active" : ""}>相关文章</a>
                            <a className={tab === 5 ? "active" : ""}>留言</a>
                        </div>
                    </div>
                    {/*项目介绍*/}
                    <div className="para para1">
                        <h3>
                            <img src={this.imageDict.$_icon_project_xmjs}/>
                            <span>项目介绍</span>
                        </h3>
                        <p>
                            Review.Network直接连接公司和消费者，改变了公司进行市场研究的方式。在回复调查和审查产品和服务时
                            ，会给予高度细分和有针对性的用户社区奖励。将通过此奖励系统创建具有宝贵反馈的社交网络，并为公司提供关于其关
                            键人口统计数据的公正和有价值的数据的数据…
                            <a className="more">查看全部</a>
                            <a className="fold">收起</a>
                        </p>
                    </div>
                    {/*代币详情*/}
                    <div className="para para2">
                        <h3>
                            <img src={this.imageDict.$_icon_project_dbxq}/>
                            <span>代币详情</span>
                        </h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <b>名称：</b>
                                        <i>In Sue Usa</i></td>
                                    <td>
                                        <b>ICO价格：</b>
                                        <i>In Sue Usa</i>
                                    </td>
                                    <td>
                                        <b>名称：</b>
                                        <i>$1.24、</i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>简称：</b>
                                        <i>ISU</i>
                                    </td>
                                    <td>
                                        <b>ICO总量：</b>
                                        <i>1000万</i>
                                    </td>
                                    <td>
                                        <b>目标金额(高)：</b>
                                        <i>- -</i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>平台：</b>
                                        <i>ISU</i>
                                    </td>
                                    <td>
                                        <b>发行总量：</b>
                                        <i>1亿</i>
                                    </td>
                                    <td>
                                        <b>实际金额：</b>
                                        <i>$1000万</i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>地区：</b>
                                        <i>新加坡</i>
                                    </td>
                                    <td>
                                        <b>接受币种：</b>
                                        <i>USDT、BTC、BCH</i>
                                    </td>
                                    <td>
                                        <b>ICO进度：</b>
                                        <i>100%</i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/*项目优势*/}
                    <div className="para para3">
                        <h3>
                            <img src={this.imageDict.$_icon_project_xmys}/>
                            <span>项目优势</span>
                        </h3>
                        <p>技术方向：智能合约、内容版权、去中心化应用</p>
                        <p>项目特点：高性能、安全</p>
                    </div>
                    {/*热度评级*/}
                    <div className="para para4">
                        <h3>
                            <img src={this.imageDict.$_icon_project_rdpj}/>
                            <span>热度评级</span>
                        </h3>
                        <div className="flex">
                            <div className="left">
                                <Heat width={36} height={150} step={70}/>
                                <i>70</i>
                            </div>
                            <ul>
                                <li>
                                    <label>媒体报道（10分）</label>
                                    <span>4分</span>
                                </li>
                                <li>
                                    <label>搜索热度（10分）</label>
                                    <span>4分</span>
                                </li>
                                <li>
                                    <label>社群建设（10分）</label>
                                    <span>4分</span>
                                </li>
                                <li>
                                    <label>团队背景（10分）</label>
                                    <span>4分</span>
                                </li>
                                <li>
                                    <label>技术可行性（10分）</label>
                                    <span>4分</span>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <label>市场潜力（10分）</label>
                                    <span>4分</span>
                                </li>
                                <li>
                                    <label>商业模式（10分）</label>
                                    <span>4分</span>
                                </li>
                                <li>
                                    <label>产品创新性（10分）</label>
                                    <span>4分</span>
                                </li>
                                <li>
                                    <label>白皮书可信性（10分）</label>
                                    <span>4分</span>
                                </li>
                                <li>
                                    <label>风险承受能力（10分）</label>
                                    <span>4分</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/*用户打分*/}
                    <div className="para para5">
                        <h3>
                            <img src={this.imageDict.$_icon_project_yhdf}/>
                            <span>用户打分</span>
                        </h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td>市场潜力（10分）</td>
                                    <td><span className="radio yes">很高</span></td>
                                    <td><span className="radio no">高</span></td>
                                    <td><span className="radio no">一般</span></td>
                                    <td><span className="radio no">低</span></td>
                                    <td><span className="radio no">很低</span></td>
                                </tr>
                                <tr>
                                    <td>创业模式（10分）</td>
                                    <td><span className="radio no">很高</span></td>
                                    <td><span className="radio no">高</span></td>
                                    <td><span className="radio no">一般</span></td>
                                    <td><span className="radio no">低</span></td>
                                    <td><span className="radio no">很低</span></td>
                                </tr>
                                <tr>
                                    <td>媒体报道（10分）</td>
                                    <td><span className="radio yes">很高</span></td>
                                    <td><span className="radio yes">高</span></td>
                                    <td><span className="radio no">一般</span></td>
                                    <td><span className="radio no">低</span></td>
                                    <td><span className="radio no">很低</span></td>
                                </tr>
                                <tr>
                                    <td>媒体报道（10分）</td>
                                    <td><span className="radio no">很高</span></td>
                                    <td><span className="radio no">高</span></td>
                                    <td><span className="radio no">一般</span></td>
                                    <td><span className="radio no">低</span></td>
                                    <td><span className="radio no">很低</span></td>
                                </tr>
                                <tr>
                                    <td>媒体报道（10分）</td>
                                    <td><span className="radio no">很高</span></td>
                                    <td><span className="radio no">高</span></td>
                                    <td><span className="radio no">一般</span></td>
                                    <td><span className="radio no">低</span></td>
                                    <td><span className="radio no">很低</span></td>
                                </tr>
                                <tr>
                                    <td>媒体报道（10分）</td>
                                    <td><span className="radio no">很高</span></td>
                                    <td><span className="radio no">高</span></td>
                                    <td><span className="radio no">一般</span></td>
                                    <td><span className="radio no">低</span></td>
                                    <td><span className="radio no">很低</span></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="submit">
                            <button>提交</button>
                        </div>
                    </div>
                    {/*团队介绍*/}
                    <div className="para para6">
                        <h3>
                            <img src={this.imageDict.$_icon_project_tdjs}/>
                            <span>团队介绍</span>
                        </h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <img src="/static/web/icon_coin_five@3x.png"/>
                                        <b>狄公</b>
                                        <i>职位名称</i>
                                    </td>
                                    <td>
                                        <img src="/static/web/icon_coin_five@3x.png"/>
                                        <b>狄公</b>
                                        <i>职位名称</i>
                                    </td>
                                    <td>
                                        <img src="/static/web/icon_coin_five@3x.png"/>
                                        <b>狄公</b>
                                        <i>职位名称</i>
                                    </td>
                                    <td>
                                        <img src="/static/web/icon_coin_five@3x.png"/>
                                        <b>狄公</b>
                                        <i>职位名称</i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="/static/web/icon_coin_five@3x.png"/>
                                        <b>狄公</b>
                                        <i>职位名称</i>
                                    </td>
                                    <td>
                                        <img src="/static/web/icon_coin_five@3x.png"/>
                                        <b>狄公</b>
                                        <i>职位名称</i>
                                    </td>
                                    <td>
                                        <img src="/static/web/icon_coin_five@3x.png"/>
                                        <b>狄公</b>
                                        <i>职位名称</i>
                                    </td>
                                    <td>
                                        <img src="/static/web/icon_coin_five@3x.png"/>
                                        <b>狄公</b>
                                        <i>职位名称</i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/*路线图*/}
                    <div className="para para7">
                        <h3>
                            <img src={this.imageDict.$_icon_project_lxt}/>
                            <span>路线图</span>
                        </h3>
                        <div className="route">
                            <p>
                                <span className="s1">2016-06-29</span>
                                <span className="s2">阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一</span>
                            </p>
                            <p>
                                <span className="s1">2016-06-29</span>
                                <span className="s2">阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一</span>
                            </p>
                            <p>
                                <span className="s1">2016-06-29</span>
                                <span className="s2">阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一</span>
                            </p>
                            <p>
                                <span className="s1">2016-06-29</span>
                                <span className="s2">阶段目标一阶段目标一阶段目标一阶段目标一阶段目阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一阶段目标一标一</span>
                            </p>
                            <i className="line"/>
                        </div>
                    </div>
                    {/*相关文章*/}
                </div>
            </div>)
    }
}