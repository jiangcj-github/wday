import React, { Component } from "react";
import {
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import ViewBase from "../../components/ViewBase";
import Collect from "./children/Collect";
import "./stylus/person.styl";

export default class PersonManage extends ViewBase {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        //设置导航栏菜单
        this.bus.emit("selectItem", null);
    }

    render() {
        let {match} = this.props;

        const collect = ({ match, location, history }) =>
            <Collect location={location} history={history}/>;

        return (
            <div className="person-route">
                <Switch>
                    <Route path={`${match.url}/collect`} component={collect} />
                    <Redirect to={`${match.url}/collect`}/>
                </Switch>
            </div>
        );
    }
}
