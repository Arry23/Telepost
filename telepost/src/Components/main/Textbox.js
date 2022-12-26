import React from "react";
import { useState } from "react";
import "./textbox.css";

export default function Textbox(props) {
  let classtyle;
  if(props.sender === "You"){
    classtyle = "textbox2 notch2";
  } 
  else{
    classtyle = "textbox1 notch1";
  }

  return (
    <>
      <div className={classtyle}>
        <div className="textbox-header">{props.sender}</div>
        <div>
          {props.message}
          <div className="textime">{props.time}</div>
        </div>
      </div>
    </>
  );
}
