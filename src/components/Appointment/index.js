import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";


const Appointment = function(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";

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
    .catch((err) => console.log(err));
  }

  //Deleting an appointment
  function deleteAppointment() {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((err) => console.log(err.message));
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
        onCancel={() => back()}/>)}
    </article>
  )
}
export default Appointment;
