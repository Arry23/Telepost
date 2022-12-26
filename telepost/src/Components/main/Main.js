import React,{ useEffect, useState } from 'react';
import "./Style.css";
import Info from "./Info";
import Friends from "./Friends"
import Chat from "./Chat";
import { useLocation, useNavigate } from 'react-router-dom';


export default function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sender,setSender] = useState("");

  useEffect(() =>{
    if(location.state===null){
      navigate('/');
    }
    else{
      setSender(location.state);
    }
  },[])

  const [reciever,setReciever] = useState("");
  const [modelname,setModelname] = useState("");

  const handlereciever = (rec) =>{
    setReciever(rec);
    if(rec<sender){
      setModelname(sender+"and"+rec);
    }
    else{
      setModelname(rec+"and"+sender);
    }
  }

  return (
    <div className='grid-container'>
      <Info sender={sender} />
      <Chat sender={sender} reciever={reciever} modelname={modelname} />
      <Friends sender={sender} reciever={reciever} handlereciever={handlereciever} />
    </div>
  )
}



