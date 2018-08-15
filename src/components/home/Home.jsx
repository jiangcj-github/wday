import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import "./stylus/home.styl"
import ViewBase from "../ViewBase";

export default class Home extends ViewBase {
    constructor(props) {
        super(props);
    }


    componentDidMount() {

    }

    render() {

        return (
            <div className="home-wrap">
                <div className="project-wrap"></div>
                <div className="project-wrap"></div>
                <div className="project-wrap"></div>
            </div>
        );
    }
}
