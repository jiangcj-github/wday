import React, {Component} from 'react';
import ViewBase from "../../../components/ViewBase";
import {
    NavLink,
} from "react-router-dom";

export default class List extends ViewBase {
    constructor() {
        super();
        this.state = {

        };
    }

    componentDidMount() {


    }

    render() {
        return (
            <div className="project-list">
                <div className="head">
                    <ul>
                        <li>收藏</li>
                        <li></li>
                    </ul>
                    <ul>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>)
    }
}