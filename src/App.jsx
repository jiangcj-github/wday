import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import "./common/css/common.styl";

import Header from "./components/headerAndFooter/Header.jsx";
import Footer from "./components/headerAndFooter/footer.jsx";
import ArticleList from "./components/article/ArticleList";

import ArticleController from "./class/article/ArticleController";

let articleController = new ArticleController();


const header = ({ match, history }) =>
    <Header match={match} history={history}/>;


const footer = ({ match, history }) =>
    <Footer match={match} history={history}/>;


const articleList = ({ match, history }) =>
  <ArticleList match={match} history={history} controller={articleController} />;


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div className="web-wrap">
                    {/*<Header/>*/}
                    <Switch>
                        <Route component={header} />
                    </Switch>
                    <div>
                        <Switch>
                          <Route component={articleList}  />
                        </Switch>
                    </div>
                    {/*<Footer/>*/}
                    <Switch>
                        <Route component={footer} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
