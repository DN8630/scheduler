import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment"
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {
  
  const [state, setState] = useState({
    currentDay: "Monday",
    days: [],
    appointments: {}
  })

  useEffect(() => {
    // API request to fetch days and appointments
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments'))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));   
    })
    
  },[])

  const setDay = currentDay => setState({ ...state, currentDay });

  const dailyAppointments = getAppointmentsForDay(state, state.currentDay);
  return (
    <main className="layout">
      <section className="sidebar">
      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.currentDay} setDay={day => setDay(day)}>

          </DayList>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {
          dailyAppointments.map(appointment => {
            return <Appointment key={appointment.id} {...appointment}></Appointment>            
          })         
        }
        <Appointment key="last" time="5pm"></Appointment>
      </section>
    </main>
  );
}
