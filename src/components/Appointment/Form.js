import React,{ useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const Form = function(props) {
// Adding state to form
const [name, setName] = useState(props.name || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);
const [error,setError] = useState("");

// Reset function to clear inputs on Cancel action
function reset(){
  setName("");
  setInterviewer(null);
}
function cancel(){
  reset();
  props.onCancel();
}
function validate() {
  if (name === "") {
    setError("Student name cannot be blank");
    return;
  }

  setError("");
  props.onSave(name, interviewer);
}

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          /*
            This must be a controlled component
          */
         value={name}
         onChange={(event) => setName(event.target.value)}
         data-testid={"student-name-input"}
        />
      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger 
          onClick={cancel}>
          Cancel
          </Button>
        <Button confirm 
          // onClick={props.onSave()}
          // onClick={() =>props.onSave(name,interviewer)}>
          onClick={() => validate()}>
          Save
          </Button>
      </section>
    </section>
</main>
  )
}

export default Form;