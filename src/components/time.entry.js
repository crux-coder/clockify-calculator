import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  entryPaper: {
    padding: theme.spacing(3, 2),
    width: '100%'
  },
});

class TimeEntry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timeEntries: []
    }
    this.get = this.get.bind(this);
    this.renderTimeEntries = this.renderTimeEntries.bind(this);
  }

  get() {
    Axios.get('https://api.clockify.me/api/v1/workspaces/5d638aa6dc72c61b9f1dfa50/user/5c2371d1b079871976621e14/time-entries', {
      headers: {
        'X-Api-Key': 'XdqcptH3sFUx3ru+',
      }
    }).then((response) => {
      this.setState({
        timeEntries: response.data
      });
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  renderTimeEntries() {
    const { timeEntries } = this.state;
    const { classes } = this.props;
    console.log(timeEntries)
    return timeEntries.map((timeEntry) => <ListItem button>
      <Paper className={classes.entryPaper}>
        <Typography component="p">
          {timeEntry.description}
        </Typography>
      </Paper>
    </ListItem>)
  }

  render() {

    return (
      <div>
        <button onClick={this.get}>GET</button>
        {this.renderTimeEntries()}
      </div >
    )
  }
}

TimeEntry.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimeEntry);
