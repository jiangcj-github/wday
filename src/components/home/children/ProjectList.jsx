import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ViewBase from "../../ViewBase";
import Progress from "../../../common/components/Progress"
import HomeController from "../../../class/home/HomeController"


export default class Home extends ViewBase {
    constructor(props) {
        super(props);
        this.state = {
            homeProjects: {}
        };
        this.controller = HomeController();
    }

    async componentDidMount() {
        //获取首页项目数据
        let data = await this.controller.getHomeProjects();
        if(!data.msg){
            this.setState({homeProjects: data});
        }
    }

    render() {
        let {history} = this.props;
        let {finishAll, finishList, runAll, runList, soonAll, soonList} = this.state.homeProjects;

        return (
            <div className="project-wrap">
                {/*进行中*/}
                <div className="project">
                    <h3 className="doing">进行中</h3>
                    {finishList && runList.map(({id, logo, name, fullName, badgeList, totalNum, totalUnit, actualNum, actualUnit, endTime, step},index)=>
                        <div className="pi" onClick={()=>history.push(`/project/detail?id=${id}`)} key={index}>
                            {/*项目图标，简称，详细名称*/}
                            <p className="name">
                                <img src={logo}/>
                                <b>{name}</b>
                                <span>{fullName}</span>
                            </p>
                            {/*项目标签*/}
                            <p className="badge">
                                {badgeList && badgeList.map((badge,index2)=> <i key={index2}>#{badge}#</i>)}
                            </p>
                            {/*项目进度*/}
                            <p className="step">
                                <span className="num doing">{actualUnit}{actualNum}/{totalUnit}{totalNum}</span>
                                <span className="percent doing">{step}%</span>
                                <span className="remain">剩余{new Date(endTime).remain()}</span>
                            </p>
                            <Progress step={step}/>
                            {/*分隔线*/}
                            <p className="br"/>
                        </div>)}
                    {/*查看全部*/}
                    <a className="more" onClick={()=>history.push("/project/list?tab=1")}>查看全部{runAll}个项目</a>
                </div>

                {/*即将开始*/}
                <div className="project">
                    <h3 className="prepare">即将开始</h3>
                    {soonList && soonList.map(({id, logo, name, fullName, badgeList, totalNum, totalUnit, actualNum, actualUnit, endTime, step},index)=>
                        <div className="pi" onClick={()=>history.push(`/project/detail?id=${id}`)} key={index}>
                            {/*项目图标，简称，详细名称*/}
                            <p className="name">
                                <img src={logo}/>
                                <b>{name}</b>
                                <span>{fullName}</span>
                            </p>
                            {/*项目标签*/}
                            <p className="badge">
                                {badgeList && badgeList.map((badge,index2)=> <i key={index2}>#{badge}#</i>)}
                            </p>
                            {/*项目进度*/}
                            <p className="step">
                                <span className="remain">目标：</span>
                                <span className="num prepare">{totalUnit}{totalNum}</span>
                                <span className="remain">倒计时{new Date(endTime).remain()}</span>
                            </p>
                            <Progress step={step}/>
                            {/*分隔线*/}
                            <p className="br"/>
                        </div>)}
                    {/*查看全部*/}
                    <a className="more" onClick={()=>history.push("/project/list?tab=2")}>查看全部{soonAll}个项目</a>
                </div>

                {/*已结束*/}
                <div className="project">
                    <h3 className="finish">已结束</h3>
                    {finishList && finishList.map(({id, logo, name, fullName, badgeList, totalNum, totalUnit, actualNum, actualUnit, endTime, step},index)=>
                        <div className="pi" onClick={()=>history.push(`/project/detail?id=${id}`)} key={index}>
                            {/*项目图标，简称，详细名称*/}
                            <p className="name">
                                <img src={logo}/>
                                <b>{name}</b>
                                <span>{fullName}</span>
                            </p>
                            {/*项目标签*/}
                            <p className="badge">
                                {badgeList && badgeList.map((badge,index2)=> <i key={index2}>#{badge}#</i>)}
                            </p>
                            {/*项目进度*/}
                            <p className="step">
                                <span className="num finish">{actualUnit}{actualNum}/{totalUnit}{totalNum}</span>
                                <span className="percent finish">{step}%</span>
                                <span className="remain">终:{new Date(endTime).end()}</span>
                            </p>
                            <Progress step={step}/>
                            {/*分隔线*/}
                            <p className="br"/>
                        </div>)}
                    {/*查看全部*/}
                    <a className="more" onClick={()=>history.push("/project/list?tab=3")}>查看全部{finishAll}个项目</a>
                </div>

            </div>
        );
    }
}
