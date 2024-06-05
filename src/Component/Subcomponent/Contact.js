import "../../ComponentStyle/SubcomponentStyle/Contact.css";

import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";
import { SocialMediaWrapper } from "../Afooter";

import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import PopUpSuccess from "../../Logos/PopUpSuccess.svg";

const icon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});

const SimpleMap = () => {
  const mapRef = useRef(null);
  const latitude = 47.73064;
  const longitude = 7.31024;
  const position = [latitude, longitude];

  return (
    <div className="map-wrapper">
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        ref={mapRef}
        style={{ height: "18.75em", width: "28.125em", borderRadius: "0.9375em" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>ENSISA Mulhouse</Popup>
        </Marker>
      </MapContainer>
      <p>12 Rue des Frères Lumière, 68093 Mulhouse</p>
      <SocialMediaWrapper />
    </div>
  );
};

const ContactForm = ({ handler }) => {
  return (
    <form className="contact-form" onSubmit={handler}>
      <h1 className="h1Contact">Contact us :</h1>
      <div>
        <input type="text" placeholder="First Name"></input>
        <input type="text" placeholder="Last Name"></input>
      </div>
      <input type="text" placeholder="Email"></input>
      <input type="text" placeholder="Phone Number"></input>
      <textarea
        className="MsgTextArea"
        type="text"
        placeholder="Message..."
      ></textarea>
      <motion.input
        className="submitSendMsg"
        type="submit"
        value={"Send Message"}
        whileHover={{ scale: 1.1 }}
      ></motion.input>
    </form>
  );
};

const PopUp = ({ handler }) => {
  return (
    <div className="PopUp">
      <div className="MsgPopUp">
        <p>Message sent with success</p>
        <img
          className="popup-success-img"
          src={PopUpSuccess}
          alt="PopUp-Success"
        ></img>
      </div>
      <div className="closePopUp">
        <button onClick={handler}>close</button>
      </div>
    </div>
  );
};

export default function Contact() {
  const [popUpOn, setPopUpOn] = useState(0);

  function handlePopUp(e) {
    let newPop = 1 - popUpOn;
    setPopUpOn(newPop);
    e.preventDefault();
    if (newPop === 1) {
      e.target.reset();
    }
  }
  return (
    <header className="App-contact">
      {popUpOn === 1 && <PopUp handler={(e) => handlePopUp(e)} />}
      <h1>Have a question ? Get in touch !</h1>
      <div className="contact-field">
        <ContactForm handler={(e) => handlePopUp(e)} />
        <SimpleMap />
      </div>
    </header>
  );
}
