import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import chatlogo from "./chatlogo.png";
import "./register.css";

export default function Register() {
  const [classname, setClassname] = useState("flip-card-inner1");
  // const [access,setAcess] = useState("This username is not available");

  const [loginu, setLoginu] = useState("");
  const [loginp, setLoginp] = useState("");

  const [createu, setCreateu] = useState("");
  const [createp, setCreatep] = useState("");

  const navigate = useNavigate();

  const loginhandler = async () => {
    let x = {
      username: loginu,
      password: loginp,
    };

    const data = await fetch(`${process.env.SERVER_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(x),
    });
    const jsondata = await data.json();
    // console.log(jsondata.status);

    if (jsondata.status) {
      navigate("user", { state: loginu  });
    } else {
      alert("Invalid username or password");
    }
  };

  const createacchandler = async() => {
    let x = {
      username:createu,
      password:createp
    }

    const data = await fetch(`${process.env.SERVER_URL}/users`,{
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(x)
    });
    const jsondata = await data.json();
    if(jsondata.status){
      alert("Your account have succefully created!!!");
      navigate("user" , {state : createu});
    }
    else{ 
      alert("This username has been already taken, try another one.");
    }
  };

  return (
    <div className="flip-card">
      <div className={classname}>
        <div className="loginstyle front">
          <img src={chatlogo} alt="chatlogo" className="chatlogo" />
          <h3 className="welcomemsg">
            Welcome!!! Just login here and start chatting.
          </h3>
          <input
            placeholder="Username"
            value={loginu}
            onChange={(e) => setLoginu(e.target.value)}
            type="text"
            className="credarea"
          />
          <input
            placeholder="Password"
            value={loginp}
            onChange={(e) => setLoginp(e.target.value)}
            type="password"
            className="credarea"
          />
          <div className="login-and-create">
            <button className="loginbutton" onClick={loginhandler}>
              Login
            </button>
            <p
              className="createaccount"
              onClick={() => {
                setClassname("flip-card-inner2");
              }}
            >
              Create account?
            </p>
          </div>
        </div>
        <div className="loginstyle back">
          <img src={chatlogo} alt="chatlogo" className="chatlogo" />
          <p className="welcomemsg">
            Don't have account !!! Don't worry, it will take few minutes only to
            create a new account.
          </p>
          <input
            placeholder="Username"
            value={createu}
            onChange={(e) => setCreateu(e.target.value)}
            type="text"
            className="credarea"
          />
          <input
            placeholder="Password"
            value={createp}
            onChange={(e) => setCreatep(e.target.value)}
            type="password"
            className="credarea"
          />
          <div className="login-and-create">
            <button className="createbutton" onClick={createacchandler}>
              Create Account
            </button>
            <p
              className="createaccount"
              onClick={() => {
                setClassname("flip-card-inner3");
              }}
            >
              Already have account?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
