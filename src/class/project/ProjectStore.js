import ExchangeStoreBase from '../ExchangeStoreBase'

export default class ProjectStore extends ExchangeStoreBase {
    constructor() {
        super('login', 'general');
        this.state = {};
    }


}
