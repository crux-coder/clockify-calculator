import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function TimeEntry() {
  return (
    <div>
      <ListItem button>
        <Paper>
          <Typography component="p">
            Paper can be used to build surface or other elements for your application.
                  </Typography>
        </Paper>
      </ListItem>
    </div>
  )
}

export default TimeEntry;
