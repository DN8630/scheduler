import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";


const Appointment = function(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  let errorMsg = "";

  const initialMode = props.interview ? SHOW : EMPTY;
  const {mode, transition, back } = useVisualMode(initialMode);

  //Save an appointment 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    props.bookInterview(props.id,interview)
    .then(() => transition(SHOW))
    .catch((err) => {
      transition(ERROR_SAVE,true)});
  }

  //Deleting an appointment
  function deleteAppointment() {
    transition(DELETING,true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((err) => {
      transition(ERROR_DELETE,true)});
  }

  return (

    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === SHOW && (<Show 
        student={props.interview.student} 
        interviewer={props.interview.interviewer} 
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
        />)
      }
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)}/>)}
      {mode === CREATE && (<Form interviewers={props.interviewers} onSave={save} onCancel={() => back()}/>)}
      {mode === SAVING && (<Status message={"Saving"}/>)}
      {mode === DELETING && (<Status message={"Deleting"}/>)}
      {mode === CONFIRM && (<Confirm 
        message={"Delete the appointment?"} 
        onCancel={() => back()} 
        onConfirm={deleteAppointment}
        />)
      }
      {mode === EDIT && (<Form
        name={props.interview.student} 
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        onSave={save}
        onCancel={() => back()}
        />)
      }
      {mode === ERROR_SAVE && (<Error message={"Could not save the appointment"} onClose={() => back()}/>)}
      {mode === ERROR_DELETE && (<Error message={"Could not cancel the appointment"} onClose={() => back()}/>)}
    </article>
  )
}
export default Appointment;
