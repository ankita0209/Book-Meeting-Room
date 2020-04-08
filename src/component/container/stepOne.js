import React, { useState } from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextInput from '../common/input';
import Button from '../common/button';
import DropDown from '../common/dropdown';
import { submitStepOne } from '../actions/stepAction';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const StepOneForm = (props) => {
  return (
      <PersonForm {...props} />
  );
}

const PersonForm = (props) => {
  const classes = useStyles();
  const [room, setRoom] = useState('R1');
  const [name, setName] = useState('');
  const [descr, setDescr] = useState('');
  

  const handleChange = (event) => {
    if (event.target.id === 'room') {
      setRoom(event.target.value);
    }
    if (event.target.id === 'name') {
      setName(event.target.value);
    }
    if (event.target.id === 'des') {
      setDescr(event.target.value);
    }
  };

  const handleNext = () => {
    const data = {
      room: room,
      name: name,
      description: descr
    }
    props.submitStepOne(data);
    props.history.push('step-2');
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DropDown id='room' label='Meeting Room' value={room} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextInput id='name' label='Name' placeholder='Enter Your Name' value={name} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextInput id='des' type='text' label='Meeting Description' placeholder='Enter Meeting Description' value={descr} onChange={handleChange} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {name && descr ? <Button variant='contained' label='Next' onSubmit={handleNext} /> : null}
      </Grid>
    </div>
  );
}

export default connect(
  null,
  { submitStepOne }
)(StepOneForm);
