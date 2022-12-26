import React from 'react';
import "./friendstructure.css";
import friendicon from "./friend.png";

export default function Friendstructure(props) {

  const handleclick = () =>{
    let str = props.user;
    let friend = str.charAt(0).toLowerCase() + str.slice(1);
    props.handleclick(friend);
  }

  return (
    <div className='friendstructure' onClick={handleclick}>
      <img src={friendicon} alt="pic" className="friend-pic" />
      <p className='friend-name'>{props.user}</p>
    </div>
  )
}
