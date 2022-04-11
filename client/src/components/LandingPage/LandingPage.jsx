import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountries, getActivities } from "../../actions";
import { Link } from "react-router-dom";
import s from "../LandingPage/LandingPage.module.css";

function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, []);

  return (
    <div className={s.container}>
      <div className={s.textContainer}>
        <h2>Discover all the countries</h2>
      </div>
      <div className={s.cloud}>
        <div className={s.light}></div>
        <img
          className={s.planeImg}
          src="https://images.vexels.com/media/users/3/145795/isolated/preview/05cd33059a006bf49006097af4ccba98-plane-in-flight-by-vexels.png"
        />
      </div>
      {/* <span className={s.textContainer}>Discover all the countries</span> */}
      <img
        src="https://i.pinimg.com/originals/20/cb/f3/20cbf31ecf279ccab1a3264a2cec80c6.jpg"
        alt="country-img"
        className={s.img}
      />
      <Link to="/countries" className={s.button}>
        Start Here
      </Link>
    </div>
  );
}

export default LandingPage;
