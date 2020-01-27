import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";


export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "",
    days: [],
    appointments: {
      "1": {
        id: 1, 
        time: "12pm", 
        interview: null
      }
    },
    interviewers: {}
  });

  // const [state, setState] = useState({
  //   day: "",
  //   days: [],
  //   appointments: {
  //     "1": {
  //       id: 1, 
  //       time: "12pm", 
  //       interview: null
  //     }
  //   },
  //   interviewers: {}
  // });

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value};
      case SET_APPLICATION_DATA:
        return {...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers};
      case SET_INTERVIEW:
        return { ...state, appointments: action.value};
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  useEffect(() => {

    Promise.all([
    axios.get("/api/days"), 
    axios.get("/api/appointments"),
    axios.get("/api/interviewers")
    ]).then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      dispatch({type: SET_APPLICATION_DATA, days: days, appointments: appointments, interviewers: interviewers});
    });
  }, []);
  
  const setDay = day => dispatch({type: SET_DAY, value: day});
  
  const bookInterview = (id, interview) => {
        
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.put(`/api/appointments/${id}`, appointment)
    .then((res) => {
      console.log(res);
      dispatch({type: SET_INTERVIEW, value: appointments});
    });
  };
  
  const cancelInterview = (id) => {
    
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      console.log(res);

      dispatch({type: SET_INTERVIEW, value: appointments});
    });
  };

  return { state, setDay, bookInterview, cancelInterview, useEffect };
}