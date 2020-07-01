import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import firebase from '../config/Fire';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard(props) {
  const classes = useStyles();

  const currentUser = firebase.auth().currentUser;

  const displaName = currentUser.displayName ? currentUser.displayName : 'Anonymous'
console.log(currentUser)
  const mobileNumber = currentUser.phoneNumber ? currentUser.phoneNumber : 'xxxxxxxxxx'
  const verifiedStatus = currentUser.emailVerified ? 'Verified User' : 'user not verified'
  return (
    <Card className={`${classes.root} profile-card`} variant="outlined">
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          Email: {currentUser.email}
        </Typography>
        <Typography className={classes.pos}>
          Name: {displaName}
        </Typography>
        <Typography>
           Contact : {mobileNumber}
        </Typography>
        <Typography>
           emailVerified : {verifiedStatus}
        </Typography>
      </CardContent>
    </Card>
  );
}
