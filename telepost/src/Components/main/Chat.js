import React, { useState, useEffect, useRef } from "react";
import "./Style.css";
import "./chat.css";
import Textbox from "./Textbox";
import EmojiPicker from "emoji-picker-react";
import friendicon from "./friend.png";

export default function Chat(props) {
  const [message, setMessage] = useState("");
  const [displayprop, setDisplayprop] = useState(true);
  const [initdisplay,setInitdisplay] = useState("");
  const [arr,setArr] = useState([]);

  const ref = useRef(null);

  const handlemoji = (emojiData, event) => {
    const text = message + emojiData.emoji;
    setMessage(text);
    ref.current.focus();
  };
  
  // eslint-disable-next-line
  useEffect(() =>{
    if(props.modelname!==""){
      setInitdisplay("none");
      fetch(`${process.env.SERVER_URL}/users/message`,{
        method:"post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelname:props.modelname
        })
      }).then((res) =>{
        return res.json();
      }).then((data) =>{
        setArr(data);
      })
    }
  });

  const handleuser = (str) =>{
    let s = str.charAt(0).toUpperCase() + str.slice(1);
    return s;
  }

  const handlesend = async() =>{
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();
    let noon = "am";
    if(hour >= 12){
      noon = "pm"
    }
    hour %= 12;
    if(hour === 0) 
      hour = 12;
    let datestr=(day<10?"0":"")+day+"/"+(month<10?"0":"")+month+"/"+year+" "+(hour<10?"0":"")+hour+":"+(min<10?"0":"")+min+" "+noon;
    await fetch(`${process.env.SERVER_URL}/users/message/append`,{
      method:"post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        modelname:props.modelname,
        sender:props.sender,
        reciever:props.reciever,
        msg:message,
        time:datestr
      })
    });
    await fetch(`${process.env.SERVER_URL}/users/message`,{
      method:"post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        modelname:props.modelname
      })
    }).then((res) =>{
      return res.json();
    }).then((data) =>{
      setArr(data);
    });
    setMessage("");
  }

  return (
    <div className="grid-item3">
      <div className="initmodal" style={{display:initdisplay}} >
        <div className="modal-container">
          <h1 className="heading">Welcome to TelePost !!! Here you can do chatting with your loved ones</h1>
        </div>
      </div>
      <div className="userhead">
        <img src={friendicon} alt="pic" className="friendpic" />
        <p className="friendname">{handleuser(props.reciever)}</p>
      </div>
      <div className="chat_box">
        {arr.map((ele) =>{
          if(ele.sender===props.sender){
            return <Textbox sender="You" message={ele.message} time={ele.time}/>
          }
          else{
            return <Textbox sender={handleuser(ele.sender)} message={ele.message} time={ele.time}/>
          }
        })}
        <div
          className="emoji_box"
          style={{ display: displayprop ? "none" : "block" }}
          onMouseLeave={() => setDisplayprop(true)}
        >
          <EmojiPicker
            theme="dark"
            onEmojiClick={handlemoji}
            previewConfig={{ showPreview: false }}
            autoFocusSearch={false}
          />
        </div>
      </div>
      <div className="msg_box">
        <i
          className="fa fa-smile-o"
          onClick={() => setDisplayprop(false)}
        ></i>
        <i className="fa fa-paperclip"></i>
        <input
          className="type_msg"
          value={message}
          autoFocus="on"
          ref={ref}
          placeholder="Type a message"
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) =>{
            if(e.key==="Enter"){
              handlesend();
            }
          }}
        />
      </div>
    </div>
  );
}
