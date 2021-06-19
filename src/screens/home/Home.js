import React, {Component} from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import Header from '../../common/header/Header';

class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Header/>
                Home
            </div>
        );
    }
}

export default Home;