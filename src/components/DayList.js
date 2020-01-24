import React from "react";
import DayListItem from 'components/DayListItem';

/*
props: 
days:Array (a list of day objects (each object includes an id, name, and spots))
day:String (the currently selected day)
setDay:Function (accepts the name of the day eg. "Monday", "Tuesday")
*/

export default function DayList(props) {
  // the day here refers to dayData from looping thru props.days.map, props.day is the current day selected

  return (
    <ul>
      {props.days.map(day => (
        <DayListItem 
          key={day.id}
          name={day.name} 
          spots={day.spots} 
          selected={day.name === props.day}
          setDay={props.setDay}
        />
      ))}
    </ul>
  );
}