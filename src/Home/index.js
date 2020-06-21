import React from 'react';
import AppBar from '../AppBar';
import HotelSearch from '../HotelSearch';
import SearchResults from '../SearchResults';
import MyBookings from '../MyBookings';
import './home.scss'

class HomePage extends React.Component {

    state = {
        renderBookings: false
    }
    handleBookings = (displayMyBookings) => {
        this.setState({renderBookings: true})
    }
    render() {
        const currentUserEmail=this.props.currentUser.email;
        return (
            <div className="home">
                <AppBar handleBookings={this.handleBookings}/>
                {this.state.renderBookings &&
                    <MyBookings />
                }
                {this.props.currentUser.email && !this.state.renderBookings &&
                    <HotelSearch currentUserEmail={currentUserEmail}/>
                }
            </div>
            
        );
    }
}

export default HomePage;