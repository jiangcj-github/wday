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
import LoginController from "../../../class/login/LoginController"

export default class Login extends ViewBase {
    constructor(props) {
        super(props);
        this.state = {
            picture: "",        //图像验证码图片
            pid: 0,             //图片ID

            input1: "",               //手机号-输入
            input2: "",             //图像验证码-输入
            input3: "",             //短信验证码-输入
            sendCode: -1,           //发送验证码

            errTip1: "",            //手机号-错误提示
            errTip2: "",            //图像验证码-错误提示
            errTip3: "",            //短信验证码-错误提示
        };
    };

    async login(){
        let {phone, imgCode,phoneCode} = this.state;
        let {onHide} = this.props;

        let controller = LoginController();
        let res = await controller.login(phone,imgCode,phoneCode);
        console.log(res);
    }

    //更新图片验证码
    updateImageCode(){
        let controller = LoginController();
        controller.getImgCode().then(data=>{
            this.setState({
                picture: data.pic,
                pic: data.id
            });
        });
    }

    //发送验证码
    async sendPhoneCode(){
        let controller = LoginController();
        let {input1} = this.state;
        let data = await controller.getPhoneCode(input1);
        if(data.msg){
            this.setState({errTip1: data.msg});
        }else{
            controller.countDown("countDown", 60, count =>{
                this.setState({sendCode: count});
            });
        }
    }



    componentDidMount() {
        this.updateImageCode();
    }

    render() {
        let {onHide} = this.props;
        let {input1, errTip1, errTip2, errTip3, picture, sendCode} = this.state;

        return (
            <div className="login-wrap">
                {/*登录框*/}
                <div className="login">
                    {/*标题*/}
                    <img className="title" src={this.imageDict.$icon_logo}/>
                    {/*手机号*/}
                    <div className="group phone">
                        <input type="text" placeholder="手机号"
                               value={input1}
                               onInput={event=>this.setState({input1: event.target.value})}
                               onFocus={()=>this.setState({errTip1: ""})}/>
                        {errTip1 && <i className="err">请输入正确的手机号</i>}
                    </div>
                    {/*图像验证码*/}
                    <div className="group img-code">
                        <input type="text" placeholder="输入正确的图形验证码"/>
                        <img src={picture} onClick={this.updateImageCode.bind(this)}/>
                        {errTip2 && <i className="err">图像验证码错误</i>}
                    </div>
                    {/*短信验证码*/}
                    <div className="group phone-code">
                        <input type="text" placeholder="输入正确的短信验证码"/>
                        {sendCode<0 && <a onClick={this.sendPhoneCode.bind(this)}>获取短信验证码</a>}
                        {sendCode>0 && <a className="disable">{sendCode}s后重新发送</a>}
                        {sendCode===0 && <a onClick={this.sendPhoneCode.bind(this)}>重新获取验证码</a>}
                        {errTip3 && <i className="err">短信验证码错误</i>}
                    </div>
                    {/*提交按钮*/}
                    <a className="submit" onClick={this.login.bind(this)}>注册/登录</a>
                    {/*关闭按钮*/}
                    <a className="close" onClick={onHide}/>
                </div>
            </div>)
    }
}
