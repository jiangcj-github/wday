import ExchangeControllerBase from '../ExchangeControllerBase'
import UserStore from './UserStore'
import Browser from "../lib/Browser";
import DetectOS from "../lib/Os";

export default class UserController extends ExchangeControllerBase {
  constructor(props) {
    super(props)
    this.store = new UserStore()
    this.store.setController(this)
  }

  // setView(view){
  //   super.setView(view);
  //   // view.setState({count: this.store.count})
  //   // return this.store.data
  // }
  get configData() {
    return this.configController.initState;
  }

  //清除用户信息
  clearUserInfo(){
    this.store.clearUserInfo()
  }


  async getVerify(account, mode, type, os=3) { // 获取短信验证码
    if (this.view.state.verifyNum !== this.view.intl.get("sendCode") && this.view.state.verifyNum !== 0) return
    this.view.setState({verifyNum: 60})
    this.countDown('verifyCountDown', 'verifyNum', this.view)
    this.getCode(account, mode, type, os)
  }

  clearVerify() { // 清除短信验证码
    this.countDownStop('verifyCountDown')
    this.view.setState({verifyNum: this.view.intl.get("sendCode")})
  }
  // 从登录接口获取信息
  getUserId(data) {
    // console.log('ccc3', data)
    this.store.userLogin(data)
    // console.log('this.view',this.view)
    // this.view.history.goBack()
  }

  // 接口调用部分
  async initData() { // 获取用户信息
    let userInfo = await this.store.userInfo();
    // let obj = this.checkNum(userInfo.credits)
    this.view && this.view.setState({ userInfo });
    return userInfo;
  }

  async getUserAuthData() { // 获取用户认证信息
    let userAuth = await this.store.userAuth();
    // console.log('获取用户认证信息', userAuth)
    this.view.setState({userAuth})
    return userAuth;
  }

  async getCurrentLogin() { // 获取当前登录设备
    let currentLogin = await this.store.currentLogin();
    this.view.setState({currentLogin})
  }

  async getLoginList() { // 获取登录记录
    let loginList = await this.store.loginList();
    this.view.setState({loginList})
  }

  async getIpList() { // 获取ip白名单
    let ipList = await this.store.ipList();
    // console.log('ip白名单', ipList)
    this.view.setState({ipList})
  }

  async getUserCreditsNum() { // 获取用户积分信息
    let userCreditsNum = await this.store.userCreditsNum();
    this.view.setState({userCreditsNum})
  }

  async getUserCredits(page) { // 获取用户积分信息列表
    let userCredits = await this.store.userCredits(page);
    this.view.setState({userCredits})
  }

  async getGoogle() { // 获取谷歌密钥
     let googleSecret = await this.store.googleSecret();
     this.view.setState({googleSecret})
  }

  async uploadImg(file) { // 上传图片
    // console.log('上传图片', file)
    let imgUrl = `image${this.view.state.imgUrlIndex + 1}`
    let res = await this.store.uploadImg(file),
        result = await res.text()
    let obj={}
    obj[imgUrl] = result
    // console.log('上传图片2', result, obj)
    this.view.setState(obj)
  }

  async uploadInfo() { // 身份认证确认提交
    let typeIndexArr = [1, 3], userAuth = this.view.state.userAuth, succObj = {}
    let result = await this.store.Proxy.uploadUserAuth({
      "token": this.store.token,
      "fn": userAuth.number ? userAuth.firstName : this.view.state.firstNameValue, // 姓氏
      "ln": userAuth.number ? userAuth.lastName : this.view.state.lastNameValue, // 名字
      "na": userAuth.number ? `${userAuth.firstName}${userAuth.lastName}` : `${this.view.state.firstNameValue}${this.view.state.lastNameValue}`, // 名字
      "ty": userAuth.number ? userAuth.type : typeIndexArr[this.view.state.selectIndex],  // 0：无 1：身份证 2：军官证 3：护照
      "nu": userAuth.number ? userAuth.number : this.view.state.numberValue, // 证件号
      "im1": this.view.state.image1 || userAuth.image1, // 正面照
      "im2": this.view.state.image2 || userAuth.image2, // 背面照
      "im3": this.view.state.image3 || userAuth.image3  // 手持照
    })
    // console.log('上传信息', result)
    succObj = {
      state: 1,
      firstName: userAuth.number ? userAuth.firstName : this.view.state.firstNameValue,
      lastName: userAuth.number ? userAuth.lastName : this.view.state.lastNameValue,
      number: userAuth.number ? userAuth.number : this.view.state.numberValue
    }
    if (result === null) {
      userAuth = Object.assign(userAuth, succObj)
    }

    this.view.setState({
      remindPopup: true,
      // popType: result && result.ret === 101 ? 'tip1': 'tip3',
      // popMsg: result && result.ret === 101 ? this.view.intl.get("user-photoSucc") : result.msg // 上传成功
      popType: result ? 'tip3' : 'tip1',
      popMsg: result ? result.msg : this.view.intl.get("user-photoSucc"), // 上传成功
      userAuth,
      checkVerifyArr: result ? true : false
    })
    // result.ret === 101 && this.view.setState({userAuth: Object.assign(this.view.state.userAuth, succObj), checkVerifyArr: false})
  }
  async bindUserH5(account, mode, code) {
    // let {history} = this.view.props;
    let result = await this.store.Proxy.bindUser({
      token: this.store.token,
      ac: account,// 手机号或邮箱
      mo: mode,// 0:phone 1:email
      co: code,
      cid: '', // 图形验证码id，没有就传空
      cco: '', // 图形验证码，没有就传空
      os: 4, // 1:android 2:iOS 3:borwser 4 H5
    })
    if (result === null){
      this.view.setState({
        popupFlag: true,
        popupType: true,
        popupText: this.view.intl.get('user-bindSucc'),
      })
    }
    if(result && result.errCode){
      this.view.setState({
        popupFlag: true,
        popupType: false,
        popupText: result.msg,
      })
    }
  }
  async bindUser(account, mode, code, captchaId, captchaCode) { // 绑定邮箱／手机号
    // console.log(111, this.view.state.noticeIndex)
    if(!this.view.state.setPassFlag)
      return
    this.view.setState({
      setPassFlag: false
    })
    let noticeArr = [1, 0], noticeList = this.view.state.noticeList, verifyList = this.view.state.verifyList
    let result = await this.store.Proxy.bindUser({
      token: this.store.token,
      ac: account,// 手机号或邮箱
      mo: mode,// 0:phone 1:email
      co: code,
      cid: captchaId, // 图形验证码id，没有就传空
      cco: captchaCode, // 图形验证码，没有就传空
      os: 3, // 1:android 2:iOS 3:borwser
    })
    this.view.setState({
      remindPopup: [1, 2].includes(this.view.state.bindOrigin) ? (result && true) : true,
      popType: [1, 2].includes(this.view.state.bindOrigin) ? (result && 'tip3') : (result ? 'tip3': 'tip1'),
      popMsg: [1, 2].includes(this.view.state.bindOrigin) ? (result && result.msg) : (result ? result.msg : this.view.intl.get("user-bindSucc")),
      showSet: result ? true : false,
      setPassFlag: true
    })

    if (result === null && mode === 0) { // 绑定手机成功
      noticeList[noticeArr[mode]].name = this.view.intl.get("user-noticePhone")
      verifyList.forEach(v => { v.contentList[2].name = this.view.intl.get("user-noticePhone") })
      this.view.setState({
        userInfo: Object.assign(this.view.state.userInfo, {phone: account}),
        noticeList,
        verifyList
      })
      // console.log('绑定成功', this.view.state)
      this.getCaptchaVerify()
      this.getUserCreditsNum()
      if (this.view.state.bindOrigin === 1) {
        this.view.selectType(this.view.state.sureTwoVerify, this.view.state.isTwoVerify, this.view.state.type)
      }
      if (this.view.state.bindOrigin === 2) {
        this.view.setUserNotify(noticeArr[this.view.state.noticeIndex])
      }
      return
    }

    if (result === null && mode === 1) { // 绑定邮箱成功
      noticeList[noticeArr[mode]].name = this.view.intl.get("user-noticeEmail")
      verifyList.forEach(v => { v.contentList[1].name = this.view.intl.get("user-noticeEmail") })
      this.view.setState({
        userInfo: Object.assign(this.view.state.userInfo, {email: account}),
        noticeList,
        verifyList
      })
      this.getCaptchaVerify()
      this.getUserCreditsNum()
      if (this.view.state.bindOrigin === 1) {
        this.view.selectType(this.view.state.sureTwoVerify, this.view.state.isTwoVerify, this.view.state.type)
      }
      if (this.view.state.bindOrigin === 2) {
        this.view.setUserNotify(noticeArr[this.view.state.noticeIndex])
      }
      // console.log('绑定成功', this.view.state)
    }

    if (result !== null) {
      this.getCaptchaVerify()
    }
    // console.log('绑定手机号／邮箱', result)
  }

  async setLoginPass(oldPwd, newPwd, type) { // 设置／修改登录密码
    if(!this.view.state.setPassFlag)
      return
    this.view.setState({
      setPassFlag: false
    })
    let result = await this.store.Proxy.getLoginPwd({
      token: this.store.token,
      opd: this.RSAencrypt(oldPwd),
      npd: this.RSAencrypt(newPwd),
      ty: type,// 0:设置密码 （不用传old_pass） 1:修改密码
    })
    this.view.setState({
      remindPopup: true,
      popType: result ? 'tip3': 'tip1',
      popMsg: result ? result.msg : this.view.intl.get("user-setSucc"),
      showSet: result ? true : false,
      setPassFlag: true
    })
    if (result === null) {
      this.view.setState({userInfo: Object.assign(this.view.state.userInfo, {loginPwd: 0})});
      this.store.state.userInfo.loginPwd = 0
      // 修改密码成功跳转至...
      this.view.state.to && this.view.history.push(this.view.state.to);
    }
    // console.log('设置密码', result)
  }

  async modifyFundPwd(account, mode, opType, newPass, captchaCode, captchaId, code) { // 设置／修改资金密码
    if(!this.view.state.setPassFlag)
      return
    this.view.setState({
      setPassFlag: false
    })
    let result = await this.store.Proxy.modifyFundPwd({
      token: this.store.token,
      ac: account,
      mo: mode, // 0:phone 1:email 2:google
      oty: opType, // 0:设置资金密码 1:修改资金密码
      np: this.RSAencrypt(newPass),
      cc: captchaCode, // 图形验证码，没有就传空
      ci: captchaId, // 图形验证码id，没有就传空
      co: code,
      os: 3, // 1:android 2:iOS 3:browser
    })
    // console.log('设置密码', result)
    this.view.setState({
      remindPopup: true,
      popType: result ? 'tip3': 'tip1',
      popMsg: result ? result.msg : this.view.intl.get("user-setSucc"),
      showSet: result ? true : false,
      setPassFlag: true
    })
    if (result === null && opType === 0) {
      this.view.setState({userInfo: Object.assign(this.view.state.userInfo, {fundPwd: 0})})
      this.store.state.userInfo.fundPwd = 0
      this.getCaptchaVerify()
    }
    if (result === null && opType === 1) {
      this.getCaptchaVerify()
    }
    if (result !== null) {
      this.getCaptchaVerify()
    }
    if(result===null){
      //修改成功跳转至...
      this.view.state.to && this.view.history.push(this.view.state.to);
    }
  }

  async setTwoVerifyH5(account, mode, code, position, verifyType) { // 修改两步认证
    let twoVerifyArr = ['loginVerify', 'withdrawVerify', 'fundPassVerify'], changeVerifyArr = [3, 1, 0, 2];
    let twoVerifyState = twoVerifyArr[position-1]
    let twoVerifyUser = {}
    twoVerifyUser[twoVerifyState] = verifyType;
    let result = await this.store.Proxy.setTwoVerify({
      token: this.store.token,
      ac: account,
      mo: mode, //0手机 1邮箱 2Google
      co: code, //验证码
      os: 4, // 1:android 2:iOS 3:borwser
      pc: '',//图形验证码
      pi: '',//验证码图片的id
      po: position,//修改的位置 1登陆   2提现   3资金密码
      vty: verifyType//2谷歌验证 1邮件  3短信  0无
    })
    if (result === null){
      let userInfo = Object.assign(this.view.state.userInfo, twoVerifyUser)
      this.view.setState({
        popupFlag: true,
        popupType: true,
        popupText: this.view.intl.get("user-modifiedSucc"),
        userInfo: userInfo
      })
    }
    if(result && result.errCode){
      this.view.setState({
        popupFlag: true,
        popupType: false,
        popupText: result.msg,
      })
    }
  }

  async setTwoVerify(account, mode, code, picCode, picId, position, verifyType) { // 修改两步认证
    if(!this.view.state.verifyFlag)
      return
    this.view.setState({
      verifyFlag: false
    })
    let twoVerifyArr = ['loginVerify', 'withdrawVerify', 'fundPassVerify'], changeVerifyArr = [3, 1, 0, 2];
    let twoVerifyState = twoVerifyArr[position-1]
    let twoVerifyUser = {}
    twoVerifyUser[twoVerifyState] = verifyType
    let userInfo = this.view.state.userInfo
    let verifyList = this.view.state.verifyList
    let result = await this.store.Proxy.setTwoVerify({
      token: this.store.token,
      ac: account,
      mo: mode, //0手机 1邮箱 2Google
      co: code, //验证码
      os: 3, // 1:android 2:iOS 3:borwser
      pc: picCode,//图形验证码
      pi: picId,//验证码图片的id
      po: position,//修改的位置 1登陆   2提现   3资金密码
      vty: verifyType//2谷歌验证 1邮件  3短信  0无
    })
    this.view.setState({
      verifyFlag:true
    })
    if (result === null) {
      verifyList[position-1].contentList.forEach(v=>v.flag=false)
      verifyList[position-1].contentList[changeVerifyArr[verifyType]].flag = true
      userInfo = Object.assign(this.view.state.userInfo, twoVerifyUser)
      this.getCaptchaVerify()
    } else {
      this.getCaptchaVerify()
    }
    // if (mode || account){
    this.view.setState({
      remindPopup: true,
      popType: result ? 'tip3': 'tip1',
      popMsg: result ? result.msg : this.view.intl.get("user-modifiedSucc"),
      userInfo,
      showChange: result ? true : false,
      verifyList
    })
    // }
    // console.log('修改两步认证', result)
  }

  async addIp(ipAdd) { // 添加ip白名单
    let ipList = this.view.state.ipList, time = new Date().getTime() / 1000
    if (this.view.state.ipValue === '') return
    let result = await this.store.Proxy.addIp({
      token: this.store.token,
      ipd: ipAdd
    })
    // console.log('添加ip白名单', result)
    if (result && result.ipd) {
      ipList.push({IPAddress: ipAdd, createAt: time, IPId: result.ipd})
    }
    this.view.setState({
      remindPopup: true,
      popType: result && result.ipd ? 'tip1' : 'tip3',
      popMsg: result && result.ipd ? this.view.intl.get("user-addSucc") : result.msg,
      ipList
    })
  }

  async delIp(ipId, iPAdd, index) { // 删除ip白名单
    let ipList = this.view.state.ipList
    let result = await this.store.Proxy.deletIp({
      token: this.store.token,
      id: ipId,
      add: iPAdd
    })
    if (result === null) {
      ipList.splice(index, 1)
    }
    this.view.setState({
      remindPopup: true,
      popType: result ? 'tip3': 'tip1',
      popMsg: result ? result.msg : this.view.intl.get("user-delSucc"),
      ipList
    })
  }

  async getCaptchaVerify() { // 获取图形验证码
    let captcha = await this.getCaptcha()
    // console.log('获取图形验证码', captcha)
    this.view.setState({captcha: captcha.data, captchaId: captcha.id})
  }
  async setGoogleVerifyH5(code) {
    console.log(code)
    let result = await this.store.Proxy.setGoogleVerify({
      token: this.store.token,
      co: code
    })
    console.log(result)
    if (result === null){
      this.view.setState({
        popupFlag: true,
        popupType: true,
        popupText: this.view.intl.get('user-bindSucc'),
      })
    }
    if(result && result.errCode){
      this.view.setState({
        popupFlag: true,
        popupType: false,
        popupText: result.msg,
      })
    }
  }
  async setGoogleVerify(code) { // 验证谷歌验证码
    let result = await this.store.Proxy.setGoogleVerify({
      token: this.store.token,
      co: code
    })
    this.view.setState({
      remindPopup: result && true,
      popType: result && 'tip3',
      popMsg: result && result.msg,
      showGoogle: result ? true : false,
      userInfo: result ? Object.assign(this.view.state.userInfo, {googleAuth: 1}) : Object.assign(this.view.state.userInfo, {googleAuth: 0})
    })
    if (result === null) {
      this.getUserCreditsNum()
      this.view.selectType(this.view.state.sureTwoVerify, this.view.state.isTwoVerify, this.view.state.type)
    }
    // if (result === null) {this.view.setState({showGoogle: false})}
    // console.log('验证谷歌', result)
  }

  async setUserNotify(index) { // 修改通知方式
    // console.log(124, this.view.state.userInfo.notifyMethod, index)
    let userInfo = this.view.state.userInfo, noticeArr = [1, 0]
    this.view.setState({
      type: index + 1,
      bindOrigin: 2
    })
    if (noticeArr[index] === userInfo.notifyMethod) return // 点击以选中不发请求
    userInfo.notifyMethod === 0 && this.view.setState({ // 默认手机
      noticeIndex: !userInfo.email && index === 0 ? 1 : index,
      showSet: !userInfo.email && index === 0 ? true : false
    })
    userInfo.notifyMethod === 1 &&  this.view.setState({ // 默认邮箱
      noticeIndex: !userInfo.phone && index === 1 ? 0 : index,
      showSet: !userInfo.phone && index === 1 ? true : false
    })
    if (userInfo.email && index === 0 || userInfo.phone && index === 1) { // 通知方式修改
      let result = await this.store.Proxy.setUserNotify({
        token: this.store.token,
        ty: index === 0 ? 1 : 0 // 0:phone 1:email
      })
      this.view.setState({
        remindPopup: true,
        popType: result ? 'tip3': 'tip1',
        popMsg: result ? result.msg : this.view.intl.get("user-modifiedSucc"),
        userInfo: result ? userInfo : Object.assign(userInfo, {notifyMethod: index === 0 ? 1 : 0})
      })
      // console.log('改变通知', result, index)
    }
  }

  async outOther(flag1, flag2) { // 退出其他设备
    let result = await this.store.Proxy.outOther({
      token: this.store.token,
      im: `${flag1}/${flag2}`
    })
    this.view.setState({
      remindPopup: true,
      popType: result && result.errCode ? 'tip3': 'tip1',
      popMsg: result && result.errCode ? result.msg : this.view.intl.get("user-outSucc"),
    })
    // console.log('退出其他设备', result)
  }

  async getIPAddr() { // 获取当前IP
    let result = await this.store.Proxy.getIPAddr()
    // console.log('获取ip', result, this.view)
    this.view.setState({
      ipAddr: result.ip,
      showIp: true
    })
  }

  clearUserCreditsNum() { // 清除store里的用户积分
    this.store.state.userCreditsNum = 0
  }

  // 移动端用
  async setFundPwdSpace(type, pwd) { // 设置资金密码间隔
    let result = await this.setFundPwdInterval(type, pwd)
    this.view.setState({
      remindPopup: true,
      popType: result && result.errCode ? 'tip3': 'tip1',
      popMsg: result && result.errCode ? result.msg : this.view.intl.get("user-setSucc"),
      verifyFund: result && result.errCode ? true : false,
      fundPassType0: result && result.errCode ? this.view.state.fundPassType0 : this.view.state.fundPassType,
    })
    // console.log('设置资金密码间隔', result)
  }


  // 为其他模块提供接口
  // 密码间隔  设置间隔  两步验证  设置用户初始信息  userId  是否设置资金密码
  get userVerify() { // 提供两步认证信息, 是否设置资金密码
    let {  //0: 已设置资金密码 1: 未设置资金密码; d
      fundPassVerify, loginVerify, withdrawVerify, fundPwd
    } = this.store.state.userInfo
    // console.log(this.store.state)
    return {fundPassVerify, loginVerify, withdrawVerify, fundPwd}
  }

  get userInfo() { // 提供用户手机号或者邮箱
    // console.log('userInfo', this.store.state.userInfo)
    let {
      email, phone
    } = this.store.state.userInfo
    return { email, phone }
  }

  async getUserInfo() { // 请求用户信息
    if (!Object.keys(this.store.state.userInfo).length){
       await this.initData()
    }
    return this.store.state.userInfo;
  }

  get userAuthVerify() { // 提供用户是否实名
    let {  // 0未认证;1审核中;2已审核;3未通过;4恶意上传失败封锁3天;5永久禁止
      state
    } = this.store.state.userAuth
    return {state}
  }

  async getUserAuthVerify() { // 请求用户认证信息
    if (!Object.keys(this.store.state.userAuth).length){
      await this.getUserAuthData()
    }
    return this.store.state.userAuth;
  }

  get userToken() { // 提供用户token
    // this.Storage.userToken.set(this.store.state.token)
    // let storage = this.Storage.userToken.get().length === 0 ? '' : this.Storage.userToken.get()
    // let userToken = storage ? this.Storage.userToken.get() : this.store.state.token
    // return userToken
    return this.store.token
  }

  get userId() { // 提供用户id
    return this.store.uid
  }

  get userName() { // 提供用户姓名
    // this.Storage.userName.set(this.store.state.userName)
    // let storage = this.Storage.userName.get().length === 0 ? '' : this.Storage.userName.get()
    // let userName = storage ? storage : this.store.state.userName
    return this.store.name
  }

  async setFundPwdInterval(type, pwd) { // 设置资金密码输入间隔
    let result = await this.store.Proxy.setFundPwdSuspend({
      "token": this.store.token,
      "int": type, // 0:每次都需要密码 1:2小时内不需要 2:每次都不需要
      "fpd": this.RSAencrypt(pwd),
    })
    return result
  }

  async getFundPwdInterval() { // 查看资金密码输入间隔
    let result = await this.store.Proxy.getFundPwdSuspend({
      "token": this.store.token,
    })
    let resultObj = {
      mode: result.mo
    }
    // console.log('查看资金密码', result)
    return resultObj
  }

  async getCode(account, mode, type, os=3) { // 获取短信验证码
    let result = await this.store.Proxy.getVerifyCode({
      "ac": account, // 手机号或者邮箱
      "mo": mode,//0 phone 1 email
      "ty": type,//0 登录; 1 修改密码; 2 支付; 3 绑定手机／邮箱; 5 设置资金密码 6 修改资金密码 7登陆第二次验证 8提币 9二次验证
      "os": os// 1 android 2 iOS 3 browser 4 h5
    })
    // console.log('发送验证码', result, account, mode, type )
    return result
  }

  async getCaptcha() { // 获取图形验证码
    let result = await this.store.Proxy.getCaptcha()
    let resultObj = {
      id: result.id,
      data: result.d
    }
    return resultObj
  }

  //h5新增活动图片
  async getQbtTrade(){
    let result = await this.store.getQbtTrade()
    result && result.li && this.view.setState({ qbtTrade: result.li });
  }
// 谷歌验证六个输入的两个处理方法
  dealInput(num, value, _this){
    if(!/^[0-9]\d*$/.test(value)) {
      return;
    };
    if(this.view.state.googleCode[num] === '') {
      this.view.state.googleCode[num] = value;
      this.view.setState({googleCode: this.view.state.googleCode})
      num + 1 <= 5 && _this.refs[`input${num + 1}`].focus()
      return
    }
    if(this.view.state.googleCode[num] !== '' && num + 1 <= 5) {
      this.view.state.googleCode[num] = value;
      this.view.setState({googleCode: this.view.state.googleCode})
      _this.refs[`input${num + 1}`].focus()
      _this.refs[`input${num}`].blur()
    };
  }
  delNum(num, e, _this) {
    if (e.nativeEvent.keyCode === 8) {
      this.view.state.googleCode[num] = ''
      this.view.setState({googleCode: this.view.state.googleCode})
      num-1 >=0 && _this.refs[`input${num-1}`].focus()
      return;
    }
    this.view.state.googleCode[num] = ''
    this.view.setState({googleCode: this.view.state.googleCode})
  }

  // 判断对应的两次验证方式是否绑定，触发弹窗或跳转至绑定页面
  dealTwoVerify(type){
    let {userInfo, currentKey} = this.view.state;
    let {history} = this.view.props;
    //已绑定直接弹窗
    if(type === 2 && userInfo.googleAuth){
      history.push({
        pathname: `/user/googlekey/?currentType=${this.view.state.currentType}&currentKey=${this.view.state.currentKey}`,
        query: { from: true}
      });
      return;
    }
    if(type === 1 && !userInfo.email|| type === 3 && !userInfo.phone){
      history.push({
        pathname: `/user/verifybind/?type=${type - 1}&currentType=${this.view.state.currentType}&currentKey=${this.view.state.currentKey}`,
        query: { from: true }
      });
      return;
    }
    if(currentKey === 0 ) {
        this.setTwoVerifyH5('',0,'', this.view.state.currentType, type)
        this.view.setState({
          showBottomSelect: false
        })
      return
    }
    if(type === 1 && userInfo.email || type === 2 && !userInfo.googleAuth || type === 3 && userInfo.phone || type === 0){
      this.view.setState({
        showPopup: true,
        verifyPopupType: currentKey - 1,
        setType: type,
        googleCode: ["", "", "", "", "", ""],
        showBottomSelect: false
      })
      return;
    }
  }
  verifyAccount(type, account){
    // type 0 手机, 1 邮箱
    if(!type){
      return /^1[34578]\d{9}$/.test(account);
    }else{
      return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(account);
    }
  }
}