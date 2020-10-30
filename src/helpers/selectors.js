export function getAppointmentsForDay(state, day) {
  let appointments = [];
  if (!state.days) {
    return appointments;
  }
  
  const dayObj = state.days.find(dayItem => dayItem.name === day);
  if (dayObj) {
    appointments = dayObj.appointments.map(item => state.appointments[item])
  }
  return appointments;
  
};
export function getInterview(state, interview) {
  if(!interview) {
    return null;
  } 
  const interviewer = state.interviewers[interview.interviewer];
  const newInterview = {...interview, interviewer};
  return newInterview;

};
export function getInterviewersForDay(state, day) {
  let interviewers = [];
  if (!state.days) {
    return interviewers;
  }
  
  const dayObj = state.days.find(dayItem => dayItem.name === day);
  if (dayObj) {
    interviewers = dayObj.interviewers.map(item => state.interviewers[item])
  }
  return interviewers;
  
};