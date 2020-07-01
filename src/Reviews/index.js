import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ComplexGrid(props) {
  const classes = useStyles();
  const rooms = props.userSelection ? props.userSelection.rooms : 1;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="https://a0.muscache.com/im/pictures/ef0ee86b-feba-47f8-8882-014b2a7b6926.jpg?im_w=1200" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
              { props.bookingData &&
                  <Typography gutterBottom variant="subtitle1">
                    {props.bookingData.hotelName}
                  </Typography>
                }
                <Typography gutterBottom variant="subtitle1">
                  
                  Express Avenue Inc.
                </Typography>
                { !props.bookingData &&
                <div>
                <Typography variant="body2" gutterBottom>
                  Relax in cosy rooms with basic amenities, located in Bangalore
                </Typography>
                <Typography variant="body2">
                  Have a good day
                </Typography>
                </div>
                }
                { props.bookingData &&
                <div>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        {(new Date().toDateString())}
                      </Grid>
                      <Grid item xs zeroMinWidth>
                        <Typography noWrap> {rooms}Rooms</Typography>
                      </Grid>
                    </Grid>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        Payable Amount
                      </Grid>
                      <Grid item xs zeroMinWidth>
                        <Typography noWrap> RS. 4529</Typography>
                      </Grid>
                    </Grid>
                  <Grid />
                  <Grid item>
                  <Typography variant="body2">
                    Have a good day
                  </Typography>
                </Grid>
                </div>
                }
              </Grid>
            </Grid>
            {!props.bookingData &&
            <Grid item>
              <Typography variant="subtitle1">RS. 3421</Typography>
            </Grid>
            }
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
