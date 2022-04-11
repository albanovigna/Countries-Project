import React from "react";
import { Link } from "react-router-dom";
import image from "./placeholder.png";
import image2 from "./team.png";
import s from "./Card.module.css";

function Card(props) {
  const url = props.img;
  return (
    <div className={s.container}>
      <div className={s.imgContainer}>
        <img className={s.flag} src={props.img}></img>
      </div>
      <div className={s.cardContent}>
        <div className={s.mainInfo}>
          <h4 className={s.name}>{props.name}</h4>
        </div>
        <hr />
        <div className={s.otherInfo}>
          <img className={s.location} src={image} alt="location-icon" />
          <h4 className={s.locationText}>{props.continent}</h4>
          <img className={s.population} src={image2} alt="location-icon" />
          <h4 className={s.populationText}>Population: {props.population}</h4>
        </div>
        <div className={s.cardButton}>
          <button className={s.details}>
            <span className={s.circle} aria-hidden="true">
              <span className={`${s.icon} ${s.arrow}`}></span>
            </span>
            <Link className={s.link} to={`/countries/${props.id}`}>
              View Details
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
