import ExchangeControllerBase from '../ExchangeControllerBase'
import HomeStore from './HomeStore'
import Error from "../Error"

class HomeController extends ExchangeControllerBase {
  constructor() {
    super();
    this.store = new HomeStore();
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