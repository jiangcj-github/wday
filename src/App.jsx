import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import Header from "./components/headerAndFooter/Header.jsx";
import Footer from "./components/headerAndFooter/footer.jsx";


const header = ({ match, history }) =>
    <Header match={match} history={history}/>;


const footer = ({ match, history }) =>
    <Footer match={match} history={history}/>;

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
