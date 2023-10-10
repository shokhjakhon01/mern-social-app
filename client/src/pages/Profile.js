import React, { useEffect, useState } from "react";

export const Profile = () => {
  const [data, setData] = useState([]);
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
            src="https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="profile avatar"
          />
        </div>
        <div>
          <h4 style={{ color: 'white' }}>Suyunov Shohjahon</h4>
          <div className="info-profile">
            <p style={{ color: 'white' }}>99 posts</p>
            <p style={{ color: 'white' }}>99 followers</p>
            <p style={{ color: 'white' }}>99 folllowing</p>
          </div>
        </div>
      </div>
      <div className="gallery">
        {data.map(item => (
          <div className="image-item">
            <img
              src={item.photo}
              alt={item._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
