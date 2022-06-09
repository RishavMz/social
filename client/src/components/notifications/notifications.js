import React, { useState, useEffect } from "react";
import axios from "axios";
import "./notifications.css";

const IMAGEPATH = `http://127.0.0.1:8000/image/`;

function Notification() {
  useEffect(() => {}, []);

  return <div className="notification"></div>;
}
export default Notification;
