import React, { Fragment } from 'react';
import "./styles.scss";
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";

export default function Appointment(props) {
  console.log(props);
  return (
    <article className="appointment">
      <Header time={props.time} />
      <Fragment>
        {props.interview ?
          <Show student={props.interview.student} interviewer={props.interview.interviewer}/>
          :
          <Empty />
        }
      </Fragment>
    </article>
  )
}