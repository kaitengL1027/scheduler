import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "reducers/application";



export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
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

    const dayID = Math.ceil(id / 5) - 1;

    let spotRemaining = null;
    if (state.appointments[id].interview === null) {
      spotRemaining = state.days[dayID].spots - 1;
    } else {
      spotRemaining = state.days[dayID].spots;
    }

    const dayData = {...state.days[dayID], spots: spotRemaining};

    const days = [...state.days];

    days[dayID] = dayData;
  
    return axios.put(`/api/appointments/${id}`, appointment)
    .then((res) => {
      console.log(res);
      dispatch({type: SET_INTERVIEW, value: appointments, days: days});
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

    const dayID = Math.ceil(id / 5) - 1;

    const spotRemaining = state.days[dayID].spots + 1;

    const dayData = {...state.days[dayID], spots: spotRemaining};

    const days = [...state.days];

    days[dayID] = dayData;
  
    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      console.log(res);

      dispatch({type: SET_INTERVIEW, value: appointments, days: days});
    });
  };

  return { state, setDay, bookInterview, cancelInterview, useEffect };
}