import React from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth-reducer";

const Header = (props) => {
  const login = useSelector((state) => state.auth.login);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  return (
    <header className={s.header}>
      <img
        src="https://www.freelogodesign.org/Content/img/logo-ex-7.png"
        alt=""
      />
      <div className={s.loginWrapper}>
        {isAuth ? (
          <div className={s.logout}>
            <NavLink to="/login">{login}</NavLink>
            <button onClick={() => dispatch(logout())}>Log out</button>
          </div>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
