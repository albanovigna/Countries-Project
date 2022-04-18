import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivities } from "../../actions";
import Pagination from "../Pagination/Pagination";
import s from "../Countries/Countries.module.css";
import Filters from "../Filters/Filters";
import ShowCountries from "../ShowCountries/ShowCountries";
import NavBar from "../NavBar/NavBar";
import Spinner from "../Spinner/Spinner";

function Countries() {
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.countries);

  const activities = useSelector((state) => state.activities);

  const filterCountries = useSelector((state) => state.filterCountries);

  const [order, setOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [countriesPerPage] = useState(9);
  const lastCountryIndex = currentPage * countriesPerPage;
  const firstCountryIndex = lastCountryIndex - countriesPerPage;
  const currentCountries = filterCountries.slice(
    firstCountryIndex,
    lastCountryIndex
  );

  useEffect(() => {
    if (!countries.length) {
      dispatch(getCountries());
      dispatch(getActivities());
    }
  }, []);

  return (
    <div className={s.container}>
      <img
        className={s.backImage}
        src="https://wp.usatodaysports.com/wp-content/uploads/sites/88/2014/06/shutterstock_179834108.jpg"
        alt=""
      />
      {countries.length > 0 ? (
        <div>
          <div className={s.navContainer}>
            <NavBar setCurrentPage={setCurrentPage} />
          </div>
          <Filters
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setOrder={setOrder}
          />
          <div className={s.countriesContainer}>
            <ShowCountries currentCountries={currentCountries} />
          </div>
          <div className={s.secondPagination}>
            <Pagination
              countriesPerPage={countriesPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              allCountries={filterCountries}
              lastCountryIndex={lastCountryIndex}
            />
          </div>
        </div>
      ) : (
        <div className={s.loadingContainer}>
          <Spinner></Spinner>
        </div>
      )}
    </div>
  );
}

export default Countries;
