import React from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Reviews from '../Reviews';
import BookingPage from '../BookingPage';
import firebase from '../config/Fire'
import 'firebase/firestore'
import SearchResults from '../SearchResults';
import './HotelSearch.scss'


class HotelSearch extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        date: [new Date(), ((new Date()).setDate(new Date().getDate() + 1))],
        city: '',
        rooms: 1,
        displayResult: false,
        goToBookingPage: false,
        hotelData: null,
        userSelection: null,
        displayErrorMessage: false,
        pendingBooking: null,
        bookingData: null,
        cityValidation: null
    }
    componentDidMount() {
        const firestore = firebase.firestore()
        firestore.collection('pendingBookings').where('userEmail', '==', `${this.props.currentUserEmail}`).get()
        .then((snapshot) => {
            let pendingBookingData = []
            snapshot.docs.forEach((doc) => {
                pendingBookingData.push(doc.data())
            })

            this.setState({pendingBooking:pendingBookingData},()=>{
                console.log('booking pending')
            })
        })
        .catch(error => {
            console.log(error) 
        })
    }

    onChange = date => this.setState({ date });

    handleCity = event => this.setState({ city: event.target.value.toLowerCase() });

    handleRoomCount = event => this.setState({ rooms: event.target.value });

    handleSubmit = event => {
        event.preventDefault();
        let setUserSelection= {};
        if(this.state.city && this.state.rooms) {
            setUserSelection.city = this.state.city ;
            setUserSelection.rooms = this.state.rooms;
            setUserSelection.date = this.state.date;
            setUserSelection.userEmail = this.props.currentUserEmail;
        }
        this.setState({userSelection: setUserSelection})
        if(this.state.city) {
            const firestore = firebase.firestore()
            firestore.collection(this.state.city).get().then((snapshot) => {
                let hotelResults = []
                snapshot.docs.forEach(doc => {
                    hotelResults.push(doc.data())
                })
                this.setState({hotelData: hotelResults, displayResult: true, displayErrorMessage: false})
            }).catch((err) => {
                console.log('could not found data')
                this.setState({displayErrorMessage: true})
                console.log(err)
            })
        } else {
            this.setState({cityValidation: 'city is required to search hotel'})
        }
    }

    handlePendingBooking = () => {
        this.setState({bookingData: this.state.pendingBooking[0]});
        this.setState({goToBookingPage: true});
    }


    render() {
        return (
            <div className="hompepage">
                {!this.state.displayResult && !this.state.goToBookingPage &&
                <div className="hotel-search">
                    <h1>Search Your Hotel with ease</h1>
                
                    <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                        <Grid container>
                            <Grid item xs={6} sm={4}>
                                <TextField
                                    error={this.state.cityValidation}
                                    id="outlined-full-width"
                                    placeholder="enter city e.g bangalore , delhi or mumbai"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={this.state.city}
                                    onChange={this.handleCity}
                                    helperText={this.state.cityValidation}
                                />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <DateRangePicker
                                onChange={this.onChange}
                                value={this.state.date}
                                />
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <TextField
                                    id="outlined-full-width"
                                    placeholder="enter number of rooms"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={this.state.rooms}
                                    onChange={this.handleRoomCount}
                                />
                            </Grid>
                            <Grid item xs={6} sm={2}>
                            <Button variant="contained" color="primary" className="submit-btn" type="submit" value="Submit">
                                Search
                            </Button>
                            </Grid>
                        </Grid>
                        {this.state.displayErrorMessage &&
                            <h3 className="error-message">No Result found with, give valid city name</h3>
                        }
                        
                    </form>
                    { this.state.pendingBooking && this.state.pendingBooking.length > 0 &&
                    <div className="pending-booking">
                        <h1>You tried booking for {this.state.pendingBooking[0].hotelName}</h1>
                        <Button variant="contained" color="primary" onClick={this.handlePendingBooking}>
                            complete your booking
                         </Button>
                    </div>
                    }
                </div>
                }
                {!this.state.displayResult && !this.state.goToBookingPage &&
                    <div className="reviews">
                        <h1>You don't need to go far to find what matters.</h1>
                        <Grid container justify="center" className="dummy-content">
                            {[0, 1].map((value) => (
                                <Grid key={value} item xs={6}>
                                    <Reviews />
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container justify="center">
                            {[0, 1].map((value) => (
                                <Grid key={value} item xs={6}>
                                    <Reviews />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                }
                {this.state.hotelData && this.state.displayResult &&
                    <SearchResults hotelData = {this.state.hotelData} userSelection={this.state.userSelection}/>
                }
                { this.state.goToBookingPage && 
                    <BookingPage hotelDetails={this.state.bookingData}/>
                }
            </div>
        );
    }
}

export default HotelSearch;