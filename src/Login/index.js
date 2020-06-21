import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import fire from '../config/Fire';


class Login extends React.Component {
    state = {
        email: null,
        password:null,
    }

    handleEmail = event => this.setState({ email: event.target.value });

    handlePassword = event => this.setState({ password: event.target.value });
    handleSubmit = event => {
        event.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) =>{
        }).catch((error) => {
        });
    }

    handleSignup = event => {
        event.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) =>{
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return(
            <div className="login-page">
                <h3>Login With Password and Email</h3>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <Grid container justify="center" spacing={5}>
                        <Grid item xs={6} sm={3}>
                            <TextField
                                id="outlined-full-width"
                                placeholder="Email"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={this.state.email}
                                onChange={this.handleEmail}

                            />
                        </Grid>
                        <Grid item xs={6} sm={3} spacing={3}>
                            <TextField
                                id="outlined-full-width"
                                placeholder="Password"
                                fullWidth
                                type='password'
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={this.state.password}
                                onChange={this.handlePassword}

                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="center" spacing={3}>
                        <Grid item xs={6} sm={1}>
                            <Button variant="contained" color="primary" className="login" type="submit" value="Submit">
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={6} sm={1}>
                            <Button variant="contained" color="primary" className="sign-up" type="submit" value="submit" onClick={this.handleSignup}>
                                New User
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

export default Login;