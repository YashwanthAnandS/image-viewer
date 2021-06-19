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

class Home extends Component {
    constructor() {
        super();
        this.state = {
            userImages: [{}],
            id: "17999436943341133",
           // url: "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/192178301_773030510062147_6420479614626111894_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=OG9F6vUS-LoAX-9jme2&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=1ac53e5a4b52f29a34a7b8b2dfa07137&oe=60B612B6",
           url: "https://scontent.cdninstagram.com/v/t51.29350-15/201632985_2925903117736581_3526366745971372327_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=IUK_S-rzpJcAX8yTwXf&_nc_oc=AQnzJXnjOEbDYzAEmClHfW4lmDEC6UXhF5DGS1sILSVNuIleEN6JW3WM8jEhx8wJbIA&_nc_ht=scontent.cdninstagram.com&oh=cdfe0a2145142270992a0005f9d960d8&oe=60D21CAA", 
           username: "yashspecter",
            timestamp: "2021-06-17T07:09:56+0000",
            tags: "#SupermanMos",
            likes: [],
            comments: []
        }
    }

    componentDidMount() {
        this.getUserImages();
    }

    getUserImages = () => {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({userImages:JSON.parse(this.responseText).data});
            }
        });

        let url = this.props.baseUrl + "me/media?fields=id,caption&access_token=" + sessionStorage.getItem("access-token");
        xhr.open("GET", url);
        xhr.send(data);
        console.log(this.state.userImages);
    }

    render() {
        return (
            <div>
                <div>
                <Header {...this.props} loggedIn={true} dpUrl={this.state.url} showMyAccount={true} />
                    </div>
                    <Container className='posts-container'>
                    <Grid container alignContent='center' justify='flex-start' direction='row' spacing={2}>
                        {
                            (this.state.userImages || []).map((details, index) => (
                                <Grid item xs={6} key={details.id+"_img"}>
                                    <Card key={details.id}>
                                        <CardHeader
                                            avatar={<Avatar variant="circle" src={this.state.url} className='avatar' />}
                                            title={this.state.username}
                                            subheader={new Date(this.state.timestamp).toLocaleString().replace(",","")} />
                                        <CardMedia style={{ height: 0, paddingTop: '80%', marginBottom: 10 }} image={this.state.url} />
                                        <Divider variant="middle" />
                                        <CardContent>
                                            <div className='caption'>{details.caption}</div>
                                            <div className='tags'> {this.state.tags} </div>
                                            <br />
                                            <div className='likes'>
                                                {
                                                    this.state.likes[index] ?
                                                    <FavoriteIcon fontSize='default' style={{ color: "red" }} onClick={() => this.likeHandler(index)} />                                                        :
                                                    <FavoriteBorderIcon fontSize='default' onClick={() => this.likeHandler(index)} />                                                }
                                                <Typography>
                                                    <span>&nbsp;{this.state.likes[index] ? 2 + ' likes' : 1 + ' likes'}</span>
                                                </Typography>
                                            </div>

                                            <div id='comments-container'>
                                                {
                                                    this.state.comments[index] ?
                                                        (this.state.comments)[index].map((comment, index) => (
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
                                                        <Button variant='contained' color='primary'>ADD</Button>
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


likeHandler = (index) => {
    let likedImages = this.state.likes;
    likedImages[index] = !likedImages[index];
    this.setState({'likes': likedImages})
}

commentHandler = (index) => {
    var textField = document.getElementById("textfield-" + index);
    if (textField.value == null || textField.value.trim() === "") {
        return;
    }
    let imageComments = this.state.comments;
    if (imageComments[index] === undefined) {
        imageComments[index] = [textField.value];
    } else {
        imageComments[index] = imageComments[index].concat([textField.value]);
    }

    textField.value = '';

    this.setState({'comments': imageComments})
}

}
export default Home;