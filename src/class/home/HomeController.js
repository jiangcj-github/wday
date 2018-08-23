import ExchangeControllerBase from '../ExchangeControllerBase'
import HomeStore from './HomeStore'
import Error from "../Error"

class HomeController extends ExchangeControllerBase {
  constructor() {
    super();
    this.store = new HomeStore();
  }

  //获取首页项目列表
  async getActivityHome(){
    let data = await this.store.getActivity();
    if(data.ret !== 1 ){
      return {msg: Error(data.ret)};
    }
    return data.data;
  }

}

//静态实例
HomeController.instance = null;

export default function () {
  if(!HomeController.instance){
    HomeController.instance = new HomeController();
  }
  return HomeController.instance;
}