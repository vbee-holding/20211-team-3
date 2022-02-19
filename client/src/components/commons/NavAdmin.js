import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addUser } from "../../actions/user.action";

import CheckAdmin from "./CheckAdmin";

export default function NavAdmin(props) {
  const appState = useSelector(state => state);
  const dispatch = useDispatch();

  const hanldLogout = () => {
    dispatch(addUser(null));

    sessionStorage.removeItem("userId");
    localStorage.removeItem("userId");
    localStorage.removeItem("auth-token");
  };

  return (
    <nav className="navbar fixed-top navbar-expand-xl navbar-dark shadow-sm py-0 px-2 navUser">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img width="100%" src="/Logo-news.png" alt="Logo news" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <CheckAdmin role={props.role} />
          </ul>
          <div>
            <ul className="navbar-nav mr-0 ">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle account"
                  href="#0"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {appState.users.data ? (
                    <div className="account__avatar">
                      <img
                        style={props.style}
                        src={`/uploads/users/${appState.users.data.image ||
                          "avatar-default.jpg"}`}
                        alt="avatar"
                      />
                    </div>
                  ) : (
                    "TÀI KHOẢN"
                  )}
                </a>
                {appState.users.data ? (
                  <div
                    className="dropdown-menu shadow"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to="/profile">
                      <i className="far fa-address-card mr-4"></i>
                      <span className="text-color">Thông tin</span>
                    </Link>
                    <Link className="dropdown-item" to="/admin">
                      <i className="far fa-plus-square mr-4"></i>
                      <span className="text-color">Admin</span>
                    </Link>
                    <div className="dropdown-divider" />
                    <Link
                      to="/login"
                      className="dropdown-item"
                      onClick={hanldLogout}
                    >
                      <i className="fas fa-sign-out-alt mr-4"></i>
                      <span className="text-color">Đăng xuất</span>
                    </Link>
                  </div>
                ) : (
                  <div
                    className="dropdown-menu shadow"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to="/login">
                      <i className="fas fa-sign-in-alt mr-4"></i>
                      <span className="text-color">Đăng nhập</span>
                    </Link>
                    <Link className="dropdown-item" to="/register">
                      <i className="far fa-registered mr-4"></i>
                      <span className="text-color">Đăng ký</span>
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
