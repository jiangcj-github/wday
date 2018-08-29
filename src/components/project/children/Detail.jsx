import React, {Component} from 'react';
import ViewBase from "../../../components/ViewBase";
import {
    NavLink,
} from "react-router-dom";
import Progress from "../../../common/components/Progress"
import Heat from "../../../common/components/Heat"
import Alert from "../../../common/components/Alert"
import ProjectController from "../../../class/project/ProjectController";
import UserController from "../../../class/user/UserController";
import LoginController from "../../../class/login/LoginController";

export default class List extends ViewBase {
    constructor() {
        super();
        this.state = {
            tab: 0,         //tab选中项
            project: {},
            isFold: true,  // 是否查看全部
            scoreGroup: [],         //打分

            showAlert: false,
            alertContent: "",
        };

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

    async componentDidMount() {
        window.addEventListener("scroll", this.onScroll);

        let id = this.getQuery("id");
        let data = await ProjectController().getProjectDetail(id);
        if(data.msg){
            //this.props.history.push("/error");
        }
        this.setState({project: data});
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

    async submitScore(){
        let scoreGroup = this.state.scoreGroup;

        this.setState({showAlert: true, alertContent: "打分成功"});
    }

    render() {
        let {tab,isFold,showAlert,alertContent} = this.state;
        let project = this.state.project || {};
        let scoreGroup = this.state.scoreGroup;
        //是否登录
        let isLogin = LoginController().isLogin();
        // 打分
        let scoreMap = {9:"很高",7:"高", 5:"一般",3:"低",1:"很低"};

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
                                    <b>{project.name}</b>
                                    <span>{}</span>
                                </p>
                                <p className="badge">
                                    {project.badgeList && project.badgeList.map((item,index) => <i key={index}>#{item}#</i>)}
                                </p>
                            </div>
                            <div className="d1-r">
                                <p className="status">{{1:"进行中",2:"即将开始",3:"已结束"}[project.type]}</p>
                                <p className="share-wrap">
                                    <i className="tw"/>
                                    <i className="fb"/>
                                    <i className="share"/>
                                    <i className="br"/>
                                    <i className={`collect ${project.isCollect ? "yes":"no"}`} onClick={()=>{
                                      if(!isLogin){
                                        this.bus.emit("showLoginDialog");
                                        return;
                                      }
                                      UserController().setCollect(1, project.id, !project.isCollect).then(data =>{
                                        if(data.msg){
                                          this.setState({showAlert: true, alertContent: data.msg});
                                          return;
                                        }
                                        project.isCollect = !project.isCollect;
                                        this.setState({showAlert: true, alertContent: "收藏成功"});
                                      })}
                                    }>收藏</i>
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
                                    <p>始：{project.startTime && new Date(project.startTime).end()}</p>
                                    <p>终：{project.endTime && new Date(project.endTime).end()}</p>
                                </div>
                                <div className="minmax">
                                    <p>低：{project.minUnit}{project.minNum}</p>
                                    <p>高：{project.maxUnit}{project.maxNum}</p>
                                </div>
                                <div className="recvCoin">
                                    <p>
                                      {project.recvCoin && project.recvCoin.map((item,index)=><span key={index}>{item}</span>)}
                                    </p>
                                </div>
                                <div className="step">
                                    <p>{project.actualUnit}{project.actualNum}</p>
                                    <Progress step={project.step}/>
                                    <i>{project.step}%</i>
                                </div>
                                <div className="heat">
                                    <Heat width={20} height={60} step={project.heat}/>
                                    <i>{project.heat}</i>
                                </div>
                            </div>
                        </div>
                        {/*官网，白皮书*/}
                        <div className="link">
                            <a href={project.website} target="_blank">官网</a>
                            <a href={project.whiteSkin} target="_blank">白皮书</a>
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
                            {project.profile}
                            {isFold ?
                              <a className="more" onClick={()=>this.setState({isFold: false})}>查看全部</a>
                              :
                              <a className="fold" onClick={()=>this.setState({isFold: true})}>收起</a>}
                        </p>
                    </div>

                    {/*代币详情*/}
                    <div className="para para2">
                        <h3>
                            <img src={project.logo}/>
                            <span>代币详情</span>
                        </h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <b>名称：</b>
                                        <i>{project.name}</i>
                                    </td>
                                    <td>
                                        <b>ICO价格：</b>
                                        <i>{project.icoPrice}</i>
                                    </td>
                                    <td>
                                        <b>名称：</b>
                                        <i>{project.name}</i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>简称：</b>
                                        <i>{project.name}</i>
                                    </td>
                                    <td>
                                        <b>ICO总量：</b>
                                        <i>{project.icoNum}</i>
                                    </td>
                                    <td>
                                        <b>目标金额(高)：</b>
                                        <i>- -</i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>平台：</b>
                                        <i>{project.platform}</i>
                                    </td>
                                    <td>
                                        <b>发行总量：</b>
                                        <i>{project.publicNum}</i>
                                    </td>
                                    <td>
                                        <b>实际金额：</b>
                                        <i>{project.icoNum}</i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>地区：</b>
                                        <i>{project.area}</i>
                                    </td>
                                    <td>
                                        <b>接受币种：</b>
                                        <i>{project.recvCoin && project.recvCoin.join(",")}</i>
                                    </td>
                                    <td>
                                        <b>ICO进度：</b>
                                        <i>{project.step}%</i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {/*已结束部分-行情,回报*/}
                        <h3 className="p2-h3">
                          <i/><span>行情</span>
                        </h3>
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <b>现价：</b>
                                <i>{project.markets && project.markets.curPrice}</i></td>
                              <td>
                                <b>24h涨跌幅：</b>
                                <i>{project.markets && project.markets.rise}%</i>
                              </td>
                              <td>
                                <b>流通市值：</b>
                                <i>{project.markets && project.markets.marketValue}</i>
                              </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>24h最低价：</b>
                                    <i>{project.markets && project.markets.lowPrice}</i>
                                </td>
                                <td>
                                    <b>24h成交量：</b>
                                    <i>{project.markets && project.markets.volume}</i>
                                </td>
                                <td>
                                    <b>上架交易所：</b>
                                    <i>{project.markets && project.markets.num}</i>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>24h最高价：</b>
                                    <i>{project.markets && project.markets.highPrice}</i>
                                </td>
                                <td>
                                    <b>24h成交额：</b>
                                    <i>{project.markets && project.markets.turnover}</i>
                                </td>
                                <td>
                                    <b>数据来源：</b>
                                    <i>{project.markets && project.markets.source}</i>
                                </td>
                            </tr>
                          </tbody>
                        </table>
                        <h3 className="p2-h3">
                            <i/><span>回报</span>
                        </h3>
                        <div className="hb-c">
                            <div className="price">
                                <label>ICO价格：</label>
                                <div>
                                  {project.returns && project.returns.icoPrice && project.returns.icoPrice.map((item,index)=> <p key={index}>{item}</p>)}
                                </div>
                            </div>
                            <div className="price">
                                <label>现价：</label>
                                <div>
                                  {project.returns && project.returns.curPrice && project.returns.curPrice.map((item,index)=> <p key={index}>{item}</p>)}
                                </div>
                            </div>
                            <p className="profit">
                                <label>USD收益率</label>
                                <i>{project.returns && project.returns.usdProfit}</i>
                            </p>
                            <p className="profit">
                                <label>BTC收益率</label>
                                <i>{project.returns && project.returns.btcProfit}</i>
                            </p>
                            <p className="profit">
                                <label>ETH收益率</label>
                                <i>{project.returns && project.returns.etcProfit}</i>
                            </p>
                        </div>

                    </div>

                    {/*项目优势*/}
                    <div className="para para3">
                        <h3>
                            <img src={this.imageDict.$_icon_project_xmys}/>
                            <span>项目优势</span>
                        </h3>
                        {project.advantages && Object.keys(project.advantages).map((item,index)=>
                          <p key={index}>{item}：{project.advantages[item]}</p>)}
                    </div>

                    {/*热度评级*/}
                    <div className="para para4">
                        <h3>
                            <img src={this.imageDict.$_icon_project_rdpj}/>
                            <span>热度评级</span>
                        </h3>
                        <div className="flex">
                            <div className="left">
                                <Heat width={36} height={150} step={project.heat}/>
                                <i>{project.heat}</i>
                            </div>
                            <ul>
                                <li>
                                    <label>媒体报道 (10分)</label>
                                    <span>{}分</span>
                                </li>
                                <li>
                                    <label>搜索热度 (10分)</label>
                                    <span>{}分</span>
                                </li>
                                <li>
                                    <label>社群建设 (10分)</label>
                                    <span>{}分</span>
                                </li>
                                <li>
                                    <label>团队背景 (10分)</label>
                                    <span>{}分</span>
                                </li>
                                <li>
                                    <label>技术可行性 (10分)</label>
                                    <span>{}分</span>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <label>市场潜力 (10分)</label>
                                    <span>{}分</span>
                                </li>
                                <li>
                                    <label>商业模式 (10分)</label>
                                    <span>{}分</span>
                                </li>
                                <li>
                                    <label>产品创新性 (10分)</label>
                                    <span>{}分</span>
                                </li>
                                <li>
                                    <label>白皮书可信性 (10分)</label>
                                    <span>{}分</span>
                                </li>
                                <li>
                                    <label>风险承受能力 (10分)</label>
                                    <span>{}分</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/*用户打分-进行中*/}
                    {project.type === 1 &&
                        <div className="para para5">
                            <h3>
                                <img src={this.imageDict.$_icon_project_yhdf}/>
                                <span>用户打分</span>
                            </h3>
                            <table>
                                <tbody>
                                  <tr>
                                    <td>市场潜力 (10分)</td>
                                    {Object.keys(scoreMap).map((key,index) =>
                                        <td key={index}>
                                          <span className={`radio ${scoreGroup[0] === key ? "yes" : "no"}`} 
                                                onClick={()=>{
                                                    scoreGroup[0] = key;
                                                    this.setState({});
                                                }}>{scoreMap[key]}</span>
                                        </td>
                                    )}
                                  </tr>
                                  <tr>
                                    <td>商业模式 (10分)</td>
                                    {Object.keys(scoreMap).map((key,index) =>
                                      <td key={index}>
                                          <span className={`radio ${scoreGroup[1] === key ? "yes" : "no"}`}
                                                onClick={()=>{
                                                  scoreGroup[1] = key;
                                                  this.setState({});
                                                }}>{scoreMap[key]}</span>
                                      </td>
                                    )}
                                  </tr>
                                  <tr>
                                    <td>产品创新性 (10分)</td>
                                    {Object.keys(scoreMap).map((key,index) =>
                                      <td key={index}>
                                          <span className={`radio ${scoreGroup[2] === key ? "yes" : "no"}`}
                                                onClick={()=>{
                                                  scoreGroup[2] = key;
                                                  this.setState({});
                                                }}>{scoreMap[key]}</span>
                                      </td>
                                    )}
                                  </tr>
                                  <tr>
                                    <td>白皮书可信性 (10分)</td>
                                    {Object.keys(scoreMap).map((key,index) =>
                                      <td key={index}>
                                          <span className={`radio ${scoreGroup[3] === key ? "yes" : "no"}`}
                                                onClick={()=>{
                                                  scoreGroup[3] = key;
                                                  this.setState({});
                                                }}>{scoreMap[key]}</span>
                                      </td>
                                    )}
                                  </tr>
                                  <tr>
                                    <td>风险承受能力 (10分)</td>
                                    {Object.keys(scoreMap).map((key,index) =>
                                      <td key={index}>
                                          <span className={`radio ${scoreGroup[4] === key ? "yes" : "no"}`}
                                                onClick={()=>{
                                                  scoreGroup[4] = key;
                                                  this.setState({});
                                                }}>{scoreMap[key]}</span>
                                      </td>
                                    )}
                                  </tr>
                                </tbody>
                            </table>
                            <div className="submit">
                                <button onClick={()=>this.submitScore()}>提交</button>
                            </div>
                        </div>}
                    {/*用户打分-已结束*/}
                    {project.type === 3 &&
                        <div className="para para5">
                          <h3>
                            <img src={this.imageDict.$_icon_project_yhdf}/>
                            <span>用户打分</span>
                          </h3>
                          <table className="tb2">
                            <tbody>
                              <tr>
                                <td>市场潜力 (10分)</td>
                                <td>评价分 {}分</td>
                              </tr>
                              <tr>
                                <td>商业模式 (10分)</td>
                                <td>评价分 {}分</td>
                              </tr>
                              <tr>
                                <td>产品创新性 (10分)</td>
                                <td>评价分 {}分</td>
                              </tr>
                              <tr>
                                <td>白皮书可信性 (10分)</td>
                                <td>评价分 {}分</td>
                              </tr>
                              <tr>
                                <td>风险承受能力 (10分)</td>
                                <td>评价分 {}分</td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="submit">
                            <img src={this.imageDict.$_icon_over}/>
                          </div>
                        </div>}

                    {/*团队介绍*/}
                    <div className="para para6">
                        <h3>
                            <img src={this.imageDict.$_icon_project_tdjs}/>
                            <span>团队介绍</span>
                        </h3>
                        <table>
                            <tbody>
                                {project.teams && project.teams.subArray(4).map((arr, index) =>
                                    <tr key={index}>
                                       {arr.map((item, index2)=>
                                          <td key={index2}>
                                              <a href={""} target="_blank"><img className="headimg" src={item.logo}/></a>
                                              <img className="linkedin" src={this.imageDict.$_icon_project_linkedIn}/>
                                              <b>{item.name}</b>
                                              <i>{item.position}</i>
                                          </td>)}
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>

                    {/*路线图*/}
                    <div className="para para7">
                        <h3>
                            <img src={this.imageDict.$_icon_project_lxt}/>
                            <span>路线图</span>
                        </h3>
                        <div className="route-line">
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

                {/*弹框*/}
                {showAlert &&
                    <Alert content={alertContent} onClose={()=>this.setState({showAlert: false})}/>}
            </div>)
    }
}