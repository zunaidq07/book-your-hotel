import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Reviews from '../Reviews';
import firebase from '../config/Fire'
import 'firebase/firestore'
import './BookingPage.scss';

class BookingPage extends React.Component {
    state = { 
        name: '',
        email : '',
        contact: null,
        diplayPaymentTab: false,
        bookingConfirmed: false,
        emailValidation: null,
        nameValidation: null,
        contactValidation: null
    }

    handleName = event => this.setState({ name: event.target.value });

    handleEmail = event => this.setState({ email: event.target.value });

    handleContact = event => this.setState({ contact: event.target.value });
    handleSubmit = event => {
        event.preventDefault();
        const isValidContact = this.state.contact ? (Number.isInteger(parseInt(this.state.contact)) && this.state.contact.length>=10) : false;

        const isValidEmail = /^\S+@\S+\.\S+$/.test(this.state.email)

        this.setState({nameValidation: (!this.state.name ? 'name of guest is required' : null)})

        this.setState({emailValidation: ( !isValidEmail ? 'valid email of guest is required' : null)})

        this.setState({contactValidation: (!isValidContact ?  'valid contact number is required' : null)})

        if(this.state.name && this.state.email && isValidContact) {
            console.log(typeof this.state.contact)
            this.setState({ diplayPaymentTab: true});
        }
        else {console.log('error in filling personal details');}
    }

    confirmBooking = (bookingDetails) => {
        this.setState({bookingConfirmed: true});
        const firestore = firebase.firestore()

        firestore.collection('confirmedBookings').add(bookingDetails).then(() => {
            firestore.collection('pendingBookings').where('userEmail', '==', `${bookingDetails.userEmail}`).get().then((snapshot) => {
                const dataToRemove = snapshot.docs.find(doc => {
                    if(doc.data().hotelName === bookingDetails.hotelName) {
                        return doc.id
                    }
                })
                firestore.collection('pendingBookings').doc(dataToRemove.id).delete()
            })
        }).catch((err) => console.log(err))

    }
    render() {
        let user = firebase.auth().currentUser;
        let userEmail = user ? user.email : '';
        const { hotelDetails, userSelection } = this.props;
        let bookingDetails = this.state.diplayPaymentTab ? 
            { 
                name: this.state.name,
                userEmail: userEmail,
                email: this.state.email,
                contact: this.state.contact,
                hotelName: hotelDetails.hotelName,
                rooms: userSelection ? userSelection.rooms : 1,
                place: hotelDetails.place,
                type: hotelDetails.type,
                price: hotelDetails.price,
                address: hotelDetails.address
            } : null;
        return(
            <div>
                {!this.state.bookingConfirmed &&
                    <div className="booking-page">
                        <h3 class="white-text">Complete Booking</h3>
                        <Grid container>
                            <Grid item xs={6} sm={6}>
                                <div className="details-section">
                                <h3>Enter your details</h3>
                                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                <Grid container>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            id="outlined-full-width"
                                            placeholder="name"
                                            fullWidth
                                            margin="normal"
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={this.state.name}
                                            onChange={this.handleName}
                                            helperText={this.state.nameValidation}
                                            error={this.state.nameValidation}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            id="outlined-full-width"
                                            placeholder="Email"
                                            fullWidth
                                            type="email"
                                            margin="normal"
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={this.state.email}
                                            onChange={this.handleEmail}
                                            helperText={this.state.emailValidation}
                                            error={this.state.emailValidation}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6} sm={6}>
                                            <TextField
                                                id="outlined-full-width"
                                                placeholder="Mobile Number"
                                                fullWidth
                                                required
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                value={this.state.contact}
                                                onChange={this.handleContact}
                                                helperText={this.state.contactValidation}
                                                error={this.state.contactValidation}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={6} className="continue-btn-section">
                                            <Button variant="contained" color="primary" className="continue-btn" type="submit" value="Submit">
                                                Continue
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                </form>
                                </div>
                                {this.state.diplayPaymentTab && 
                                    <div className="payment-section">
                                        <Button variant="contained">Pay at Hotel</Button>
                                        <Button variant="contained" disabled>
                                            Pay Now
                                        </Button>
                                        <Button variant="contained" color="primary" className="payment-btn" onClick={() => this.confirmBooking(bookingDetails)}>
                                                    Book Now
                                        </Button>
                                    </div>
                                }
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <div className="description-section">
                                    <Reviews bookingData = {hotelDetails} userSelection = {userSelection}/>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                }
                {this.state.bookingConfirmed &&
                    <h3 className="confirmation-msg">Yaay, booking has been confirmed for {bookingDetails.name} at {bookingDetails.hotelName}</h3>
                }
            </div>
        );
    }
}

export default BookingPage;