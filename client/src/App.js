import "./App.css";
import Main from "./components/main";
import Login from "./components/login/login";
import React, { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState("");
  const logindata = (data) => {
    setToken(data);
  };
  return (
    <div className="App">
      {console.log("Tokemnn  " + token)}
      {token == "" ? (
        <Login logindata={logindata} />
      ) : (
        <Main userdata={token} />
      )}
    </div>
  );
}

export default App;
