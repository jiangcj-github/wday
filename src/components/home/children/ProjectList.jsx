import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ViewBase from "../../ViewBase";
import Progress from "../../../common/components/Progress"
import ProjectController from "../../../class/project/ProjectController"


export default class Home extends ViewBase {
    constructor(props) {
        super(props);
        this.state = {
            projects: {finishActivity: {}, runActivity: {}, soonActivity: {}},
        };
        this.controller = ProjectController();
    }

    componentDidMount() {
        this.controller.getActivityHome().then(data=>{
            if(data.msg) return;
            this.setState({projects: data});
        });
    }

    render() {
        let {history} = this.props;
        let {projects} = this.state;

        let {finishActivity, runActivity, soonActivity} = projects;
        //进行中
        let runAll = runActivity.all || 40;
        let runList = runActivity.list || [1,2,3,4];
        //已完成
        let finishAll = finishActivity.all || 30;
        let finishList = finishActivity.list || [1,2,3];
        //即将进行
        let soonAll = soonActivity.all || 20;
        let soonList = soonActivity.list || [1,2];

        return (
            <div className="project-wrap">

                {/*进行中*/}
                <div className="project">
                    <h3 className="doing">进行中</h3>
                    {runList.map(({id, logo, name, cw, pro,},index)=>
                        <div className="pi" onClick={()=>history.push(`/project/detail?id=${id}`)} key={index}>
                            {/*项目图标，简称，详细名称*/}
                            <p className="name">
                                <img src="/static/web/icon_coin_five@3x.png"/>
                                <b>ISU</b>
                                <span>Action H…</span>
                            </p>
                            {/*项目标签*/}
                            <p className="badge">
                                <i>#智能合约#</i>
                                <i>#内容版权#</i>
                            </p>
                            {/*项目进度*/}
                            <p className="step">
                                <span className="num doing">$500万/$1000万</span>
                                <span className="percent doing">65%</span>
                                <span className="remain">剩余9天</span>
                            </p>
                            <Progress step={60}/>
                            {/*分隔线*/}
                            <p className="br"/>
                        </div>)}
                    {/*查看全部*/}
                    <a className="more" onClick={()=>history.push("/project/list")}>查看全部{runAll}个项目</a>
                </div>

                {/*即将开始*/}
                <div className="project">
                    <h3 className="prepare">即将开始</h3>
                    {soonList.map(({id,},index)=>
                        <div className="pi" onClick={()=>history.push(`/project/detail?id=${id}`)} key={index}>
                            {/*项目图标，简称，详细名称*/}
                            <p className="name">
                                <img src="/static/web/icon_coin_five@3x.png"/>
                                <b>ISU</b>
                                <span>Action H…</span>
                            </p>
                            {/*项目标签*/}
                            <p className="badge">
                                <i>#智能合约#</i>
                                <i>#内容版权#</i>
                            </p>
                            {/*项目进度*/}
                            <p className="step">
                                <span className="remain">目标：</span>
                                <span className="num prepare">$500万/$1000万</span>
                                <span className="remain">倒计时12h</span>
                            </p>
                            <Progress step={60}/>
                            {/*分隔线*/}
                            <p className="br"/>
                        </div>)}
                    {/*查看全部*/}
                    <a className="more" onClick={()=>history.push("/project/list")}>查看全部{soonAll}个项目</a>
                </div>

                {/*已结束*/}
                <div className="project">
                    <h3 className="finish">已结束</h3>
                    {finishList.map(({id},index)=>
                        <div className="pi" onClick={()=>history.push(`/project/detail?id=${id}`)} key={index}>
                            {/*项目图标，简称，详细名称*/}
                            <p className="name">
                                <img src="/static/web/icon_coin_five@3x.png"/>
                                <b>ISU</b>
                                <span>Action H…</span>
                            </p>
                            {/*项目标签*/}
                            <p className="badge">
                                <i>#智能合约#</i>
                                <i>#内容版权#</i>
                            </p>
                            {/*项目进度*/}
                            <p className="step">
                                <span className="num finish">$500万/$1000万</span>
                                <span className="percent finish">65%</span>
                                <span className="remain">终:06-25</span>
                            </p>
                            <Progress step={60}/>
                            {/*分隔线*/}
                            <p className="br"/>
                        </div>)}
                    {/*查看全部*/}
                    <a className="more" onClick={()=>history.push("/project/list")}>查看全部{finishAll}个项目</a>
                </div>

            </div>
        );
    }
}
