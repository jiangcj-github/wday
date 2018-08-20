import React, {Component} from 'react';
import ViewBase from "../../../components/ViewBase";
import {
    NavLink,
} from "react-router-dom";


export default class Collect extends ViewBase {
    constructor() {
        super();
        this.state = {

        };
    }

    componentDidMount() {

    }


    render() {
        let {history} = this.props;
        let {} = this.state;
        return (
            <div className="collect">
                <h3>我的收藏</h3>
                <div className="content">
                    {/*无结果*/}
                    <div className="no-result">还没有收藏过内容，快去收藏吧</div>
                </div>
            </div>
        )
    }
}