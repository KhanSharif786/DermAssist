import React from 'react'
import Howworks from './Homeimages/howwork.jpg'; 
import Howworks2 from './Homeimages/howwork2.png'; 
import Howworks3 from './Homeimages/howwork3.PNG'; 
import './Howworks.css';


export default function Feature() {
  return (
    <> 
    <div className="how-to-block" id="hiw">
      <div className="cont">
        <h1>How to use DermAssist?</h1>
        <div className="list">
          <div className="item">
            <span className="icon">
             <img src={Howworks} alt="" className="image-1" />
            </span>
            <p> <b> Take a photo* </b></p>
            <p> Keep zoomed at the closest distance (less than 10 cm), keep in focus and center only the skin mark (without hair, wrinkles and other objects).</p>
          </div>

          <div className="item">
            <span className="icon">
             <img src={Howworks2} alt="" className="image-1" />
            </span>
            <p> <b> Write the required input* </b></p>
            <p> Send your photo to the Deep Laerning. The system will analyze it and send you a risk assessment.</p>
          </div>

          <div className="item">
            <span className="icon">
             <img src={Howworks3} alt="" className="image-1" />
            </span>
            <p> <b> Know your skin Disease* </b></p>
            <p> Get the result within 60 seconds and related advice on the next steps to take.</p>
          </div>
        </div>
        <p className="small">
            "* Yoy can take a photo on your mobile phone or upload a photo from your gallery."
          </p>
          <p className="small">
            "* You can view results easily."
          </p>

      </div>
        
    </div>
    </>
  )
}