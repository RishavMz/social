import React, { useState, useEffect } from "react";
import axios from "axios";
import "./edit.css";
import env from "../../env";

function Edit(props) {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
  });
  const { firstname, lastname } = data;
  const [imagereload, reloader] = useState();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: [e.target.value] });
  };
  const editsave = (e) => {
    e.preventDefault();
  };
  const [file, setFile] = useState(null);
  const [flink, flinker] = useState("")
    function handleFileChange(e) {
        setFile(e.target.files[0]);
        reloader(URL.createObjectURL(e.target.files[0]))
        console.log("Files   =>  "+e.target.files[0])
    }
  const handleFileUpload = async(e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("file", file);
    formdata.append("name", firstname+lastname);
    axios
      .post(`${env.BACKEND}/edit/image`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }})
      .then((res) => {
        console.log(res)
        alert("Successfully uploaded")
      })
      .catch((err) => {
        console.log(err);
      });

  }
  useEffect(() => {
    reloader(env.IMAGEPATH+props.data.userdata.userdata[0].image)
    setData({
      ...data,
      firstname: props.data.userdata.userdata[0].firstname,
      lastname: props.data.userdata.userdata[0].lastname,
    });
  }, []);

  return (
    <div className="edit">
      <center>
        <img
          className="editimage"
          src={imagereload}
          alt="No image"
        />
        <div className="editform">
          <center>
            <form>
            <input type="file" onChange={handleFileChange} />
                <button className="loginbtn" onClick={handleFileUpload}>
                  Upload!
                </button>
            </form>
            <form>
              <div className="loginblock">
                <label>Firstname</label>
                <input
                  type="text"
                  name="firstname"
                  value={firstname}
                  onChange={changeHandler}
                  disabled
                />
                <br />
              </div>
              <div className="loginblock">
                <label>Lastname</label>
                <input
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={changeHandler}
                  disabled
                />
                <br />
              </div>
              <button className="loginbtn" onClick={editsave}>
                SAVE
              </button>
            </form>
          </center>
        </div>
      </center>
    </div>
  );
}
export default Edit;
