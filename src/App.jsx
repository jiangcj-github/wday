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

import ArticleList from "./components/article/ArticleList";
import NewsList from "./components/news/NewsList";
import News from "./components/news/News";
import NewsDayItem from "./components/news/NewsDayItem";
import ArticleDetail from "./components/article/ArticleDetail";


const header = ({ match, history }) =>
    <Header match={match} history={history}/>;

const footer = ({ match, history }) =>
    <Footer match={match} history={history}/>;

const home = ({match, history}) =>
    <Home match={match} history={history}/>;


const articleList = ({ match, history }) =>
  <ArticleList match={match} history={history} controller={articleController} />;
const articleDetail = ({ match, history }) =>
  <ArticleDetail match={match} history={history} controller={articleController} />;
const newsList = ({ match, history }) =>
  <NewsList match={match} history={history} controller={newsController} />;
const news = ({ match, history }) =>
  <News match={match} history={history} controller={newsController} />;
const newsdayitem = ({ match, history }) =>
  <NewsDayItem match={match} history={history} controller={newsController} />;

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                            <Route path="/home" conponent={Home}/>

                            <Route path="/article" component={articleDetail}  />
                            <Route path="/articlelist" component={articleList}  />
                            <Route path="/newslist" component={newsList}  />
                            <Route path="/news" component={news}  />
                            <Route path="/newsdayitem" component={newsdayitem}  />

                            <Route component={Home} />
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
