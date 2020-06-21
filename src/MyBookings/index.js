import React, { useEffect, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import firebase from '../config/Fire'
import './MyBookings.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function MyBookings() {
  const classes = useStyles();
 
  const [confirmedBookings, setConfirmedBookings] = React.useState();
  const [pendingBookings, setpendingBookings] = React.useState();

  const currentUser = firebase.auth().currentUser;
  const currentUserEmail = currentUser.email;

  // const getData

  useEffect(() => {
    fetch(`http://localhost:5000/confirmedBookings?userEmail=${currentUserEmail}`)
    .then(response => response.json())
    .then(data => setConfirmedBookings(data));

    fetch(`http://localhost:5000/pendingBookings?userEmail=${currentUserEmail}`)
    .then(response => response.json())
    .then(data => setpendingBookings(data));
  }, [])

  return (
    <div className={`${classes.root} my-bookings`}>
    <h1>My Booking</h1>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Confirmed Booking</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
                <List>
                {confirmedBookings && confirmedBookings.map(data => (
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText>
                            {data.hotelName}
                        </ListItemText>
                        <ListItemText>
                            Booding Id: {data.id}
                        </ListItemText>
                        <ListItemText>
                            {data.rooms} Rooms
                        </ListItemText>
                        <ListItemText>
                        &#8377; {data.price} Rooms
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
            <Divider variant="inset" component="li" />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Pending Booking</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <List>
                    {pendingBookings && pendingBookings.map(data => (
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText>
                                {data.hotelName}
                            </ListItemText>
                            <ListItemText>
                                Booding Id: {data.id}
                            </ListItemText>
                            <ListItemText>
                                {data.rooms} Rooms
                            </ListItemText>
                            <ListItemText>
                            &#8377; {data.price} Rooms
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
        <Divider variant="inset" component="li" />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
