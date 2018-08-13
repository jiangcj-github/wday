import ExchangeControllerBase from '../ExchangeControllerBase'
import intl from "react-intl-universal";
import en from "../../lang/en.js";
import zh from "../../lang/zh.js";
import ConfigStore from './ConfigStore'

class ConfigController extends ExchangeControllerBase {
  constructor() {
    super();
    this.store = new ConfigStore();
  }

  setAppView(view){
    this.app = view;
  }

  get language() {
    return this.store.language;
  }

  changeLanguage(lang){
    this.store.changeLanguage(lang);
    location.reload();
  }

  async loadLocales() {
    const locales = {
      "en-US": en(this.store.state),
      "zh-CN": zh(this.store.state)
    };

    let lang = this.language;
    await intl.init({
      currentLocale: lang,
      locales,
    });
    this.app.setState({ initDone: true });
  }

}

configController = null;

export default function () {
    if(!configController){
        configController = new ConfigController();
    }
    return configController;
}