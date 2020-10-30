import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";

const Appointment = function(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const initialMode = props.interview ? SHOW : EMPTY;
  const {mode, transition, back } = useVisualMode(initialMode);
 
  return (

    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer}/>)}
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)}/>)}
      {mode === CREATE && (<Form interviewers={[]} onCancel={() => back()}/>)}
    </article>
  )
}
export default Appointment;
