import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../common/header/Header';
import './Profile.css';
import {
    Avatar,
    Container,
    Fab,
    Typography,
    Grid
} from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            userImages: [],
            id: "17999436943341133",
            username: "yashspecter",
            fullName: "Yash",
            likes: [],
            url: "https://scontent.cdninstagram.com/v/t51.29350-15/201632985_2925903117736581_3526366745971372327_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=IUK_S-rzpJcAX8yTwXf&_nc_oc=AQnzJXnjOEbDYzAEmClHfW4lmDEC6UXhF5DGS1sILSVNuIleEN6JW3WM8jEhx8wJbIA&_nc_ht=scontent.cdninstagram.com&oh=cdfe0a2145142270992a0005f9d960d8&oe=60D21CAA",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    render() {
        if (this.state.loggedIn === false) return <Redirect to="/" />
        else
            return (
                <div>
                    <Header {...this.props} loggedIn={true} showMyAccount={false} dpUrl={this.state.url} />
                    <Container>
                        <div style={{ height: 32 }}></div>
                        <Grid container spacing={3} justify="flex-start">
                            <Grid item xs={2} />
                            <Grid item xs={2} style={{ paddingTop: 25 }}>
                                <Avatar alt='profile_pic' id="dp" variant="circle" src={this.state.url} style={{ marginTop: 10 }} />
                            </Grid>
                            <Grid item xs={5} id='info-container'>
                                <Typography variant="h4" component="h1" style={{ paddingBottom: 15 }}>
                                    {this.state.username}
                                </Typography>
                                <Grid container spacing={3} justify="center" style={{ paddingBottom: 15 }}>
                                    <Grid item xs={4}>
                                        Posts:{" "}
                                        {Math.round(Math.random() * 100)}
                                    </Grid>
                                    <Grid item xs={4}>
                                        Follows:{" "}
                                        {Math.round(Math.random() * 1000)}
                                    </Grid>
                                    <Grid item xs={4}>
                                        Followed By:{" "}
                                        {Math.round(Math.random() * 1000)}
                                    </Grid>
                                </Grid>
                                <Typography variant="h6" component="h2" style={{ marginTop: 5 }}>
                                    {this.state.fullName}
                                    <Fab color="secondary" id="edit-name" aria-label="edit" >
                                        <EditIcon fontSize="small" />
                                    </Fab>
                                </Typography>

                            </Grid>
                            <Grid item xs={4} />
                        </Grid>
                    </Container>
                </div>
            )
    }
}

export default Profile;