import React from "react";
import classNames from "classnames";
import  "./InterviewerListItem.scss";

const InterviewerListItem = function (props){
  const interviewerClass = classNames("interviewers__item",
  {"interviewers__item--selected": props.selected},
  {"interviewers__item--selected-image": props.selected && props.avatar}
  )
  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img className={"interviewers__item-image"}
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}  
    </li>
  )

}


export default InterviewerListItem;