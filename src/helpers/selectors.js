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

const getInterviewersForDay = function(state, day) {
  if (!day) {
    return [];
  } else if (state.days.length === 0) {
    return [];
  } else {
    const dayArr = state.days.filter(dayObj => dayObj.name === day);
    if (dayArr.length === 0) {return [];};
    const interviewersArr = dayArr[0].interviewers;
    const interviewerObjArr = [];
    for (let i of interviewersArr) {
      interviewerObjArr.push(state.interviewers[i]);
    }
    return interviewerObjArr;
  }

};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };