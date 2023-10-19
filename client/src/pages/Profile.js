import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

export const Profile = () => {
  const [data, setData] = useState([]);
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

  return (
    <div className="profile">
      <div className="profileMain">
        <div>
          <img
            className="profile-img"
            src={state?.photo}
            alt="profile avatar"
          />
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

    </div>
  );
};
