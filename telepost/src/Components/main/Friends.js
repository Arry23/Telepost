import React,{ useState,useEffect } from 'react';
import Friendstructure from './Friendstructure';
import "./Style.css";

export default function Friends(props) {
  const [arr,setArr] = useState([]);

  useEffect(() =>{
    fetch(`${process.env.SERVER_URL}/users`).then((res) =>{
      return res.json();
    }).then((data) =>{
      setArr(data);
    })
  },[]);

  const handleuser = (str) =>{
    let s = str.charAt(0).toUpperCase() + str.slice(1);
    return s;
  }

  function handleclick(reciever){
    props.handlereciever(reciever);
  }

  return (
    <div className='grid-item2'>
      {
        arr.map((ele) =>{
          if(ele.username !== props.sender){
            return <Friendstructure user={handleuser(ele.username)} handleclick={handleclick}/>
          }
        })
      }
    </div>
  )
}
