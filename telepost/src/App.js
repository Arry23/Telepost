// import logo from "./logo.svg";
import "./App.css";
import Register from "./Components/register/Register";
import Main from "./Components/main/Main";
import {
  BrowserRouter as Router, 
  Routes , 
  Route
} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route exact path="/" element={<Register/>}/>
            <Route exact path="/user" element={<Main/>}/>
          </Routes>
      </Router>
    </>
  );
}

export default App;
