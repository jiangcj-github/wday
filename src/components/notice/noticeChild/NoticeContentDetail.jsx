import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import exchangeViewBase from '../../../components/ExchangeViewBase'
import "../stylus/noticeDetail.styl"


export default class homeNotice extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      queryType: 0,
      queryId: ""
    }
    const {controller} = props
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.activityCon = controller.activityCon.bind(controller) // 获取详情
  }

  // setView(view){
  //   super.setView(view);
  //   return this.store.data
  // }
  componentWillMount() {
    // let ActionId = this.props.location.query.noticeId;
    let url = window.location.search, str1, str2;
    str1 = url.split('?')
    str2 = str1[1].split('=')
    this.setState({
      queryType: str2[0] === 'noticeId' ? 0 : 2,
      queryId: str2[1] * 1
    })
  }

  async componentDidMount() {
    await this.activityCon(this.state.queryId, this.state.queryType)

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    let activityInfo = this.state.activityList;
    let activityRecommend, link;
    activityInfo.catalog && (activityRecommend = eval(activityInfo.recommend));
    activityInfo.catalog && (link = eval(activityInfo.recommendLink));
    return <div className="notice-detail-wrap ">
      <h1>
        <Link to="/home">{this.intl.get("header-home")}</Link>&gt;
        <Link
          to="/notice">{this.state.queryType === 0 ? this.intl.get("newsView") : this.intl.get("infoView")}</Link>&gt;
        <Link
          to="/notice/content/detail">{this.state.queryType === 0 ? this.intl.get("notice-detail") : this.intl.get("info-detail")}</Link>
      </h1>
      <h2 className="clearfix">
          <span>
            {activityInfo.subject}
          </span>
        <b>
          {activityInfo.createdAt &&
          activityInfo.createdAt.toDate("yyyy-MM-dd HH:mm:ss")}
        </b>
      </h2>
      {this.state.queryType && <h3>
        {/* 从比特节点数据获悉，跟着区块链热度一起上涨的，还有比特币世界中全节点的数量。全球比特币全节点数量在2018年2月之前，一直处于相对稳定的10000点左右状态，中国在全球的全节点占有率在5%到8%之间，但是自2月后突然猛增，一直到3月，全球市场占有率飙升至17%，全球排名也超过一直稳居老二的德国，跃居全球第二，目前排在第一位的仍是美国。 */}
        {activityInfo.abstract}
      </h3>}
      {/*<h4>*/}
      {/*作者*/}
      {/*</h4>*/}
      <div className="content">
        {/* {activityInfo.catalog ? <img src={`${this.props.controller.configData.currentImgUrl}downloadimage/origin/${activityInfo.titleImage}`} alt="" /> : ''} */}
        <div dangerouslySetInnerHTML={{__html: activityInfo.content}}>
          {/*  <div>
            <p>
              2018年农历新年伊始，区块链热度再上一层。腾讯《一线》从比特节点数据获悉，跟着区块链热度一起上涨的，还有比特币世界中全节点的数量。
            </p>
            <p>
              全球比特币全节点数量在2018年2月之前，一直处于相对稳定的10000点左右状态，中国在全球的全节点占有率在5%到8%之间，但是自2月后突然猛增，一直到3月，全球市场占有率飙升到17%，全球排名也超过一直稳居老二的德国，跃居全球第二。
            </p>
            <p>
              暴风播酷云负责人告诉腾讯《一线》，中国比特币全节点数量的上升，与其发售的播酷云BCN区块链节点服务相关，“目前播酷云和比特币节点关联的网络端已经有1500个，和QTUM量子链、Metaverse元界、比特钻石、以太雾ETF等达成区块链节点服务协议。”
            </p> */}
        </div>
      </div>
      {activityInfo.catalog ? <div>
        <h5>
          <span>{this.intl.get("notice-link")}：</span>
          <a href={`${activityInfo.source}`} target="_blank">{`${activityInfo.source}`}</a>
        </h5>
        {link && <h6>
          <span>{this.intl.get("notice-recommend")}：</span>
          {activityRecommend && activityRecommend.map((v, i) => <a href={link[i]} target="_blank" key={i}>{v}</a>)}
        </h6>}
      </div> : ''}
    </div>;
  }
}
