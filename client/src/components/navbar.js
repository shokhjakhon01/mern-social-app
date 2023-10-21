import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";
import '../pages/css/navbar.css';
import M from "materialize-css";

export const Navbar = () => {
  const searchPanel = useRef(null);
  const [searchUser, setSearchUser] = useState('');
  const [userSearchFinded, setUserSearchFinded] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    history.push('/login');
  };

  useEffect(() => {
    M.Modal.init(searchPanel.current);
  }, []);

  const searchUsersHandler = (query) => {
    setSearchUser(query);
    fetch('http://localhost:8000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    })
      .then(response => response.json())
      .then((result) => setUserSearchFinded(result.user))
      .catch((error) => console.log(error));
  };

  const renderNav = () => {
    if (state) {
      return [
        <>
          <li key={'1'} style={{ 'cursor': "pointer" }}>
            <i data-target='modal1' className="medium material-icons modal-trigger">search</i>
          </li>
          <li key={'2'}>
            <Link to="/profile">
              <i className="medium material-icons">account_circle</i>
            </Link>
          </li>
          <li key={'3'}>
            <Link to="/createpost">
              <i className="medium material-icons">playlist_add</i>
            </Link>
          </li>
          <li key={'4'}>
            <Link className='exitBtn' to='/login' onClick={logout}>
              <i className="medium material-icons">exit_to_app</i>
            </Link>
          </li>
        </>
      ];
    } else {
      return [
        <li key={'5'}>
          <Link className='enterBtn' to="/login">
            <i className="medium material-icons">arrow_back</i>
          </Link>
        </li>
      ];
    }
  };
  return (
    <>
      <div className="navBar">
        <div className="navigationBar">
          <div className="mainPage">
            <Link
              to={state ? '/' : '/login'}
              className="brand-logo"
            >
              ShohGram
            </Link>
          </div>
          <div className="navLink">
            <ul>
              {renderNav()}
            </ul>
          </div>
        </div>
        <div id="modal1" className="modal" ref={searchPanel}>
          <div className="modal-content">
            <div class="input-field col s6">
              <i class="material-icons prefix">search</i>
              <input id="icon_prefix" type="text" class="validate"
                value={searchUser}
                onChange={(e) => searchUsersHandler(e.target.value)} />
              <label htmlFor="icon_prefix">Search</label>
            </div>
            <div>
              <ul className="collection">
                {userSearchFinded.map(user => (
                  <Link onClick={() => M.Modal.getInstance(searchPanel.current).close()}
                    to={user?._id === state?._id ? `/profile` : '/profile/' + user?._id}>
                    <li key={user._id} class="collection-item avatar">
                      <img src={user?.photo} alt="" class="circle" />
                      <span class="title">{user?.name} <br /> {user?.email}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={(e) => setSearchUser('')} className="modal-close waves-effect waves-green btn-flat">Close</button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "10vh" }}></div>
    </>

  );
};
