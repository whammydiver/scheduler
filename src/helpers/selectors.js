// export function getAppointmentsForDay (state, day) {
//   let appointments = []
//   const dayDetails = [];
//   for (let eachDay of state.days) {
//     if (eachDay.name === day) {
//       appointments = eachDay.appointments
//     }
//   }    
//   for (let apt of appointments) {
//     dayDetails.push(state.appointments[apt])
//   }
 
//   return dayDetails;
// }

export function getAppointmentsForDay (state, day) {
  let appointments = []
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