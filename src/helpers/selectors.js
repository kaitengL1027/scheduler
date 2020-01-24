const getAppointmentsForDay = function(state, day) {
  if (!day) {
    return [];
  } else if (state.days.length === 0) {
    return [];
  } else {
    const dayArr = state.days.filter(dayObj => dayObj.name === day);
    if (dayArr.length === 0) return []
    const appointmentsArr = dayArr[0].appointments;
    const appointmentObjsArr = appointmentsArr.map((id) => {
      return state.appointments[id];
    })

    console.log(appointmentObjsArr, "look at me!!!");
    return appointmentObjsArr;
  }
};

const getInterview = function(state, interview) {
  if (!interview) {
    return null;
  } else {
    const interviewerData = state.interviewers[interview.interviewer];
    return { student: interview.student, interviewer: interviewerData};
  }
};

export { getAppointmentsForDay, getInterview };