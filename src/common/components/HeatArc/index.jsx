import React, { Component } from "react";
import ViewBase from "../../../components/ViewBase";
/*
 *  step 当前百分比
 */

export default class Pagination extends ViewBase {
    constructor(props) {
        super(props);
        this.state = {
            timer: null,
        };
        this.onClose = this.props.onClose;
    }

    render() {
        let {content} = this.props;
        return (
            <div className="heat-arc-wrap">

            </div>
        );
    }
}
