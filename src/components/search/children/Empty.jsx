import React, {Component} from 'react';
import ViewBase from "../../../components/ViewBase";

export default class Empty extends ViewBase {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="no-result">
                <img className="no-result-img" src={this.imageDict.$_no_result}/>
                <span>没有搜索到相关内容</span>
            </div>
        );
    }
}