import React, {Component} from 'react';

import exchangeViewBase from "../../ExchangeViewBase";
import Button from '../../../common/component/Button/index.jsx'
import Input from '../../../common/component/Input/index.jsx'
import "../stylus/changeVerifyPopup.styl"
// 2, 谷歌验证  1, 邮件  3, 短信  0,无      let verifyArr = [3, 1, 0, 2]
// const contentList = [
//   {title: '谷歌验证', inputP: '请输入谷歌验证码'},
//   {title: '邮件验证', inputP: '请输入邮件验证码'},
//   {title: '短信验证', inputP: '请输入短信验证码'}
// ]
const contentArr = [3, 1, 0, 2]
const typeArr = [2, 1, 3, 0]

export default class ChangeVerifyPopup extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      popupInput1: "",
      popupInput2: "",
      popupInput3: "",
      contentList: [
        {title: this.intl.get("user-googleVerify"), inputP: this.intl.get("user-inputVerifyGoogle")},
        {title: this.intl.get("user-verifyEmailTitle"), inputP: this.intl.get("user-inputVerifyEmail")},
        {title: this.intl.get("user-verifyPhoneTitle"), inputP: this.intl.get("user-inputVerifyPhone")}
      ]
    }
    this.changeInput1 = this.changeInput1.bind(this)
    this.changeInput2 = this.changeInput2.bind(this)
    this.changeInput3 = this.changeInput3.bind(this)
  }
  changeInput1(value) {
    this.setState({popupInput1: value});
    // console.log(1, value)
  }
  changeInput2(value) {
    this.setState({popupInput2: value});
    // console.log(2, value)
  }
  changeInput3(value) {
    this.setState({popupInput3: value});
    // console.log(3, value)
  }
  canClick() {
    if (this.props.isType === 1 && this.state.popupInput2 && this.state.popupInput3) return true // 邮箱
    if (this.props.isType === 2 && this.state.popupInput1 && this.state.popupInput2) return true // 谷歌
    if (this.props.isType === 3 && this.state.popupInput2 && this.state.popupInput3) return true // 短信
    return false
  }
  componentDidMount() {

  }

  componentWillMount() {

  }
  componentWillUpdate(props, state, next) {

  }
  componentWillUnmount() {
    this.props.destroy && this.props.destroy();
  }
  render() {
    // console.log(77999, this.props.isType)
    return (
      <div className="change-popup-wrap">
        <div className="change-info">
          <img src={this.$imagesMap.$guanbi_hei} alt="" className="close-popup" onClick={() => {this.props.onClose && this.props.onClose()}}/>
          <h1 className="pop-title">{this.props.isType !== 0 && this.state.contentList[contentArr[this.props.isType]].title}</h1>
          <div className="clearfix picture-div">
            <Input placeholder={this.intl.get("user-popPicturePlaceholder")}  value={this.state.popupInput2} onInput={value => this.changeInput2(value)}/>
            <p><img src={this.props.captcha || ''} alt="" className="picture-btn btn" onClick={this.props.getCaptcha}/></p>
          </div>
          <div className={`${this.props.isType === 2 ? 'hide' : ''} clearfix  verify-div`}>
            <Input placeholder={this.props.isType !== 0 && this.state.contentList[contentArr[this.props.isType]].inputP || ''} value={this.state.popupInput3} onInput={value => this.changeInput3(value)}/>
            <Button className="verify-btn"
                    title={typeof this.props.verifyNum === 'number' && (this.props.verifyNum === 0 && this.intl.get("sendAgain") || `${this.props.verifyNum}s`) || this.props.verifyNum}
                    onClick={()=>{this.props.getVerify(this.props.isType === 3 ? this.props.phone : (this.props.isType === 1 ? this.props.email : ''), this.props.isType === 3 ? 0 : (this.props.isType === 1 ? 1 : ''), 9)}}/>
          </div>
          <Input placeholder={this.intl.get("user-inputVerifyGoogle")} className={this.props.isType === 2 ? '' : 'hide'} value={this.state.popupInput1} onInput={value => this.changeInput1(value)}/>
          <Button className={`${this.canClick() ? 'can-click' : ''} set-btn`}
                  disable={this.canClick() ? false : true}
                  title={this.intl.get("sure")}
                  onClick={() => this.props.setTwoVerify(this.props.isType === 3 ? this.props.phone : (this.props.isType === 1 ? this.props.email : '') ,
                                                                this.props.isType === 3 ? 0 : this.props.isType,
                                                                this.props.isType === 2 ? this.state.popupInput1 : this.state.popupInput3,
                                                                this.state.popupInput2,
                                                                this.props.captchaId,
                                                                this.props.isTwoVerify + 1,
                                                                typeArr[this.props.sureTwoVerify])}/>
        </div>
      </div>
    );
  }
}
