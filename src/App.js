import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Login from './Login';
import fire from './config/Fire';

class App extends Component {
  state = {
    user: {}
  }

  componentDidMount() {
    this.authListner();
  }
  authListner() {
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user});
      } else {
        this.setState({user: null});
      }
    });
  }

  render() {
    return (
      <div className="App">
        {!this.state.user &&
          <h2>Please Sign up if you are a new user</h2>
        }
        {this.state.user ? (<Home currentUser={this.state.user}/>) : <Login />}
      </div>
    );
  }
}

export default App;
