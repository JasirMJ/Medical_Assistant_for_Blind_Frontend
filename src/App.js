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

import { BrowserRouter as Router, Route, Routes,Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

import QRCode from "react-qr-code";

const fe_domain_or_ip = "http://192.168.142.142:3000"
const be_domain_or_ip = "http://192.168.142.142:8000"


const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/medicine/:id" element={<MedicinePage/>}/>
          <Route exact path="/scan-medicine/:id" element={<MedicinePage/>}/>
          <Route exact path="/home" element={<HomePage/>}/>
          <Route exact path="/" element={<HomePage/>}/>

          <Route path="*" element={<NotFound/>}/>
        </Routes>
    </Router>
  );
}
export default App;

function HomePage(){
  const [medicines, setMedicines] = useState([]);
  const [status, setStatus] = useState("idle");
  useEffect(() => {
    setStatus("loading");
    getmedicines()
  }, [])
  const getmedicines = ()=>{
    setStatus("API calling "+be_domain_or_ip);

    var config = {
      method: 'get',
      url: be_domain_or_ip+ '/medicine',
      headers: {}
    };
    setStatus("API calling "+config.url);
    axios(config)
    .then(function (response) {
      setMedicines(response.data)
      setStatus("success")
    })
    .catch(function (error) {
      console.log(error);
      setStatus(error);
    })
    .finally(function () {
      // always executed
      setStatus("Completed");
    } )

  }
  return (
    <div>
    <div className="header">
      <h1>Medical</h1>

    </div>
    <div className="container">
    <br/>
      <small>status : {status}</small>
      {medicines.map((medicine) =>  <div className="content">
      <div  className="text2">
        <QRCode size={50} value={fe_domain_or_ip + "/scan-medicine/"+medicine.id} />
        </div>  
        <div className="text1">
          {medicine.name}
        </div>
        <Link  className="text2" to="/medicine/1">
          view
        </Link>

      </div>
      )}
      
     
    </div>
  </div>
  )
}



function MedicinePage() {
  const [medicine, setMedicine] = useState({
    "id":"",
    "name":"",
    "dosage":"",
    "side_effects":"",
    "interaction_with_other_medicines":"",
    "special_concerns":""
  });

  // get medicine id from url
  const id = useParams().id;

  useEffect(() => {
    let path = window.location.pathname;
    getmedicine();
    path.includes('scan')&&getvoiceovers();
  }, [])

  const getmedicine = ()=>{
    

   var config = {
      method: 'get',
      url:be_domain_or_ip + '/medicine/'+id,
      headers: {}
    };
    console.log("URL: "+config.url)

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setMedicine(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const getvoiceovers = ()=>{

   var config = {
      method: 'get',
      url:be_domain_or_ip + '/qr-code/?medicine_id='+id,
      headers: {}
    };
    console.log("URL: "+config.url)

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <>
      <div>
        <div className="header1">
          <Link to="/home">Back</Link>
          </div>
        <div className="data">
          <form>
            <span htmlFor="name"> Name: {medicine.name}</span><br />
            <span htmlFor="name"> Dosage: {medicine.dosage}</span><br />
            <span htmlFor="name"> Side effects: {medicine.side_effects}</span><br />
            <span htmlFor="name"> Interactions: {medicine.interaction_with_other_medicines}</span><br />
            <span htmlFor="name"> Special Concerns: {medicine.special_concerns}</span><br />
            <QRCode value={fe_domain_or_ip + "/scan-medicine/"+id} />
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

