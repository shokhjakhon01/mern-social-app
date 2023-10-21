import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";
import '../pages/css/navbar.css';
import M from "materialize-css";

export const Navbar = () => {
  const searchPanel = useRef(null);
  const [searchUser, setSearchUser] = useState('');
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
                onChange={(e) => setSearchUser(e.target.value)} />
              <label for="icon_prefix">Search</label>
            </div>
            <div>
              <ul className="collection">
                <li class="collection-item avatar">
                  <img src="images/yuna.jpg" alt="" class="circle" />
                  <span class="title">Title</span>
                  <p>First Line <br />
                    Second Line
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat">Close</button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "10vh" }}></div>
    </>

  );
};
