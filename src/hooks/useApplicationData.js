import { useState, useEffect } from "react";
import axios from 'axios';
// import { remainingSpots } from "helpers/remainingSpots";

export default function useApplicationData() {

  // updated spots remaining counter in each day element
  function remainingSpots(dayObject, appointments) {
    let count = 0;
    for (let x = dayObject.appointments[0]; x <= dayObject.appointments[dayObject.appointments.length - 1]; x++) {
      if (!appointments[x].interview) {
        count += 1;
      }
    }
    return count;
  }

  // rebuilds state mapping of a given day's appointments after one is created or deleted
  function newDays(id, appointments) {
    const newDaysArray = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        const spots = remainingSpots(day, appointments)
        return { ...day, spots }
      }
      return day;
    })
    return newDaysArray;
  }

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  // **** primary API call to server to update state with current server data
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  // books interview through API call to server and updates application state to reflect server details.
  const bookInterview = function (id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        const days = newDays(id, appointments);
        setState(prev => ({ ...prev, appointments, days }));
      })
  }

  // cancels interview through API call to server and updates application state to reflect server details.
  const cancelInterview = function (id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        const days = newDays(id, appointments);
        setState(prev => ({ ...prev, appointments, days }))
      })
  }

  return { state, setDay, bookInterview, cancelInterview }
}
