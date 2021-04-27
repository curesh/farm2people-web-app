import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
});

export default function LandingScreen() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Landing Screen</h1>
    </div>
  );
}
