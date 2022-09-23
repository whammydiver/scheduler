import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import axios from 'axios';

import "components/Application.scss";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  let dailyAppointments = [];

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      console.log('appointments', all[1].data)
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  dailyAppointments = getAppointmentsForDay(state, state.day)

  const appointmentsArray = dailyAppointments.map((appointment) => {
    console.log("appointment.interview (app.js)", appointment.interview)
    const interview = getInterview(state, appointment.interview);
    return (<Appointment key={appointment.id} {...appointment} interview={interview}/>)
  })
  appointmentsArray.push(<Appointment key="last" time="5pm" />);

  

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
        {appointmentsArray}
      </section>
    </main>
  );
}
