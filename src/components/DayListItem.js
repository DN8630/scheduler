import React from 'react';
import classNames from 'classnames';
import 'components/DayListItem.scss';

const DayListItem = (props) => {
  const dayClass = classNames(
    "day-list__item", 
    { "day-list__item--selected": props.selected,
      "day-list__item--full": props.spots === 0
  }
  );
  const formatSpots = function(props) {
    const spots = props.spots;
    let formattedSpots = "";
    if (spots === 0) {
      formattedSpots = "no spots remaining";
    } else if (spots === 1) {
      formattedSpots = "1 spot remaining";
    } else {
      formattedSpots = `${spots} spots remaining`;
    }
    return formattedSpots;
  }
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  )
};
 export default DayListItem;

