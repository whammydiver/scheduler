import React, { Fragment } from "react";
import "./styles.scss";
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

// this file manages the conditional rendering of each appointment component based on the transition
// status. Ensures the correct progression from empty/reserved item -> add/edit item -> save/cancel 
// components as required. 

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function cancel(id) {
    transition(DELETING);
    props.cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      <Fragment>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
            id={props.id}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={() => back()}
            onSave={save}
          />
        )}
        {mode === EDIT && (
          <Form
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={() => back()}
            onSave={save}
          />
        )}
        {mode === CONFIRM && (<Confirm onCancel={() => back()} onDelete={cancel} id={props.id} message="Are you sure you want to cancel this appointment?" />)}
        {mode === SAVING && (<Status message="Saving..." />)}
        {mode === DELETING && (<Status message="Deleting..." />)}
        {mode === ERROR_SAVE && (<Error onClose={() => props.interview ? transition(SHOW) : transition(EMPTY)} message="Failed to save appointment. Please try again." />)}
        {mode === ERROR_DELETE && (<Error onClose={() => transition(SHOW)} message="Failed to delete appointment. Please try again." />)}
      </Fragment>
    </article>
  );
}
