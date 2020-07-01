import React from 'react';
import AppBar from '../AppBar';
import HotelSearch from '../HotelSearch';
import SearchResults from '../SearchResults';
import MyBookings from '../MyBookings';
import Profile from '../Profile';
import './home.scss'

class HomePage extends React.Component {

    state = {
        renderBookings: false,
        renderProfile: false,
        data: []
    }

    handleBookings = (displayMyBookings) => {
        this.setState({renderBookings: true, renderProfile: false})

    }

    handleProfile = () => {
        this.setState({renderProfile: true, renderBookings: false})
    }

    render() {
        const currentUserEmail=this.props.currentUser.email;
        const displayHotelSearch = !this.state.renderBookings && !this.state.renderProfile;
        return (
            <div className="home">
                <AppBar handleBookings={this.handleBookings} handleProfile ={this.handleProfile}/>
                {this.state.renderBookings &&
                    <MyBookings />
                }
                {this.state.renderProfile && 
                    <Profile/>
                }
                {this.props.currentUser.email && displayHotelSearch &&
                    <HotelSearch currentUserEmail={currentUserEmail}/>
                }
            </div>
            
        );
    }
}

export default HomePage;