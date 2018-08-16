import React, { Component } from "react";
import ViewBase from "../../../components/ViewBase";
/*
 *  content 文本内容
 */

export default class Alert extends ViewBase {
    constructor(props) {
        super(props);
        this.state = {
            timer: null,
        };
        this.onClose = this.props.onClose;
    }

    componentDidMount() {
        document.addEventListener("click", this.onClose);
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(this.onClose, 2000);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.onClose);
        this.timer && clearTimeout(this.timer);
    }

    render() {
        let {content} = this.props;
        return (
            <div className="alert-wrap">
                {/*提示框*/}
                <div className="alert">{content}</div>
            </div>
        );
    }
}
