import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/userSlice";
import TurnIcon from "../image/TurnIcon";

const Header: FC = () => {
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.setItem("token", "");
    dispatch(clearUser());
  };

  return (
    <header className="header">
      <h1 className="header__title">My ToDo</h1>
      <button className="header__logout" title="Log Out" onClick={logout}>
        <TurnIcon className="header__logout__svg" />
      </button>
    </header>
  );
};

export default Header;
