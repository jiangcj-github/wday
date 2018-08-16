import ExchangeControllerBase from '../ExchangeControllerBase'
import ProjectStore from './ProjectStore'

class ProjectController extends ExchangeControllerBase {
    constructor() {
        super();
        this.store = new ProjectStore();
    }

}

//静态实例
ProjectController.instance = null;

export default function () {
    if(!ProjectController.instance){
        ProjectController.instance = new ProjectController();
    }
    return ProjectController.instance;
}