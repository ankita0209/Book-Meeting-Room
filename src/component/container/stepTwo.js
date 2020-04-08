import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { connect } from "react-redux";
import Button from '../common/button';
import CustomCalender from '../common/calender';
import { SubmitBooking } from '../actions/stepAction';

import { timing } from '../mock/constant';
import './style.css';

function StepTwo(props) {
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectTime = (time) => {
    setSelectedTime(time);
  }
  const createEvent = () =>{
    const startTime = moment(moment(new Date(selectedDate)).format("YYYY-MM-DD") + " " + selectedTime).format();
    const endTime = moment(moment(startTime)).add(30, 'minutes').format();

    const event = {
      'location': 'IND',
      'description': `${props && props.stepOneData && props.stepOneData.stepOneData && props.stepOneData.stepOneData.description}`,
      'start': {
        'dateTime': startTime,
        'timeZone': 'GMT+5:30'
      },
      'end': {
        'dateTime': endTime,
        'timeZone': 'GMT+5:30'
      },
      'attendees': []
    };
    const gapi = window['gapi'];
    function start() {
      gapi.client.init({
        'apiKey': 'AIzaSyCpZBWBcMkq6nHpf9Lc5rgA_qtCYZ4JGZQ',
        'clientId': '1063212339658-7455e4kdirkhgp91kfcdfm9b665uvc6v.apps.googleusercontent.com',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar"
      }).then(async function() {
            const googleAuth = gapi.auth2.getAuthInstance()
            const googleUser = await googleAuth.signIn();
            const token = googleUser.getAuthResponse().id_token;
            console.log(googleUser)
            const request = gapi.client.calendar.events.insert({
              'calendarId': 'primary',
              'resource': event
            });
            request.execute(function(event) {
              alert(`Your meeting is booked and event is created in your google calendar. Go to ${event.htmlLink}`)
            });
      })
    }
    gapi.load('client:auth2', start)
  }
  const submitBooking = () => {
    createEvent()
  }
  const handleChange = (event) => {
    setSelectedDate(event)
  }

  return (
    <div className='root' id='booking'>
      <Grid item xs={12}>
        <h4>Select Your Date</h4>
      </Grid>
      <Grid item xs={12}>
        <CustomCalender id='date-picker' handleDateChange={handleChange} selectedDate={selectedDate} />
      </Grid>
      <Grid item xs={12}>
        <h4>Please select your preffered slot</h4>
      </Grid>
      {timing.map((item, i) => (
        <div key={i} className='time-selection' onClick={() => selectTime(item.value)}>
          <span>{item.time}</span>
        </div>
      ))}
      <Grid item xs={12}>
        <Button id='bookAppointment' label='Book Appointment' onSubmit={submitBooking} />
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    stepOneData: state.stepOneReducer
  }
}

export default connect(
  mapStateToProps,
  { SubmitBooking }
)(StepTwo);
