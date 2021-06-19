import React, {Component} from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import Header from '../../common/header/Header';
import { withRouter } from 'react-router-dom';

class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Header {...this.props} loggedIn={true} showMyAccount={true}/>
                Home page
            </div>
        );
    }
}

export default withRouter(Home);