import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountriesById, removeDetail } from "../../actions";
import { Link } from "react-router-dom";
import s from "../Detail/Detail.module.css";
import Spinner from "../Spinner/Spinner";

function Detail() {
  const dispatch = useDispatch();

  const { idCountry } = useParams();

  useEffect(() => {
    dispatch(getCountriesById(idCountry));
    return () => {
      dispatch(removeDetail());
    };
  }, []);

  const detail = useSelector((state) => state.countryDetail);

  return (
    <>
      <div className={s.principalContainer}>
        <img
          className={s.backImage}
          src="https://wp.usatodaysports.com/wp-content/uploads/sites/88/2014/06/shutterstock_179834108.jpg"
          alt=""
        />
        {detail[0] ? (
          <label className={s.container}>
            <input className={s.inputDetail} type="checkbox" />
            <div className={s.flipBox}>
              <div className={s.front}>
                <h2>{detail[0].name}</h2>
                <h4>Id: {detail[0].idName}</h4>
                <div className={s.flagCont}>
                  <img className={s.flag} src={detail[0].flagImg} alt="" />
                </div>
                <div className={s.countryLocation}>
                  <h4>Location info</h4>
                  <h4>Continent:</h4>
                  <h5>{detail[0].continent}</h5>
                  <h4>Capital:</h4>
                  <h5>{detail[0].capital}</h5>
                </div>
                <div className={s.geography}>
                  <h4>Geography info</h4>
                  <h4>Area:</h4>
                  <h5>{detail[0].area}km2</h5>
                  <h4>Population:</h4>
                  <h5>{detail[0].population}</h5>
                </div>
                <p>Click for view country activities!</p>
              </div>
              <div className={s.back}>
                <div className={s.activities}>
                  {detail[0].activities.map((a, index) => {
                    return (
                      <ul className={s.ulActivities}>
                        <li>{index + 1}) </li>
                        <li>Name: {a.name}</li>
                        <li>Difficulty: {a.difficulty}</li>
                        <li>Duration: {a.duration} hs</li>
                        <li>Season: {a.season}</li>
                      </ul>
                    );
                  })}
                  {detail[0].activities.length === 0 ? (
                    <div>
                      <p>This country no have activities :c</p>
                      <p>Create one if you want!</p>
                      <Link className={s.linkActivity} to="/activity">
                        Create Activity
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <Link className={s.linkHome} to="/countries">
              <button>Go to home page</button>
            </Link>
          </label>
        ) : (
          <div className={s.loadingContainer}>
            <Spinner></Spinner>
          </div>
        )}
      </div>
    </>
  );
}

export default Detail;
