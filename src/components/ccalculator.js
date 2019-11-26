import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import TimeEntry from './time.entry';
import Axios from 'axios';


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

  renderTimeEntries() {
    const { timeEntries } = this.state;
    return timeEntries.map((timeEntry) => <ListItem><TimeEntry
      timeEntry={timeEntry}
    />
    </ListItem>);
  }

  render() {
    return (
      <Typography>
        <List>
          {this.renderTimeEntries()}
        </List>
        <Divider />
      </Typography>
    )
  }
}

export default CCalculator;