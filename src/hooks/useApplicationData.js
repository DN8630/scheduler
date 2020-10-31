import { useState, useEffect } from 'react';
import axios from 'axios'

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

  // Book an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => setState({
        ...state,
        appointments
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
    return axios.delete(`/api/appointments/${id}`)
    .then(() => setState({
      ...state, 
      appointments}))
    // .catch((err) => console.log(err.message));
  };

  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;