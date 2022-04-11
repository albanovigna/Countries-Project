import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities, getCountries, createActivity } from "../../actions";
import { Link } from "react-router-dom";
import s from "../Activity/Activity.module.css";

function Activity() {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.countries);

  const [errorsValue, setErrorsValue] = useState({});

  const [newActivity, setNewActivity] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countriesInActivity: [],
  });

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  const handleInput = (e) => {
    e.preventDefault();
    setNewActivity({
      ...newActivity,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setNewActivity({
      ...newActivity,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectCountries = (e) => {
    e.preventDefault();
    const countryName = e.target.value;
    if (
      Object.values(newActivity.countriesInActivity).includes(e.target.value)
    ) {
      alert(`el pais ${countryName} ya ha sido ingresado`);
    } else {
      setNewActivity({
        ...newActivity,
        countriesInActivity: [
          ...newActivity.countriesInActivity,
          e.target.value,
        ],
      });
      console.log(newActivity);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorsValue(validateValue(newActivity));
    const errors = validateValue(newActivity);
    if (Object.values(errors).length === 0) {
      console.log(newActivity);
      dispatch(createActivity(newActivity));
      alert("Activity added correctly!");
      setNewActivity({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countriesInActivity: [],
      });
      dispatch(getActivities());
      dispatch(getCountries());
    }
  };

  const removeCountry = (e) => {
    e.preventDefault();
    setNewActivity({
      ...newActivity,
      countriesInActivity: newActivity.countriesInActivity.filter(
        (c) => c !== e.target.name
      ),
    });
    console.log(newActivity);
  };

  function validateValue(newActivity) {
    let errors = {};
    if (!newActivity.name) {
      errors.name = "Name is required";
    } else if (!/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/.test(newActivity.name)) {
      errors.name = "Name is invalid. Only letters are allowed";
    }
    if (!newActivity.duration || newActivity.duration === "Duration") {
      errors.duration = "Duration is required";
    }
    if (!newActivity.difficulty || newActivity.difficulty === "Difficulty") {
      errors.difficulty = "Difficulty is required";
    }
    if (!newActivity.season || newActivity.season === "Season") {
      errors.season = "Season is required";
    }
    if (!newActivity.countriesInActivity[0]) {
      errors.countriesInActivity = "Country is required";
    }
    return errors;
  }

  return (
    <div className={s.container}>
      <img
        className={s.activityImg}
        src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
        alt=""
      />
      <Link className={s.linkHome} to="/countries">
        <button>Go to home page</button>
      </Link>
      <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
        <h2>New Activity</h2>
        <label htmlFor="">Name:</label>
        <input
          type="text"
          name="name"
          value={newActivity.name}
          placeholder="Activity name..."
          onChange={handleInput}
        />
        {errorsValue.name && <p className={s.error}>{errorsValue.name}</p>}
        <select className={s.select} name="difficulty" onChange={handleSelect}>
          <option selected disabled>
            Difficulty
          </option>
          <option value="1">1(Easy)</option>
          <option value="2">2(Light)</option>
          <option value="3">3(Medium)</option>
          <option value="4">4(Hard)</option>
          <option value="5">5(Extreme)</option>
        </select>
        {errorsValue.difficulty && (
          <p className={s.error}>{errorsValue.difficulty}</p>
        )}
        <select className={s.select} name="duration" onChange={handleSelect}>
          <option selected disabled>
            Duration
          </option>
          <option value="1">1 Hr</option>
          <option value="2">2 Hrs</option>
          <option value="3">3 Hrs</option>
          <option value="4">4 Hrs</option>
          <option value="5">5 Hrs</option>
        </select>
        {errorsValue.duration && (
          <p className={s.error}>{errorsValue.duration}</p>
        )}
        <select className={s.select} name="season" onChange={handleSelect}>
          <option selected disabled>
            Season
          </option>
          <option value="Autumn">Autumn</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
        </select>
        {errorsValue.season && <p className={s.error}>{errorsValue.season}</p>}
        <select className={s.select} onChange={(e) => handleSelectCountries(e)}>
          <option selected disabled>
            Countries
          </option>
          {allCountries?.map((c) => {
            return (
              <option key={c.id} name={c.name} value={c.idName}>
                {c.name}
              </option>
            );
          })}
        </select>
        <div className={s.containerCountries}>
          <ul className={s.listCountries}>
            {newActivity.countriesInActivity.map((c) => {
              let name = allCountries.map((country) =>
                country.idName === c ? country.name : null
              );
              return (
                <div>
                  <li key={c.id}>{name}</li>
                  <button
                    name={c}
                    className="closeButton"
                    onClick={(e) => {
                      removeCountry(e);
                    }}
                  >
                    ❌
                  </button>
                </div>
              );
            })}
          </ul>
        </div>
        {errorsValue.countriesInActivity && (
          <p className={s.error}>{errorsValue.countriesInActivity}</p>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Activity;
