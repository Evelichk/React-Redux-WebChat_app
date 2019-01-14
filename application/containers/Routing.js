'use strict';
import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'redux';
import createBrowserHistory from 'history/createBrowserHistory';
import Main from "./Main";
import { notFound } from "../layouts/NotFound";
import LoginPage from '../components/LoginPage'
import RegPage from "../components/RegPage";



export default class Routing extends Component {
    render(){
        return(
                <Router history={createBrowserHistory()}>
                    <Switch>
                        <Route path='/index.html' component={LoginPage}/>
                        <Route path='/registration' component={RegPage}/>
                        <Route path='/webchat' component={Main}/>
                        <Route path='/' exact component={LoginPage}/>
                        <Route component={notFound}/>
                    </Switch>
                </Router>
        )
    }
}