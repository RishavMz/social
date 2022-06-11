import React, { useState, useEffect } from "react";
import axios from "axios";
import "./feed.css";

import env from "./../../env";

function Feed() {
  const [feed, updateFeed] = useState([]);
  useEffect(() => {
    const logintoken = localStorage.getItem('logintoken');
    axios
      .get(`${env.BACKEND}/feed/all`, {
        headers: {
          'Authorization': `Bearer ${logintoken}`
      },
      })
      .then((res) => {
        updateFeed(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="feed">
      {feed.map((e) => {
        return (
          <div key={e._id} className="feedcard">
            <img src = {env.IMAGEPATH+e.image} className="feedpic" alt={env.IMAGEPATH+e.image}></img>
            <div className="name">
              <div className="firstname">{e.firstname}</div> 
              <div className="lastname">{e.lastname}</div>
            </div>
            <div className="buttons">
              <button className="btn like">+</button>
              <button className="btn superlike">UwU</button>
              <button className="btn block">X</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Feed;
