import ViewBase from "../core/ViewBase";
import intl from "react-intl-universal";

export default class ExchangeViewBase extends ViewBase {
  constructor(props) {
    super(props);
    // this.history = props.history;
    // this.match = props.match;
    this.intl = intl;
    this.location = "";
    // img标签引用图片路径统一管理
    this.$imagesMap = {

      $h5_tip_fail: "/static/mobile/img_ts_czcc@3x.png",

    }
  }

  componentWillMount() {
    super.componentWillMount();
    // console.log('exchangeViewBase componentWillMount')
  }

  componentDidMount() {
    super.componentDidMount();
    // this.location = window.location.href;
    // document.getElementById('app').scrollIntoView(true)
  }

  componentWillUpdate() {
    super.componentWillUpdate();
    // console.log("WillUpdate", this, this.location);
    // if (this.location !== window.location.href){
    //   document.getElementById("app").scrollIntoView(true);
    //   this.location = window.location.href;
    // }
    // console.log('exchangeViewBase componenDidMount')
  }
}
