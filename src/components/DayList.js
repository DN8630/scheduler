import React from 'react';
import DayListItem from './DayListItem';


const DayList = function(props) {
  const dayListItems = props.days.map((day)=> {
    return <DayListItem 
    key={day.id}
    name={day.name} 
    spots={day.spots}
    selected={day.name === props.day}
    setDay={props.setDay}>

    </DayListItem>
  })

return <ul>
 {dayListItems}
</ul>
};

export default DayList;