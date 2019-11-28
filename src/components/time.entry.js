import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Slider from '@material-ui/core/Slider';
import ListItemText from '@material-ui/core/ListItemText';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';

import Axios from 'axios';

const styles = theme => ({
  w100: {
    padding: theme.spacing(1, 1),
    width: '100%'
  },
  inlineBlock: {
    display: 'inline-block',
  },
  block: {
    display: 'block',
  },
  floatRight: {
    right: '1em'
  },
  dFlex: {
    display: 'flex',
  },
  slider: {
    marginRight: '1em'
  },
  green: {
    color: '#32965d',
  },
  red: {
    color: '#d05353',
  },
  billableBtn: {
    cursor: 'pointer',
  }
});

class TimeEntry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timeEntry: props.timeEntry,
      baseRate: 40,
      calculatedRate: 0,
      defaultPercentage: 65
    }
    this.formatTimeDuration = this.formatTimeDuration.bind(this);
    this.swapBillable = this.swapBillable.bind(this);
    this.handleSlideChange = this.handleSlideChange.bind(this);
  }

  componentDidMount() {
    const { defaultPercentage } = this.state;
    this.handleSlideChange(null, defaultPercentage);
  }

  formatTimeDuration(timeInterval) {
    const startDate = new Date(timeInterval.start);
    const endDate = new Date(timeInterval.end);
    const timeDurationInSeconds = (endDate.getTime() - startDate.getTime()) / 1000;

    var hours   = Math.floor(timeDurationInSeconds / 3600);
    var minutes = Math.floor((timeDurationInSeconds - (hours * 3600)) / 60);
    var seconds = timeDurationInSeconds - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
  }

  handleSlideChange(event, value) {
    const { baseRate } = this.state;
    this.setState({
      calculatedRate: baseRate * (value / 100),
    });
  }

  swapBillable() {
    const { timeEntry } = this.state;
    timeEntry.billable = !timeEntry.billable;
    this.setState({
      timeEntry
    });
  }

  render() {
    const { timeEntry, classes } = this.props;
    const { baseRate, calculatedRate, defaultPercentage } = this.state;
    return (
      <Paper className={classes.w100}>
        <div className={classes.dFlex}>
          <ListItemAvatar className={classes.billableBtn} onClick={this.swapBillable}>
            {timeEntry.billable ?
              <AttachMoneyIcon fontSize="large" className={classes.green} /> :
              <MoneyOffIcon fontSize="large" className={classes.red} />}
          </ListItemAvatar>
          <ListItemText
            className={classes.block}
            primary={timeEntry.description}
            secondary={new Date(timeEntry.timeInterval.end).toLocaleDateString()}
          />
          <Typography
            variant="h5" display="block" gutterBottom
            className={classes.floatRight}>
            {this.formatTimeDuration(timeEntry.timeInterval)}
          </Typography>
        </div>
        <div className={classes.dFlex}>
          <ListItemAvatar>

          </ListItemAvatar>
          <Slider
            className={classes.slider}
            defaultValue={defaultPercentage}
            onChange={this.handleSlideChange}
            aria-labelledby="discrete-slider-small-steps"
            step={5}
            marks
            min={15}
            max={100}
            valueLabelDisplay="auto"
          />
          <div>
            <Typography
              variant="h6"
              display="block"
              color="textSecondary"
              className={`${classes.floatRight}`}>
              ${calculatedRate}/${baseRate}
            </Typography>
          </div>
        </div>
      </Paper>
    )
  }
}

TimeEntry.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimeEntry);
