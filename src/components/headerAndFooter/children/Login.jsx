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
import Alert from "../../../common/components/Alert"

export default class Login extends ViewBase {
    constructor(props) {
        super(props);
        this.state = {
            picture: "",        //图像验证码图片
            pid: 0,             //图片ID

            phoneInput: "",               //手机号-输入
            icInput: "",             //图形验证码-输入
            pcInput: "",             //短信验证码-输入
            sendCode: -1,           //发送验证码

            errTip: "",            //错误类型  phone -手机号,ic -图形验证码, pc -手机验证码, other -其他
            errMsg: "",            //错误提示
        };
        this.controller = LoginController();
    };

    async login(){
        let {phoneInput, icInput, pcInput, pid} = this.state;
        let data = await this.controller.login(phoneInput,icInput,pcInput,pid);
        if(data.msg){
            this.updateImageCode();
            this.setState({errMsg: data.msg, errTip: data.tip});
            return;
        }
        location.reload();
    }

    //更新图片验证码
    async updateImageCode(){
        let data = await this.controller.getImgCode();
        if(!data.msg){
            console.log(data);
            this.setState({picture: data.pcode, pid: data.pid});
        }
    }

    //发送验证码
    async sendPhoneCode(){
        let {phoneInput} = this.state;
        let data = await this.controller.getPhoneCode(phoneInput);
        if(data.msg){
            this.setState({errMsg: data.msg, errTip: data.tip});
            return;
        }
        this.countDown("countDown", 60, count =>{
            this.setState({sendCode: count});
        });
    }

    componentDidMount() {
        this.updateImageCode();
    }

    componentWillUnmount() {
        this.endLoop("countDown");
    }

    render() {
        let {onHide} = this.props;
        let {phoneInput, icInput, pcInput, errTip, errMsg, picture, sendCode} = this.state;

        return (
            <div className="login-wrap">

                {/*登录框*/}
                <div className="login">
                    {/*标题*/}
                    <img className="title" src={this.imageDict.$icon_logo}/>

                    {/*手机号*/}
                    <div className="group phone">
                        <input type="text" placeholder="手机号"
                               value={phoneInput}
                               onInput={event=>
                                   this.setState({phoneInput: event.target.value})
                               }
                               onFocus={()=>
                                   errTip === "phone" && this.setState({errTip: ""})
                               }/>
                        {errTip === "phone" && <i className="err">{errMsg}</i>}
                    </div>

                    {/*图像验证码*/}
                    <div className="group img-code">
                        <input type="text" placeholder="输入正确的图形验证码"
                               value={icInput}
                               onInput={event =>
                                   this.setState({icInput: event.target.value})
                               }
                               onFocus={()=>
                                   errTip === "ic" && this.setState({errTip: ""})
                               }/>
                        <img src={picture} onClick={this.updateImageCode.bind(this)}/>
                        {errTip === "ic" && <i className="err">{errMsg}</i>}
                    </div>

                    {/*短信验证码*/}
                    <div className="group phone-code">
                        <input type="text" placeholder="输入正确的短信验证码"
                               value={pcInput}
                               onInput={event =>
                                   this.setState({pcInput: event.target.value})
                               }
                               onFocus={()=>
                                   errTip === "pc" && this.setState({errTip: ""})
                               }/>
                        {sendCode<0 && <a onClick={this.sendPhoneCode.bind(this)}>获取短信验证码</a>}
                        {sendCode>0 && <a className="disable">{sendCode}s后重新发送</a>}
                        {sendCode===0 && <a onClick={this.sendPhoneCode.bind(this)}>重新获取验证码</a>}
                        {errTip === "pc" && <i className="err">{errMsg}</i>}
                    </div>

                    {/*提交按钮*/}
                    <a className="submit" onClick={this.login.bind(this)}>注册/登录</a>

                    {/*关闭按钮*/}
                    <a className="close" onClick={onHide}/>
                </div>

                {/*提示框*/}
                {errTip === "other" && <Alert content={errMsg} onClose={()=> this.setState({errTip: ""})}/>}
            </div>)
    }
}
