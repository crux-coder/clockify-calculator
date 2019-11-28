import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Axios from 'axios';
import TimeEntry from './time.entry';


class CCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeEntries: []
    }

    this.renderTimeEntries = this.renderTimeEntries.bind(this);
  }

  componentDidMount() {
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

  handleDateChange = date => {
    console.log(date);
  };

  renderTimeEntries() {
    const { timeEntries } = this.state;
    return timeEntries.map((timeEntry) =>
      <>
        <ListItem>
          <TimeEntry
            timeEntry={timeEntry}
          />
        </ListItem>
      </>);
  }

  render() {
    return (
      <Typography>
        <Typography>
          Range:
          </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            autoOk
            margin="normal"
            id="date-picker-inline"
            label="Start date"
            value={new Date()}
            onChange={this.handleDateChange}
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
            label="End date"
            value={new Date()}
            onChange={this.handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <Divider />
        <List>
          {this.renderTimeEntries()}
        </List>
      </Typography>
    )
  }
}

export default CCalculator;