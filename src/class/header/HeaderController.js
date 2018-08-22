import ExchangeControllerBase from '../ExchangeControllerBase'
import HeaderStore from './HeaderStore'
import Error from "../Error"

class HeaderController extends ExchangeControllerBase {
  constructor() {
    super();
    this.store = new HeaderStore();
  }

  async getMarket(){
    let data = this.store.getMarket();
    if(data.ret !== 0){
      return Promise.resolve({msg: Error(data.ret)})
    }
    return Promise.resolve(data.data);
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