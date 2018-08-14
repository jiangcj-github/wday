import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    Redirect,
    Switch
} from 'react-router-dom'
import ViewBase from "../../ViewBase";

export default class Login extends ViewBase {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            imgCode: "",
            phoneCode: "",
            sendCode: "",           //发送验证码

            errPhone: "",
            errImgCode: "",
            errPhoneCode: "",
        };
    }

    render() {
        let {onHide} = this.props;
        let {
            errPhone,
            errImgCode,
            errPhoneCode } = this.state;

        return (
            <div className="login-wrap">
                {/*登录框*/}
                <div className="login">
                    {/*标题*/}
                    <h3>每日必读</h3>
                    {/*手机号*/}
                    <div className="group phone">
                        <input type="text" placeholder="手机号"/>
                        {errPhone && <i className="err">请输入正确的手机号</i>}
                    </div>
                    {/*图像验证码*/}
                    <div className="group img-code">
                        <input type="text" placeholder="输入正确的图形验证码"/>
                        <img src="/static/web/imgCode.png"/>
                        {errImgCode && <i className="err">图像验证码错误</i>}
                    </div>
                    {/*短信验证码*/}
                    <div className="group phone-code">
                        <input type="text" placeholder="输入正确的短信验证码"/>
                        <a className="disable">获取短信验证码</a>
                        {errPhoneCode && <i className="err">短信验证码错误</i>}
                    </div>
                    {/*提交按钮*/}
                    <a className="submit" onClick={onHide}>注册/登录</a>
                    {/*关闭按钮*/}
                    <a className="close" onClick={onHide}/>
                </div>
            </div>)
    }
}
