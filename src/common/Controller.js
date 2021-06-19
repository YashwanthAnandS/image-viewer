import React, { Component } from 'react';
import Home from '../screens/home/Home';
import Login from '../screens/login/Login';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Profile from '../screens/profile/Profile';

class Controller extends Component {

    constructor() {
        super();
        this.state = {
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
        this.baseUrl = "https://api.instagram.com/v1/users/self/";
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path='/' render={(props) => <Login {...props} baseUrl={this.baseUrl} />} />
                        <Route exact path='/home' render={(props) => this.state.loggedIn ? (<Home {...props} baseUrl={this.baseUrl} />) : (<Redirect to='/' />)} />
                        <Route exact path='/profile' render={(props) => this.state.loggedIn ? (<Profile {...props} baseUrl={this.baseUrl} />) : (<Redirect to='/' />)} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Controller;