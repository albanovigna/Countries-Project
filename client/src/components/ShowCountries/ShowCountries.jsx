import React from "react";
import s from "./ShowCountries.module.css";
import Card from "../Card/Card";

function ShowCountries({ currentCountries }) {
  return (
    <div className={s.countriesContainer}>
      {currentCountries.map((country) => {
        return (
          <Card
            key={country.id}
            id={country.idName}
            name={country.name}
            continent={country.continent}
            img={country.flagImg}
            population={country.population}
          />
        );
      })}
    </div>
  );
}

export default ShowCountries;
