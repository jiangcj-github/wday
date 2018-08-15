import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import "./stylus/home.styl"
import ViewBase from "../ViewBase";
import ArticleList from "../article/ArticleList";
import NewsList from "../news/NewsList";

export default class Home extends ViewBase {
    constructor(props) {
        super(props);
    }


    componentDidMount() {

    }

    render() {

        return (
            <div className="home-wrap">
                <div className="project-wrap">

                </div>
                <div className="article-wrap">
                  <ArticleList />
                </div>
                <div className="news-wrap">
                  <NewsList />
                </div>
            </div>
        );
    }
}
