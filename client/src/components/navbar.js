import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";
import '../pages/css/navbar.css';

export const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    history.push('/login');
  };
  const renderNav = () => {
    if (state) {
      return [
        <>
          <li>
            <Link to="/profile">
              <i className="medium material-icons">account_circle</i>
            </Link>
          </li>
          <li>
            <Link to="/createpost">
              <i className="medium material-icons">playlist_add</i>
            </Link>
          </li>
          <li>
            <Link className='exitBtn' to='/login' onClick={logout}>
              <i className="medium material-icons">exit_to_app</i>
            </Link>

          </li>
        </>
      ];
    } else {
      return [
        <li>
          <Link className='enterBtn' to="/login">
            <i className="medium material-icons">arrow_back</i>
          </Link>
        </li>
      ];
    }
  };
  return (
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
    </div>

  );
};
