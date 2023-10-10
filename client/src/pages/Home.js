import React, { useContext, useEffect, useState } from "react";
import './css/home.css';
import HomeSideBar from "../components/homeSidebar";
import { UserContext } from "../App";

export const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch('http://localhost:8000/getAllPost', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        token: token
      }
    })
      .then((response) => response.json())
      .then(data => setData(data.data));
  }, []);

  const likesPostHandler = (id) => {
    fetch("http://localhost:8000/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token
      },
      body: JSON.stringify({
        postId: id,
      })
    })
      .then((response) => response.json())
      .then(result => {
        const updatedData = result.map(item => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(updatedData);
      })
      .catch(err => console.log(err));
  };

  const unlikesPostHandler = (id) => {
    fetch("http://localhost:8000/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token
      },
      body: JSON.stringify({
        postId: id,
      })
    })
      .then((response) => response.json())
      .then(result => {
        const updatedData = result.map(item => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(updatedData);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="home">
      <div className="post__items">
        <div className="left__side">
          <h2 style={{ color: "#fff", fontFamily: "Grand Hotel" }}>All posts</h2>
          {data.map((item) => (
            <div className="card" key={item._id}>
              <p className="card-title postedBy">{item.postedBy.name}</p>
              <div className="card-image">
                <img className="images" src={item.photo} alt="ii" />
              </div>
              <div className="card-content">
                {item.likes.includes(state._id) ? <i onClick={() => unlikesPostHandler(item._id)} className="material-icons">thumb_down</i> : <i onClick={() => likesPostHandler(item._id)} className="material-icons">thumb_up</i>
                }
                <p>{item?.likes?.length} likes</p>
                <h3 style={{ margin: 0 }}>{item.title}</h3>
                <p>{item.body}</p>
                <input type="text" placeholder="Add a comment" />
              </div>
            </div>
          )).reverse()}
        </div>
        <div className="right__side">
          <h2 style={{ color: "#fff", fontFamily: "Grand Hotel" }}>My posts</h2>
          <HomeSideBar />
        </div>
      </div>
    </div>
  );
};
