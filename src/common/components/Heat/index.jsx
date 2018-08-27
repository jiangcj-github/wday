import React, { Component } from "react";
import ViewBase from "../../../components/ViewBase";
/*
 *  step 当前热度百分比
 */

export default class Heat extends ViewBase {

    render() {
        let {width, height, step} = this.props;
        let fillHeight = height * step / 100;
        return (
            <div className="heat-wrap" style={{width: width, height: height}}>
                <div className="rect" style={{borderRadius: width/6}}>
                    <div className="fill" style={{height: fillHeight, marginTop: height-fillHeight}}/>
                </div>
                <div className="circle">
                    <div className="fill" style={{height: fillHeight,marginTop: -fillHeight}}/>
                </div>
                <div className="scale" style={{height: (height-width)*0.8}}/>
            </div>
        );
    }
}
