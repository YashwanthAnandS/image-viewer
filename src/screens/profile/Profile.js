import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../../common/header/Header';
import './Profile.css';

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }
    render() {
        if(this.state.loggedIn===false) return <Redirect to="/" />
        else
        return (
            <div>
                <Header {...this.props} loggedIn={true} showMyAccount={false} />
        Profile page
            </div>
        )
    }
}

export default Profile;