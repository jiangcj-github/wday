import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import "./common/css/common.styl";
import "./common/components/stylus/index.styl";

import Header from "./components/headerAndFooter/Header.jsx";
import Footer from "./components/headerAndFooter/footer.jsx";
import Home from "./components/home/Home.jsx"
import ProjectManage from "./components/project/ProjectManage.jsx"

import Search2 from "./components/search/Search";
import ArticleManage from "./components/article/ArticleManage";
import NewsManage from "./components/news/NewsManage";
import PersonManage from "./components/person/PersonManage";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const header = ({ match, history }) =>
            <Header match={match} history={history}/>;

        const footer = ({ match, history }) =>
            <Footer match={match} history={history}/>;

        const home = ({match, history}) =>
            <Home match={match} history={history}/>;

        const projectManage = ({match, history}) =>
            <ProjectManage match={match} history={history}/>;

        const articleManage = ({match, history}) =>
            <ArticleManage match={match} history={history}/>;

        const newsManage = ({match, history}) =>
            <NewsManage match={match} history={history}/>;

        const search = ({ match, history }) =>
            <Search2 match={match} history={history} />;

        const personManage = ({ match, history }) =>
            <PersonManage match={match} history={history} />;

        return (
            <Router>
                <div className="router-wrap">
                    {/*<Header/>*/}
                    <Switch>
                        <Route component={header} />
                    </Switch>
                    {/*content*/}
                    <div className="container">
                        <Switch>
                            <Route path="/home" component={home}/>
                            <Route path="/project" component={projectManage}/>

                            <Route path="/article" component={articleManage}  />
                            <Route path="/news" component={newsManage}  />

                            <Route path="/search" component={search}  />
                            <Route path="/person" component={personManage} />
                            <Redirect to="/home" />
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
