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
    padding: theme.spacing(1, 2),
    width: '100%'
  },
  inlineBlock: {
    display: 'inline-block',
  },
  block: {
    display: 'block',
  },
  floatRight: {
    float: 'right',
  },
  slider: {
    maxWidth: '70%',
  },
  green: {
    color: '#32965d',
  },
  red: {
    color: '#d05353',
  },
  billableBtn: {
    cursor: 'pointer',
  },
});

class TimeEntry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timeEntry: props.timeEntry
    }
    this.formatTimeDuration = this.formatTimeDuration.bind(this);
    this.swapBillable = this.swapBillable.bind(this);
  }

  formatTimeDuration(timeDuration) {
    timeDuration = timeDuration.replace('PT', '');
    timeDuration = timeDuration.replace('H', ':');
    timeDuration = timeDuration.replace('M', ':');
    timeDuration = timeDuration.replace('S', '');

    return timeDuration;
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
    return (
      <React.Fragment className={classes.w100}>
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
          variant="h6" display="block" gutterBottom
          className={classes.floatRight}>
          {this.formatTimeDuration(timeEntry.timeInterval.duration)}
        </Typography><br />
        {/* <Slider
          className={classes.slider}
          defaultValue={65}
          getAriaValueText={this.valueText}
          aria-labelledby="discrete-slider-small-steps"
          step={5}
          marks
          min={15}
          max={100}
          valueLabelDisplay="auto"
        /> */}
      </React.Fragment>
    )
  }
}

TimeEntry.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimeEntry);
