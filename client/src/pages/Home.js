import React, { useContext, useEffect, useState } from "react";
import './css/home.css';
import HomeSideBar from "../components/homeSidebar";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

export const Home = () => {
  const [data, setData] = useState([]);
  const [showComments, setShowComments] = useState(false);
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
        const updatedData = data.map(item => {
          console.log(result, item);
          if (item._id === result.data._id) {
            return result.data;
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
        const updatedData = data.map(item => {
          if (item._id === result.data._id) {
            return result.data;
          } else {
            return item;
          }
        });
        setData(updatedData);
      })
      .catch(err => console.log(err));
  };
  const commentsHandler = (text, id) => {
    fetch("http://localhost:8000/comments", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token
      },
      body: JSON.stringify({
        text: text,
        _id: id
      })
    }).then(response => response.json())
      .then(result => {
        const updatedData = data.map(item => {
          if (item._id === result.data._id) {
            return result.data;
          } else {
            return item;
          }
        });
        setData(updatedData);
      })
      .catch(err => console.log(err));
  };

  const deletePostHandler = (postId) => {
    fetch(`http://localhost:8000/deletePost/${postId}`, {
      method: "DELETE",
      headers: {
        token: token
      },
    }).then(response => response.json())
      .then((result) => {
        const newData = data.filter(item => item._id != result.data._id);
        setData(newData);
      }).catch(err => console.log(err));
  };

  return (
    <div className="home">
      <div className="post__items">
        <div className="left__side">
          <h2 style={{ color: "#fff", fontFamily: "Grand Hotel" }}>All posts</h2>
          {data.map((item) => (
            <div className="card" key={item._id}>
              <Link to={item.postedBy._id === state._id ? `/profile` : '/profile/' + item.postedBy._id} >
                <p className="card-title postedBy">{item?.postedBy?.name}</p>
              </Link>
              <div className="card-image">
                <img className="images" src={item.photo} alt="ii" />
              </div>
              <div className="card-content">
                {item?.likes?.includes(state._id) ? <i style={{ cursor: "pointer" }} onClick={() => unlikesPostHandler(item._id)} className="material-icons">thumb_down</i> : <i style={{ cursor: "pointer" }} onClick={() => likesPostHandler(item._id)} className="material-icons">thumb_up</i>
                }
                <i onClick={() => setShowComments(!showComments)} style={{ marginLeft: '10px', cursor: "pointer" }} className="material-icons">comment</i>
                {item.postedBy._id == state._id && <i onClick={() => deletePostHandler(item._id)} style={{ marginLeft: '10px', cursor: "pointer" }} className="material-icons">delete_forever</i>}
                <p>{item?.likes?.length} likes</p>
                <h3 style={{ margin: 0 }}>{item.title}</h3>
                <p>{item.body}</p>
                {showComments ? (
                  item?.comments?.map(s => (
                    <div className="commentPost" key={s._id}>
                      <h6>
                        {s.text}
                      </h6>
                      <p>posted by: <b>{s?.postedBy?.name}</b></p>
                    </div>
                  ))
                ) : (
                  <p style={{ opacity: '0.6' }}>Comments:  { }{item?.comments?.length ? item?.comments?.length : 0} </p>
                )}
                < form onSubmit={(e) => {
                  e.preventDefault();
                  commentsHandler(e.target[0].value, item._id);
                  e.target[0].value = '';
                }}>
                  <input type="text" placeholder="Add a comment" />
                </form>
              </div>
            </div>
          )).reverse()}
        </div>
        <div className="right__side">
          <h2 style={{ color: "#fff", fontFamily: "Grand Hotel" }}>My posts</h2>
          <HomeSideBar />
        </div>
      </div>
    </div >
  );
};
