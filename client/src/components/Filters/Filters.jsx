import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sortInAlphabetical,
  sortByPopulation,
  filterByContinent,
  filterByActivity,
  getCountries,
} from "../../actions/index";
import s from "../Filters/Filters.module.css";

function Filters({ currentPage, setCurrentPage, setOrder }) {
  const dispatch = useDispatch();

  function sortByInput(e) {
    let value = e.target.value;
    let direction = value.endsWith("asc") ? "asc" : "desc";

    if (value.startsWith("alphabet")) {
      dispatch(sortInAlphabetical(direction));
    } else {
      dispatch(sortByPopulation(direction));
    }
    setCurrentPage(currentPage);
    setOrder(`Order ${e.target.value}`);
  }

  function filteredByContinent(e) {
    let value = e.target.value;
    dispatch(filterByContinent(value));
    setCurrentPage(1);
  }

  function filteredByActivities(e) {
    let value = e.target.value;
    dispatch(filterByActivity(value));
    setCurrentPage(1);
  }

  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(getCountries());
    setCurrentPage(1);
  };

  const allActivities = useSelector((state) => state.activities);
  const filteredActivities = [];

  const activitiesNames = allActivities.map((a) => a.name);

  for (let i = 0; i < activitiesNames.length; i++) {
    if (filteredActivities.indexOf(activitiesNames[i]) === -1) {
      filteredActivities.push(activitiesNames[i]);
    }
  }

  return (
    <div className={s.container}>
      <div className={s.selectContainer}>
        <select className={s.sort} onChange={(e) => sortByInput(e)}>
          <option selected disabled>
            Type of sort
          </option>
          <option value="population_asc">Ascendent Population</option>
          <option value="population_desc">Descendent Population</option>
          <option value="alphabet_asc">A-Z</option>
          <option value="alphabet_desc">Z-A</option>
        </select>
        <select
          className={s.continents}
          onChange={(e) => filteredByContinent(e)}
        >
          <option selected disabled>
            Filter by Continents
          </option>
          <option value="All">All Continents</option>
          <option value="Africa">Africa</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="Oceania">Oceania</option>
        </select>
        <select
          className={s.activities}
          onChange={(e) => filteredByActivities(e)}
        >
          <option selected disabled>
            Filter by Activities
          </option>
          <option value="All"> All</option>
          {filteredActivities.map((a) => {
            return (
              <option key={a} value={a}>
                {a}
              </option>
            );
          })}
        </select>
      </div>
      <button onClick={(e) => handleOnClick(e)}>Reset All Countries</button>
    </div>
  );
}

export default Filters;
