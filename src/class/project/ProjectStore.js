import ExchangeStoreBase from '../ExchangeStoreBase'

export default class ProjectStore extends ExchangeStoreBase {
    constructor() {
        super("project", "general");
        this.state = {};
    }

    async getActivity(){
        return await this.Proxy.getActivity();
    }


}
