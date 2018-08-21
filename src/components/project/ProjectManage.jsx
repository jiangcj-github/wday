import React, { Component } from "react";
import {
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import ViewBase from "../../components/ViewBase";
import List from "./children/List";
import Detail from "./children/Detail";
import "./stylus/project.styl";

export default class ProjectManage extends ViewBase {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        let {match} = this.props;

        const list = ({ match, location, history }) =>
            <List location={location} history={history}/>;

        const detail = ({ match, location }) =>
            <Detail location={location}/>;

        return (
            <div className="project-route">
                <Switch>
                    <Route path={`${match.url}/list`} component={list} />
                    <Route path={`${match.url}/detail`} component={detail} />
                    <Redirect to={`${match.url}/list`}/>
                </Switch>
            </div>
        );
    }
}
