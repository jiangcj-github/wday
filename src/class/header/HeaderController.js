import ExchangeControllerBase from '../ExchangeControllerBase'
import HeaderStore from './HeaderStore'
import Error from "../Error"
import ConfigController from "../config/ConfigController"

class HeaderController extends ExchangeControllerBase {
  constructor() {
    super();
    this.store = new HeaderStore();
  }

  async getMarket(){
    let data = await this.store.getMarket({
      iss: ConfigController().timestamp,
      num: 5,
    });
    if(data.ret !== 0){
      return {msg: Error(data.ret)};
    }
    data = data.data;

    let newData = {
      newsNum: 0,
      markets: [],
    };
    if(data){
      newData.newsNum = data.num;
      data.mkt && data.mkt.forEach(item=>{
        newData.markets.push({
          name: item.nme,
          logo: item.lgo,
          rise: (item.ris>=0 ? "+" : "") + (JSON.stringify(item.ris)*100).fix(0),   //涨幅
          unit: item.ety && item.ety.unit,      // 价格单位
          price: item.ety && JSON.stringify(item.ety.value).fix(0),    //价格
        });
      });
    }
    return newData;
  }

}

//静态实例
HeaderController.instance = null;

export default function() {
  if(!HeaderController.instance){
    HeaderController.instance = new HeaderController();
  }
  return HeaderController.instance;
}