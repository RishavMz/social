import React, { useState, useEffect } from "react";
import axios from "axios";
import "./feed.css";

import env from "./../../env";

function Feed(props) {
  const [feed, updateFeed] = useState([]);
  useEffect(() => {
    const logintoken = localStorage.getItem('logintoken');
    axios
      .post(`${env.BACKEND}/feed/all`, {data: props.value.userdata.userdata[0] },{
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
            <img src = {env.IMAGEPATH+e.image} className="feedpic" alt="No image"></img>
            <div className="name">
              <div className="firstname">{e.firstname}</div> 
              <div className="lastname">{e.lastname}</div>
            </div>
            <div className="buttons">
              <button className="btn like" onClick={(async(data)=>{
                await axios.post(`${env.BACKEND}/feed/like`, {
                  sender: props.value.userdata.userdata[0],
                  receiver: e
                }).then((res)=>{
                  console.log(res);
                }).catch((err)=>{
                  console.log(err);
                })
              })}>+</button>
              <button className="btn superlike" onClick={(async(data)=>{
                await axios.post(`${env.BACKEND}/feed/superlike`, {
                  sender: props.value.userdata.userdata[0],
                  receiver: e
                }).then((res)=>{
                  console.log(res);
                }).catch((err)=>{
                  console.log(err);
                })
              })}>++</button>
              <button className="btn block" onClick={(async(data)=>{
                await axios.post(`${env.BACKEND}/feed/block`, {
                  sender: props.value.userdata.userdata[0],
                  receiver: e
                }).then((res)=>{
                  console.log(res);
                }).catch((err)=>{
                  console.log(err);
                })
              })}>X</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Feed;
