import React from 'react';

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Rating from '@material-ui/lab/Rating';
import BookingPage from '../BookingPage'
import './SearchResults.scss';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        displayBookingPage: false,
        hotelDetails: null
    }
    handleBooking = (hotel) => {
        hotel.userEmail = this.props.userSelection.userEmail;
        fetch('http://localhost:5000/pendingBookings', {
            method: 'POST',
            headers : new Headers(),
            body:JSON.stringify(hotel),
            headers: {"Content-Type" : "application/json"}
        })
        this.setState({displayBookingPage: true, hotelDetails: hotel})
    }
    render() {
        const { userSelection } = this.props;
        const { hotelData } = this.props;
        return (
            <div>
            {!this.state.displayBookingPage &&
                <div className="search-result">
                    <h1> {hotelData.length} hotels found near You</h1>
                    {hotelData.map((hotel) => (
                    <Card className="result-section">
                        <CardMedia className="hotel-image">
                            <img src="https://place-hold.it/350x350" alt="hotelName" />
                        </CardMedia>
                        <div className="result-details">
                            <div className="description-content">
                                <h3 className="hotel-name">{hotel.hotelName}</h3>
                                <p className="hotel-address">{hotel.address}</p>
                                <div className="hotel-rating">
                                    <Rating name="size-large" defaultValue={hotel.rating} size="large" />
                                </div>
                                <div className="hotel-amenities">
                                    <span>Free Wifi</span>
                                    <span>Power Backup</span>
                                    <span>Parking facility</span>
                                </div>
                            </div>
                            <div className="hotel-price">
                                <div className="price">
                                    <h3>&#8377; {hotel.price}</h3>
                                </div>
                                <div className="buy-btn">
                                    {hotel.rooms - userSelection.rooms < 0 &&
                                        <Button variant="contained" color="primary"  disabled className="booking-btn" onClick={() => this.handleBooking(hotel)}>
                                            Rooms Unavailable
                                        </Button>
                                    }
                                    {hotel.rooms - userSelection.rooms > 0 &&
                                        <Button variant="contained" color="primary" className="booking-btn" onClick={() => this.handleBooking(hotel)}>
                                            Book Now
                                        </Button>
                                    }
                                </div>
                            </div>
                        </div>
                    </Card>
                    ))}
                </div>
            }
            {this.state.hotelDetails &&
                <BookingPage hotelDetails={ this.state.hotelDetails} userSelection={userSelection}/>
            }
            </div>
        );
    }
}

export default SearchResults;