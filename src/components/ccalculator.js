import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import TimeEntry from './time.entry';
import { Typography } from '@material-ui/core';


class CCalculator extends Component {
  constructor(props) {
    super(props);
    //Setting start date a week back from today
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    this.state = {
      timeEntries: [],
      startDate: startDate,
      endDate: new Date(),
      isLoading: true
    }

    this.renderTimeEntries = this.renderTimeEntries.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.getTimeEntries = this.getTimeEntries.bind(this);
  }

  componentDidMount() {
    this.getTimeEntries();
  }

  componentDidUpdate(prevProps) {
    const { workspace } = prevProps;
    if (workspace && this.props.workspace.id !== workspace.id) {
      this.getTimeEntries();
    }
  }

  getTimeEntries() {
    const { startDate, endDate } = this.state;
    const { workspace } = this.props;
    this.setState({
      isLoading: true
    })
    workspace && Axios.get(`https://api.clockify.me/api/v1/workspaces/${workspace.id}/user/5c2371d1b079871976621e14/time-entries`, {
      params: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      },
      headers: {
        'X-Api-Key': 'XdqcptH3sFUx3ru+',
      }
    }).then((response) => {
      this.setState({
        timeEntries: response.data,
        isLoading: false
      });
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  handleStartDateChange = date => {
    this.setState({
      startDate: new Date(date)
    });
    this.getTimeEntries();
  };

  handleEndDateChange = date => {
    this.setState({
      endDate: new Date(date)
    });
    this.getTimeEntries();
  };

  renderTimeEntries() {
    const { timeEntries, startDate, endDate } = this.state;
    return timeEntries.filter((timeEntry) => {
      const timeEntryDate = new Date(timeEntry.timeInterval.end);
      return timeEntryDate > startDate && timeEntryDate < endDate;
    }).map((timeEntry) => {
      return <>
        <ListItem>
          <TimeEntry
            timeEntry={timeEntry}
          />
        </ListItem>
      </>
    });
  }

  render() {
    const { startDate, endDate, timeEntries, isLoading } = this.state;
    return (
      <Paper>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              autoOk
              margin="normal"
              id="date-picker-inline"
              label="From:"
              value={startDate}
              onChange={this.handleStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              autoOk
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="To:"
              value={endDate}
              onChange={this.handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <Divider />
        <List>
          {isLoading ? <ListItem><CircularProgress style={{ margin: 'auto' }} /></ListItem> : timeEntries.length > 0 ? this.renderTimeEntries() : <ListItem>
            <Typography align="center" color="textSecondary">
              No time entries in selected date interval.
            </Typography>
          </ListItem>}
        </List>
      </Paper>
    )
  }
}

export default CCalculator;