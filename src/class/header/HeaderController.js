import ExchangeControllerBase from '../ExchangeControllerBase'
import HeaderStore from './HeaderStore'
import Error from "../Error"

class HeaderController extends ExchangeControllerBase {
  constructor() {
    super();
    this.store = new HeaderStore();
  }

  async getMarket(){
    let data = await this.store.getMarket({
      iss: Date.now(),
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
          rise: item.ris,   //涨幅
          price: item.prc
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