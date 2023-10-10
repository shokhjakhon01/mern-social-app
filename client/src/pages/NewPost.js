import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

export const NewPost = () => {
  const [title, settitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const histroy = useHistory();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (url) {
      fetch("http://localhost:8000/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          title: title,
          body: body,
          photo: url,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#e53935 red darken-1" });
          } else if (data.message == "Unauthorized") {
            M.toast({
              html: data.message,
              classes: "#e53935 red darken-1",
            });
          } else {
            M.toast({
              html: data.message,
              classes: "#1b5e20 green darken-4",
            });
            histroy.push("/");
          }
        });
    }
  }, [url]);

  const postDetails = async () => {
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
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="card cardPost">
      <div className="card-image ">
        <img
          className="imggg"
          src="https://images.unsplash.com/photo-1695199012274-0b43fee45ae1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
          alt="geddd"
        />
        <span className="card-title">Add Image</span>
      </div>
      <div className="card-content">
        <div className="input-field col s12">
          <i className="material-icons prefix">subtitles</i>
          <input
            id="icon_prefix"
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
          <label htmlFor="icon_prefix">Title</label>
        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">content_paste</i>
          <input
            id="icon_prefixx"
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <label htmlFor="icon_prefixx">Article</label>
        </div>
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              placeholder="Upload image"
            />
          </div>
        </div>
        <button
          className="btn"
          onClick={() => postDetails()}
        >
          Add article
        </button>
      </div>
    </div>
  );
};
