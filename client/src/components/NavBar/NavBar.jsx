import React from "react";
import s from "../NavBar/NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

function NavBar({ setCurrentPage }) {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Countries App</h1>
      <Link className={s.link} to="/activity">
        Create Activity
      </Link>
      <SearchBar
        className={s.searchBox}
        setCurrentPage={setCurrentPage}
      ></SearchBar>
    </div>
  );
}

export default NavBar;
