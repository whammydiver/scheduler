import { useState, useEffect } from "react";
import axios from 'axios';
// import { remainingSpots } from "helpers/remainingSpots";

export default function useApplicationData() {

  function remainingSpots(dayObject, appointments) {
    let count = 0;
    for (let x = dayObject.appointments[0]; x <= dayObject.appointments[4]; x++) {
      if (!appointments[x].interview) {
        count += 1;
      }
      console.log("count in loop: ", count)
    }
    console.log("count: ", count)
    return count;
  }

  function newDays(id, appointments) {
    const dayIndex = Math.floor((id - 1) / 5);
    console.log("state.days[dayIndex]:", state.days[dayIndex]);
    const newDaysArray = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        const spots = remainingSpots(day, appointments)
        return { ...day, spots }
      }
      return day;
    })
    console.log("newDaysArray: ", newDaysArray)
    return newDaysArray;
  }

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

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
