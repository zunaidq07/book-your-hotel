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
        rooms: null,
        displayResult: false,
        goToBookingPage: false,
        hotelData: null,
        userSelection: null,
        displayErrorMessage: false,
        pendingBooking: null,
        bookingData: null
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

    handleCity = event => this.setState({ city: event.target.value });

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
        const firestore = firebase.firestore()
        firestore.collection(this.state.city).get().then((snapshot) => {
            let hotelResults = []
            snapshot.docs.forEach(doc => {
                hotelResults.push(doc.data())
            })
            this.setState({hotelData: hotelResults, displayResult: true, displayErrorMessage: false})
        }).catch((err) => {
            this.setState({displayErrorMessage: true})
            console.log(err)
        })
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
                                <Grid key={value} item xs={6} spacing={2}>
                                    <Reviews />
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container justify="center">
                            {[0, 1].map((value) => (
                                <Grid key={value} item xs={6} spacing={2}>
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
                <footer className="footer-container">
                <Grid container>
                    <Grid item xs={6} sm={6}>
                        <h5 class="white-text">Footer Content</h5>
                        <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <h5 class="white-text">Links</h5>
                        <ul>
                            <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
                            <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
                            <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
                            <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
                        </ul>
                    </Grid>
                </Grid>
                </footer>



            </div>
        );
    }
}

export default HotelSearch;