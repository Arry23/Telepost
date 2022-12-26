import React from "react";
import "./Style.css";
import "./info.css";
import profilepic from './profilepic.png'

export default function Info(props) {
  const handleusername = (str) =>{
    let s=str.charAt(0).toUpperCase() + str.slice(1);
    return s;
  }

  return (
    <>
      <div className="grid-item1">
        <img className="profile-pic" src={profilepic} alt="pic"></img>
        <p className="username">{handleusername(props.sender)}</p>
      </div>
    </>
  );
}
