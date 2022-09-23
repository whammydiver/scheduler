import React, { Fragment } from 'react';
import "./styles.scss";
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
import Form from './Form';
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name, 
      interviewer
    };
    props.bookInterview(props.id, interview)
    console.log("id, interview: ", props.id, interview)
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      <Fragment>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && 
          <Form 
            interviewers={props.interviewers}
            onCancel={() => back()}
            onSave={save}
          />
        }
      </Fragment>
    </article>
  )
}