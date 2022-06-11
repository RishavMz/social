import React, { useState, useEffect } from "react";
import axios from "axios";
import "./notifications.css";

import env from "./../../env";

function Notification(props) {
  useEffect(() => {}, []);

  return (
    <div className="notification">
      <br />
      <br />
      <center>
        <b>Likes : {props.sup.userdata.userdata[0].likecount}</b>
      </center>
      <br />
      <br />
      <center>
        <b>Super Likers</b>
      </center>
      {props.sup.userdata.userdata[0].superlikeby.map((e) => {
        return (
          <div key={e._id} className="superlikecard">
            <img
              src={env.IMAGEPATH + e.image}
              className="superlikepic"
              alt="No image"
            ></img>
          </div>
        );
      })}
    </div>
  );
}
export default Notification;
