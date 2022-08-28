import logo from './logo.svg';
import './App.css';
// import Dictaphone from './SpeechToText';
// import SpeechToText2 from './SpeechToText2';
// import {
//   BrowserRouter as Router,
//   Routes ,
//   Route,
//   Link
// } from "react-router-dom";

import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom'

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/medicine/:id" element={<MedicinePage/>}/>
          <Route exact path="/home" element={<HomePage/>}/>
          <Route exact path="/" element={<HomePage/>}/>

          <Route path="*" element={<NotFound/>}/>
        </Routes>
    </Router>
  );
}
export default App;

function HomePage(){
  return (
    <div>
    <div className="header">
      <h1>Medical</h1>
    </div>
    <div className="container">
      <div className="content">
        <div className="text1">
          Paracetamol
        </div>
        <Link  className="text2" to="/medicine/1">
          view
        </Link>
      </div>
     
    </div>
  </div>
  )
}



function MedicinePage() {
  return (
    <>
      <div>
        <div className="header1">
          <Link to="/home">Back</Link>
          </div>
        <div className="data">
          <form>
            <label htmlFor="name"> Name:</label><br />
            <input type="text" id="question" style={{ fontSize: 30 }} /><br />
            <label htmlFor="question">Question:</label>
            <div>
              <input type="button" defaultValue="Yes" className="btn" />
              <input type="button" defaultValue="No" className="btn" />
            </div>
          </form>
        </div>
      </div>
    </>
  )


}

function NotFound() {
  return (
    <>
      <div>
        <div className="header1">
        <Link to="/home">Back</Link>

          </div>
        <div className="data">
          <form>
           <div>Not Found</div>
          </form>
        </div>
      </div>
    </>
  )


}

