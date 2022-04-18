import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../actions";
import s from "../SearchBar/SearchBar.module.css";
import image from "./search.png";

function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    console.log("input es", input);
    setInput(e.target.value);
    setCurrentPage(1);
    dispatch(getCountriesByName(input));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    dispatch(getCountriesByName(input));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setInput("");
    dispatch(getCountriesByName());
  };

  return (
    <div className={s.container}>
      <div className={s.searchBar} onSubmit={(e) => handleSubmit(e)}>
        <input
          className={s.searchInput}
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Search country..."
          value={input}
        />
        <button
          className={s.searchButton}
          onClick={(e) => handleSubmit(e)}
          type="submit"
        >
          <img src={image} alt="search-icon" />
        </button>
      </div>
      <button className={s.resetButton} onClick={(e) => handleReset(e)}>
        X
      </button>
    </div>
  );
}

export default SearchBar;
