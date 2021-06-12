import React, { Component } from 'react';
import "./Login.css";
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from '@material-ui/core/Button';
import FormHelperText from "@material-ui/core/FormHelperText";
 
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            usernameRequired: "dispNone",
            loginPassword: "",
            loginPasswordRequired: "dispNone",
            incorrectCredentials: "dispNone"
        }
    }

    inputUserNameChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) :
            this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) :
            this.setState({ loginPasswordRequired: "dispNone" });

        let username = "admin",
            password = "admin",
            accessToken = "IGQVJWVXJhcWRMQWU2MlVaQTZAxRWRzWDhmeG96bk9qcmZAOa2ZA1OUV3b0l6ZA085VUg5UkNTdlpvTzJWaE5hRjBQcF9uOTBldElEMG1mODh5UGR2Yl9HR25USDBJYWxyQlR2LWlxc1R5ekVhbVl2MUE4YmZASc1FFLWJmd3FV";

        this.setState({ incorrectCredentials: "dispNone" })
        if( (this.state.username === username) && (this.state.loginPassword === password) )  {
            window.sessionStorage.setItem("access-token", accessToken);
        } else {
            if(this.state.username !== "" && this.state.loginPassword !== "" ) {
                this.setState({ incorrectCredentials: "dispBlock" })
            }
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="card-container">
                    <Card>
                        <div className="card-content">
                            <Typography variant="h5" component="h2">
                                LOGIN
                            </Typography>
                            <br />
                            <FormControl className="login-card-form-username" required>
                                <InputLabel htmlFor="username"> Username </InputLabel>
                                <Input id="username"
                                       type="text"
                                       username={this.state.username}
                                       onChange={this.inputUserNameChangeHandler} />
                                <FormHelperText className={this.state.usernameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br />
                            <br />
                            <FormControl className="login-card-form-password" required>
                                <InputLabel htmlFor="Password"> Password </InputLabel>
                                <Input id="password"
                                       type="password"
                                       password={this.state.loginPassword}
                                       onChange={this.inputLoginPasswordChangeHandler} />
                                <FormHelperText className={this.state.loginPasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                                <br />
                                <FormHelperText className={this.state.incorrectCredentials}>
                                    <span className="red">Incorrect username and/or password</span>
                                </FormHelperText>
                            </FormControl>
                            <br/>
                            <br/>
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Login;