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

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: [e.target.value] });
  };
  const editsave = (e) => {
    e.preventDefault();
  };
  const [file, setFile] = useState();
    function handleFileChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
  const handleFileUpload = async(e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("file", file);
    formdata.append("name", firstname+lastname);
    console.log(formdata, file)
    axios
      .post(`${env.BACKEND}/edit/image`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }})
      .then((res) => {
        console.log(formdata)
      })
      .catch((err) => {
        console.log(err);
      });

  }
  useEffect(() => {
    console.log(props.data.userdata.userdata[0]);
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
          src={env.IMAGEPATH + props.data.userdata.userdata[0].image}
          alt={env.IMAGEPATH + props.data.userdata.userdata[0].image}
        />
        <div className="editform">
          <center>
            <form>
            <input type="file" onChange={handleFileChange} />
                <button onClick={handleFileUpload}>
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
