import React, { Component } from "react";
import ViewBase from "../../../components/ViewBase";

/*
 *  step [0-100]
 */
export default class Progress extends ViewBase {

    render() {
        let {step} = this.props || 0;
        return (
            <div className="progress-wrap">
                <div className="progress-step" style={{width: `${step}%`}}/>
            </div>
        );
    }
}
