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

const localip = "192.168.146.142"

const fe_domain_or_ip = "http://"+localip+":3000"
const be_domain_or_ip = "http://"+localip+":8000"


const App = () => {
  const [name, setName] = useState("")
  useEffect(() => {
    console.log("App.js useEffect")
  }, [name])

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
    // console.log("Home page useeffect")
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
      {medicines.map((medicine,index) =>  <div className="content">
      <div  className="text2">
        
        {/* <QRCode size={50} value={fe_domain_or_ip + "/medicine/"+medicine.id} /> */}
        {index%2==0&&<QRCode size={50} value={be_domain_or_ip + "/medicine/"+medicine.id} />}
        {index%2!=0&&<Link  className="text2" to={'/medicine/'+medicine.id}>
          view
        </Link>}
        {/* <QRCode size={50} value={"http://192.168.146.142:8000/medicine/1"} /> */}
        {/* http://192.168.146.142:8000/medicine/1 */}
        {/* http://192.168.146.142:8000/medicine/1 */}
        </div>  
        <div className="text1">
          {medicine.name}
        </div>
        {index%2==0&&<Link  className="text2" to={'/medicine/'+medicine.id}>
          view
        </Link>}
        {index%2!=0&&<QRCode size={50} value={be_domain_or_ip + "/medicine/"+medicine.id} />}

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

  const [reminders, setReminders] = useState([]);

  const [count, setCount] = useState(0);

  // get medicine id from url
  const id = useParams().id;
  useEffect(() => {
    let path = window.location.pathname;
    getmedicine();
    path.includes('scan')&&getvoiceovers();
    console.log("useeffect")
    getreminders();
  }, [])

  const getmedicine = ()=>{
   var config = {
      method: 'get',
      url:be_domain_or_ip + '/medicine/'+id,
      headers: {}
    };
    console.log("URL: "+config.url)
// debugger

      axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        setMedicine(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    
    
  }

  const getvoiceovers = async()=>{
   var config = {
      method: 'get',
      url:be_domain_or_ip + '/qr-code/?medicine_id='+id,
      headers: {}
    };
    console.log("URL: "+config.url)
    console.log("getvoiceovers calling" )

    axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const getreminders = async()=>{
    var config = {  
      method: 'get',
      url:be_domain_or_ip + '/reminder-records/',
      headers: {}
    };
    console.log("URL: "+config.url)
    console.log("getreminders calling" )

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setReminders(response.data)
        sendReminders(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const sendReminders = async(reminder_data)=>{
    // take current time
    var date = new Date();

  let msg = "";

    // reminders.map((reminder)=>{
      for(let i=0;i<reminder_data.length;i++){
        msg += "Reminder for "+reminder_data[i].medicine.name +" at ";
        if(reminder_data[i].morning == true){
          msg += " morning";
          console.log("morning added")
        }
        if(reminder_data[i].noon == true){
          msg += " afternoon";
          console.log("afternoon added")
        }
        if(reminder_data[i].evening == true){
          msg += "  evening";
          console.log("evening added")
        }
        if(reminder_data[i].night == true){
          msg += " night";
          console.log("night added")
        }
      }

    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    // if (date.getHours() > 0 && date.getHours() < 12) {
    //   console.log("morning reminder for medicine")
    // }
    // else if (date.getHours() >12 && date.getHours() < 16) {
    //   console.log("afternoon reminder for medicine")
    // }
    // else if (date.getHours() > 16 && date.getHours() < 20) {
    //   console.log("evening reminder for medicine")
    // }
    // else if (date.getHours() > 20 && date.getHours() < 24) {
    //   console.log("night reminder for medicine")
    // }
    console.log("reminder msg: "+msg)

    var FormData = require('form-data');
    var data = new FormData();
    data.append('text',msg);

    var config = {
      method: 'post',
      url:be_domain_or_ip + '/reminder-alert/',
      headers: {},
      data: data
    };
    console.log("URL: "+config.url)
    console.log("sendReminders calling : "+msg )

    if (msg != "") {
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    })
  }




  }
  return (
    <>
      <div>
        <div className="header1">
          <div className='reminder'>
            {reminders.length>0&&reminders.map((reminder) => <span className='reminder-box'>
            {reminder.medicine.name}
              <br/>
              {reminder.morning&&"morning(8AM to 12PM)"}
              {reminder.noon&&"afternoon(12PM to 4PM)"}
              {reminder.evening&&"evening(4PM tp 8PM) "}
              {reminder.night&&"night(8PM to 12AM)"}

            </span>
            
          )}
            
          </div>
          <Link to="/home">Back</Link>
          </div>
        <div className="data">
          <form>
            <span htmlFor="name"> Name: {medicine.name}</span><br />
            <span htmlFor="name"> Dosage: {medicine.dosage}</span><br />
            <span htmlFor="name"> Side effects: {medicine.side_effects}</span><br />
            <span htmlFor="name"> Interactions: {medicine.interaction_with_other_medicines}</span><br />
            <span htmlFor="name"> Special Concerns: {medicine.special_concerns}</span><br />
            {/* <QRCode style={{height:'300px'}} value={fe_domain_or_ip + "/scan-medicine/"+id} /> */}
            {/* <QRCode style={{height:'300px'}} value={be_domain_or_ip + "/medicine/"+id} /> */}
        <QRCode size={100} value={be_domain_or_ip + "/medicine/"+medicine.id} />

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

