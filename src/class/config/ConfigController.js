import ExchangeControllerBase from '../ExchangeControllerBase'
import ConfigStore from './ConfigStore'

class ConfigController extends ExchangeControllerBase {
    constructor() {
        super();
        this.store = new ConfigStore();
    }

    get language() {
        return this.store.language;
    }

    setLanguage(lang) {
        this.store.changeLanguage(lang);
        location.reload();
    }

    setTimestamp(timestamp){
        this.store.setTimestamp(timestamp);
    }

    get timestamp(){
        return this.store.timestamp;
    }

}

//静态实例
ConfigController.instance = null;

export default function () {
    if(!ConfigController.instance){
        ConfigController.instance = new ConfigController();
    }
    return ConfigController.instance;
}