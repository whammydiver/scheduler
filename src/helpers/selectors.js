export function getAppointmentsForDay(state, day) {
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

export function getInterviewersForDay(state, day) {
  const dailyInterviewers = [];
  for (let eachDay of state.days) {
    if (eachDay.name === day) {
      for (let eachInterviewer of eachDay.interviewers) {
        dailyInterviewers.push(state.interviewers[eachInterviewer])
      }
    }
  }
  return dailyInterviewers;
}

export function getInterview(state, interview) {
  if (interview) {
    const appointment = {
      "student": interview.student,
      "interviewer": state.interviewers[interview.interviewer]
    }
    return appointment;
  }
  return null;
}
