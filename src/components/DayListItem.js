import React from "react";
import "components/DayListItem.scss";
const classnames = require('classnames');


export default function DayListItem(props) {
  
  const formatSpots = function(theProps) {
    if (theProps.spots === 0) {
      return 'no spots remaining';
    } else if (theProps.spots === 1) {
      return '1 spot remaining';
    } else if (theProps.spots === 2) {
      return '2 spots remaining';
    } else {
      return `${theProps.spots} spots remaining`;
    }
  };
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}