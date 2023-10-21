import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import M from "materialize-css";

export const Profile = () => {
  const [data, setData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [image, setImage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8000/myPost", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        token: token
      }
    }).then((response) => response.json()).then(data => setData(data.data));
  }, []);

  useEffect(() => {
    if (image) {
      const formdata = new FormData();
      formdata.append("file", image);
      formdata.append("upload_preset", "shohgram");
      formdata.append("cloud_name", "dmecr8ega");

      fetch("https://api.cloudinary.com/v1_1/dmecr8ega/image/upload", {
        method: "POST",
        body: formdata,
      })
        .then((response) => response.json())
        .then((data) => {

          localStorage.setItem("user", JSON.stringify({ ...state, photo: data.url }));
          dispatch({ type: "UPDATEPHOTO", payload: data.url });
          fetch('http://localhost:8000/updatephoto', {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              token: token
            },
            body: JSON.stringify({
              photo: data.url
            })
          }).then(response => response.json()).then(data => {
            localStorage.setItem("user", JSON.stringify({ ...state, photo: data.user.photo }));
            dispatch({ type: "UPDATEPHOTO", payload: data.user.photo });
          });
        })
        .catch((error) => console.log(error));
    }
  }, [image]);

  const updatePhotoHandler = (file) => {
    setImage(file);
  };

  const editProfile = () => {
    if (name) {
      fetch("http://localhost:8000/updatename", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          token: token
        },
        body: JSON.stringify({
          name: name
        })
      }).then(response => response.json())
        .then(data => {
          localStorage.setItem("user", JSON.stringify({ ...state, name: data.user.name }));
          dispatch({ type: "UPDATENAME", payload: data.user.name });
          M.toast({
            html: "Profile updated successfully",
            classes: "#1b5e20 green darken-4",
          });
        });

    }
    setIsEdit(false);
  };

  return (
    <div className="profile">
      <div className="profileMain">
        <div>
          <div class="containers">
            <img src={state?.photo} alt="Avatar" class="profile-img" />
            <div class="middles middles2">
              <button type="button"
                onClick={() => setIsOpenModal(true)}
                className="btn">
                <i className="material-icons">add_a_photo</i>
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="profileName">
            <h4 style={{ color: 'white' }}>{state?.name}</h4>
            <button onClick={() => setIsEdit(true)} className="btn">
              <i className="material-icons">settings</i>
            </button>
          </div>
          <div className="info-profile">
            <p style={{ color: 'white' }}>{data.length} posts</p>
            <p style={{ color: 'white' }}>{state ? state?.followers?.length : 0} followers</p>
            <Link to='/myFollowerPost'>
              <p style={{ color: 'white' }}>{state ? state?.following?.length : 0} folllowing</p>
            </Link>
          </div>
        </div>
      </div>
      {data.length ? <div className="gallery">
        {data.map(item => (
          <div className="image-item">
            <img
              src={item.photo}
              alt={item._id}
            />
          </div>
        ))}
      </div> : <p> No Post</p>}
      {isOpenModal ? (
        <div className="modalS" onClick={() => setIsOpenModal(false)}>
          <div
            className="modalS__content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modalHeader">
              <h4>Add Your Accaunt Photo</h4>
              <i
                style={{ cursor: "pointer", color: "#0d47a1", position: 'absolute' }}
                onClick={() => setIsOpenModal(false)}
                className="small material-icons xicon"
              >
                close
              </i>
            </div>
            <div className="modalConten">
              <div class="file-field input-field">
                <div class="btn #0d47a1 blue darken-4">
                  <span>
                    <i className="material-icons">add_a_photo</i>
                  </span>
                  <input
                    type="file"
                    onChange={(e) => updatePhotoHandler(e.target.files[0])}
                  />
                </div>
                <div class="file-path-wrapper">
                  <input
                    class="file-path validate"
                    type="text"
                    placeholder="You Photo"
                  />
                </div>
              </div>
            </div>
            <div className="modalFooter">
              <button
                className="btn #0d47a1 blue darken-4"
                onClick={() => setIsOpenModal(false)}
              >
                Save Image
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isEdit ? (
        <div className="modalS" onClick={() => setIsEdit(false)}>
          <div
            className="modalS__content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modalHeader">
              <h4>Change your name</h4>
              <i
                style={{ cursor: "pointer", color: "#0d47a1", position: 'absolute' }}
                onClick={() => setIsEdit(false)}
                className="small material-icons xicon"
              >
                close
              </i>
            </div>
            <div className="modalConten">
              <div class="file-field input-field">
                <div class="btn #0d47a1 blue darken-4">
                  <span>
                    <i className="material-icons">add_a_photo</i>
                  </span>
                  <input
                    type="file"
                    onChange={(e) => updatePhotoHandler(e.target.files[0])}
                  />
                </div>
                <div class="file-path-wrapper">
                  <input
                    class="file-path validate"
                    type="text"
                    placeholder="You Photo"
                  />
                </div>
              </div>
              <div class="input-field col s6">
                <i class="material-icons prefix">account_circle</i>
                <input id="icon_prefix" type="text" class="validate"
                  onChange={(e) => setName(e.target.value)} />
                <label for="icon_prefix">First Name</label>
              </div>
            </div>
            <div className="modalFooter">
              <button
                className="btn #0d47a1 blue darken-4"
                onClick={() => editProfile()}
              >
                Save Image
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
