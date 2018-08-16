import React, { Component } from "react";
import ViewBase from "../../../components/ViewBase";
/*
 *  step [0-100]
 */

export default class Progress extends ViewBase {

    render() {
        let {step} = this.props;
        return (
            <div className="progress-wrap">
                {/*提示框*/}
                <div className="progress">
                    <div className="step" style={{width: `${step}%`}}/>
                </div>
                <div className="num">{step}%</div>
            </div>
        );
    }
}
