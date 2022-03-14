import React from 'react';
import './Tag.scss';

export default function Tag(props) {
  return(
    <>
      <button className={`tag ${props.tagValue === props.currentMatchState ? "active" : ""}`} value={props.tagValue} onClick={props.onClick} >
        {props.tagContent}
      </button>
    </>
  )
}