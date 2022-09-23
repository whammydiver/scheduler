export function getAppointmentsForDay (state, day) {
  const dayDetails = [];
  for (let eachDay of state.days) {
    if (eachDay.name === day) {
      for (let eachAppointment of eachDay.appointments) {
       dayDetails.push(state.appointments[eachAppointment])
      }
    }
  }
  return dayDetails;
}

export function getInterview(state, interview) {
  console.log("!! This is something", state);
  let appointment;
  if (!interview) {
    return null;
  } else {
    console.log("## This is something", interview);
    appointment = {
      "student": interview.student,
      "interviewer": state.interviewers[interview.interviewer]
    }
    console.log("appointment", appointment);
    return appointment;
  }
}