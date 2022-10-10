import React from "react";
import DayList from "./DayList";

import "components/Application.scss";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application() {

  // calls the useApplicationData function to set state and make available functions to be passed as props to components. 
  // state includes server information about existing apointments and interviewer schedules to be transformed into
  // accurate selection options for students booking appointments through this app. 

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // builds interviewer arrays specific to each day
  const interviewers = getInterviewersForDay(state, state.day)

  // builds appointments for the selected day
  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />)
    })

  // returns and renders the sidebar day options and appointments for the selected day.   
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
