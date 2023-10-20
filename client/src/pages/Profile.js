import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

export const Profile = () => {
  const [data, setData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState('');
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
          setUrl(data.url);
          localStorage.setItem("user", JSON.stringify({ ...state, photo: data.url }));
          dispatch({ type: "UPDATEPHOTO", payload: data.url });
        })
        .catch((error) => console.log(error));
    }
  }, [image]);

  const updatePhotoHandler = (file) => {
    setImage(file);
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
          <h4 style={{ color: 'white' }}>{state?.name}</h4>
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
    </div>
  );
};
