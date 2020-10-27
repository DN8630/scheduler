import React from 'react';
import classNames from 'classnames';
import  './InterviewerListItem.scss';

const InterviewerListItem = function (props){
  const interviewerClass = classNames("interviewers__item",
  {"interviewers__item--selected": props.selected},
  {"interviewers__item--selected-image": props.selected && props.avatar}
  )
  console.log({interviewerClass});
  return (
    <li className={interviewerClass} id={props.id} onClick={props.setInterviewer}>
      <img className={"interviewers__item-image"}
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}  
    </li>
  )

}


export default InterviewerListItem;