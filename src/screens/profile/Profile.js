import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Profile.css';

class Profile extends Component {
    render() {
        return (
            <div>
                <Header {...this.props} loggedIn={true} showMyAccount={false} />
        Profile page
            </div>
        )
    }
}
 
export default Profile;