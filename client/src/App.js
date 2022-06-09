import "./App.css";
import "./components/feed/feed";
import Feed from "./components/feed/feed";
import Edit from "./components/edit/edit";
import Notification from "./components/notifications/notifications";
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Edit />
      <Feed />
      <Notification />
    </div>
  );
}

export default App;
