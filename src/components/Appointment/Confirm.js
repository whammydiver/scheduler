import React from 'react';
import Button from "../Button";

// conditionally rendered tile to confirm or cancel an appointment delete request

export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button onClick={props.onCancel} danger>Cancel</Button>
        <Button onClick={() => props.onDelete(props.id)} danger>Confirm</Button>
      </section>
    </main>
  )
}