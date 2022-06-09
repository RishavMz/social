import React, { useState, useEffect } from "react";
import axios from "axios";
import "./feed.css";

const IMAGEPATH = `http://127.0.0.1:8000/image/`

function Feed() {
  const [feed, updateFeed] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/scroll/all")
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
          <div id={e._id} className="feedcard">
            <img src = {IMAGEPATH+e.image} className="feedpic" alt={IMAGEPATH+e.image}></img>
            <div className="name">
              <div className="firstname">{e.firstname}</div> 
              <div className="lastname">{e.lastname}</div>
            </div>
            <div className="buttons">
              <button className="btn like">Like</button>
              <button className="btn superlike">superlike</button>
              <button className="btn block">block</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Feed;
