import React, {Component} from 'react';
import Header from '../../common/header/Header';
import './Home.css'
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    Divider,
    FormControl,
    Grid,
    TextField, Typography
} from '@material-ui/core'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            userImages: [],
            filteredImages: [],
            id: "17999436943341133",
            url: "https://scontent.cdninstagram.com/v/t51.29350-15/201632985_2925903117736581_3526366745971372327_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=IUK_S-rzpJcAX8yTwXf&_nc_oc=AQnzJXnjOEbDYzAEmClHfW4lmDEC6UXhF5DGS1sILSVNuIleEN6JW3WM8jEhx8wJbIA&_nc_ht=scontent.cdninstagram.com&oh=cdfe0a2145142270992a0005f9d960d8&oe=60D21CAA",
            username: "yashspecter",
            // timestamp: "2021-06-17T07:09:56+0000",
            // tags: "#upgrad #reactjs #assignment #Course8",
            likes: [],
            // comments: [],
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    async componentDidMount() {
        let getUserImages = this.props.baseUrl + "me/media?fields=id,caption&access_token=" + sessionStorage.getItem("access-token");
        let getPostDetails = this.props.baseUrl + "$postId" + "?fields=id,media_type,media_url,username,timestamp&access_token=" + sessionStorage.getItem("access-token");

        let response = await fetch(getUserImages);
        let posts = await response.json();
        posts = posts.data;

        for (let i = 0; i < posts.length; i++) {
            response = await fetch(getPostDetails.replace('$postId', posts[i].id));
            let details = await response.json();
            posts[i].url = details.media_url;
            posts[i].username = details.username;
            posts[i].timestamp = details.timestamp;
            posts[i].comments = [];
            posts[i].tags = "#upgrad #reactjs #assignment #Course8";
            posts[i].likes = Math.round(Math.random() * 100);
            posts[i].isLiked = false;
        }
        this.setState({ userImages: posts });
        this.setState({ filteredImages: posts.filter(x => true) });
        console.log(this.state.userImages);
}


likeHandler = (index) => {
    let likedImages = this.state.userImages;
    likedImages[index].isLiked = !likedImages[index].isLiked;
    this.setState({'userImages': likedImages})
}

commentHandler = (index) => {
    var textField = document.getElementById("textfield-" + index);
    if (textField.value == null || textField.value.trim() === "") {
        return;
    }
    let imageComments = this.state.userImages[index].comments;
    if (imageComments[index] === undefined) {
        imageComments[index] = [textField.value];
    } else {
        imageComments[index] = imageComments[index].concat([textField.value]);
    }

    textField.value = '';

    this.setState({'comments': imageComments})
}

searchHandler = (e) => {
    if (this.state.searchText == null || this.state.searchText.trim() === "") {
        this.setState({filteredImages: this.state.userImages});
    } else {
        let filteredForSearch = this.state.userImages.filter((element) => {
            return element.caption !== undefined && (element.caption.toUpperCase().split("\n")[0].indexOf(e.target.value.toUpperCase())) > -1
        });
        this.setState({filteredImages: filteredForSearch});
    }
}

handleChange = (e) => {
    this.setState({'searchText': e.target.value}, () => {
        this.searchHandler(e);
    });
};

render() {
    if(this.state.loggedIn===false) return <Redirect to="/" />
    else
    return (
        <div>
            <div>
                <Header {...this.props} loggedIn={true} dpUrl={this.state.url} showMyAccount={true} handleChange={this.handleChange} />
                </div>
                <Container className='posts-container'>
                <Grid container alignContent='center' justify='flex-start' direction='row' spacing={2}>
                    {
                        (this.state.filteredImages || []).map((details, index) => (
                            <Grid item xs={6} key={details.id+"_img"}>
                                <Card key={details.id}>
                                    <CardHeader
                                        avatar={<Avatar variant="circle" src={this.state.url} className='avatar' />}
                                        title={details.username}
                                        subheader={new Date(details.timestamp).toLocaleString().replace(",","")} />
                                    <CardMedia style={{ height: 0, paddingTop: '80%', marginBottom: 10 }} image={details.url} />
                                    <Divider variant="middle" />
                                    <CardContent>
                                        <div className='caption'>{details.caption}</div>
                                        <div className='tags'> {details.tags} </div>
                                        <br />
                                        <div className='likes'>
                                            {
                                                details.isLiked ?
                                                    <FavoriteIcon fontSize='default' style={{ color: "red" }} onClick={() => this.likeHandler(index)} />
                                                    :
                                                    <FavoriteBorderIcon fontSize='default' onClick={() => this.likeHandler(index)} />
                                            }
                                            <Typography>
                                                <span>&nbsp;{details.isLiked ? (details.likes+1) + ' likes' : details.likes + ' likes'}</span>
                                            </Typography>
                                        </div>

                                        <div id='comments-container'>
                                            {
                                                details.comments[index] ?
                                                    (details.comments)[index].map((comment, index) => (
                                                        <p key={index}>
                                                            <b>{this.state.username}</b> : {comment}
                                                        </p>
                                                    ))
                                                    :
                                                    <p></p>
                                            }
                                        </div>

                                        <div className='post-comment-container'>
                                            <FormControl className='post-comment-form-control'>
                                                <TextField id={'textfield-' + index} label="Add a comment" />
                                            </FormControl>
                                            <div className='add-button'>
                                                <FormControl>
                                                    <Button variant='contained' color='primary' onClick={() => this.commentHandler(index)}>ADD</Button>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </div>
    );
}

}

export default Home;