import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import "./stylus/home.styl"
import ViewBase from "../ViewBase";
import ProjectList from "./children/ProjectList";
import ArticleList from "../article/children/ArticleList";
import NewsListComponent from "./children/NewsListComponent";

export default class Home extends ViewBase {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //设置导航栏菜单
        this.bus.emit("selectItem","home");

    }

    render() {
        let {history} = this.props;
        return (
            <div className="home-wrap">
                <div className="home">
                    {/*项目列表*/}
                    <ProjectList history={history}/>
                    {/*文章列表*/}
                    <div className="article-wrap">
                        <ArticleList history={history} />
                    </div>
                    {/*快讯列表*/}
                    <div className="news-wrap">
                        <NewsListComponent scrollType="home" history={history}/>
                    </div>
                </div>
            </div>
        );
    }
}
