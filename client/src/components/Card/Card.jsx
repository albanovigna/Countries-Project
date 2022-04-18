import React from "react";
import { Link } from "react-router-dom";
import image from "./placeholder.png";
import image2 from "./team.png";
import s from "./Card.module.css";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

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
          <h4 className={s.locationText}>
            <FontAwesomeIcon
              icon={faLocationDot}
              className={s.locationIcon}
            ></FontAwesomeIcon>
            {props.continent}
          </h4>
          <h4 className={s.populationText}>
            <FontAwesomeIcon
              className={s.populationIcon}
              icon={faPeopleGroup}
            ></FontAwesomeIcon>
            Population: {props.population}
          </h4>
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
