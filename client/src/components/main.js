import "../App.css";
import "./feed/feed";
import Feed from "./feed/feed";
import Edit from "./edit/edit";
import Notification from "./notifications/notifications";
import axios from "axios";
import env from "./../env";


function Main(props) {
  const logout = (e) => {
    e.preventDefault();
    axios.post(`${env.BACKEND}/auth/logout`);
    localStorage.clear('logintoken');
    window.location.reload();
  };
  return (
    <div className="Main">
      <div className="navbar">
        <button className="logout" onClick={logout}>LOG OUT</button>
      </div>
      <Edit data={props}/>
      <Feed value={props}/>
      <Notification sup={props} />
    </div>
  );
}

export default Main;
