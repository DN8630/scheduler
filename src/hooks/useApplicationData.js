import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAppointmentsForDay } from "../helpers/selectors"

function useApplicationData() {

  const [state, setState] = useState({
    currentDay: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    // API request to fetch days and appointments
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));   
    })
    
  },[])

  const setDay = currentDay => setState({ ...state, currentDay });

  //Updating the spots
  // const selectedDayAppointments = getAppointmentsForDay(state, state.currentDay);
  // const spotsLeft = selectedDayAppointments.filter(appointment => appointment.interview === null).length;
  // const days = state.days.map(day => {
  //   if(day.name === state.currentDay){
  //     day.spots = spotsLeft;
  //   }
  //   return day;
  // })
  // useEffect(() => {
  //   setState(prev => prev,days);
  // },[])


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const day = state.days.find(day => day.appointments.includes(id));
    const newDay = {...day, spots: day.spots - 1};
    const days = state.days.map(dayItem => {
      if(dayItem.id === newDay.id) {  
        return newDay;
      } else {
        return dayItem;
      }
     });

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => setState({
        ...state,
        appointments,days
      })

    )
    // .catch((err) => console.log(err.message));
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview : null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    const day = state.days.find(day => day.appointments.includes(id));
    const newDay = {...day, spots: day.spots + 1};
    const days = state.days.map(dayItem => {
      if(dayItem.id === newDay.id) {  
        return newDay;
      } else {
        return dayItem;
      }
     });
    return axios.delete(`/api/appointments/${id}`)
    .then(() => setState({
      ...state, 
      appointments,days }))
    // .catch((err) => console.log(err.message));
  };

  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;