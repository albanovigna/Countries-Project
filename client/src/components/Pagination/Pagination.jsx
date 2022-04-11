import React, { useState } from "react";
import { useSelector } from "react-redux";
// import Card from "../Card/Card";
// import ShowCountries from "../ShowCountries/ShowCountries";
import "font-awesome/css/font-awesome.min.css";
import s from "../Pagination/Pagination.module.css";

function Pagination({
  countriesPerPage,
  allCountries,
  pagination,
  currentPage,
  lastCountryIndex,
  setCurrentPage,
}) {
  // let allCountries = [...filterCountries];

  const pageNumbers = [];

  // const [countriesPerPage] = useState(9);
  // const lastCountryIndex = currentPage * countriesPerPage;
  // const firstCountryIndex = lastCountryIndex - countriesPerPage;
  // const currentCountries = allCountries.slice(
  //   firstCountryIndex,
  //   lastCountryIndex
  // );

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  for (let i = 1; i <= Math.ceil(allCountries.length / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (e) => {
    e.preventDefault();
    setCurrentPage(Number(e.target.id));
  };

  const handleLastPage = (e) => {
    e.preventDefault();
    const maxLimit = Math.ceil(pageNumbers.length / 5);
    setMaxPageNumberLimit(maxLimit * 5);
    setMinPageNumberLimit(maxLimit * 5 - 5);
    setCurrentPage(Number(e.target.id));
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
    if (currentPage - 1 <= minPageNumberLimit && currentPage - 1 > 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
    if (
      currentPage + 1 > maxPageNumberLimit &&
      currentPage + 1 <= pageNumbers.length
    ) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  if (maxPageNumberLimit > lastCountryIndex) {
    setMaxPageNumberLimit(5);
    setMinPageNumberLimit(0);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? s.active : s.numb}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  let pageDecrementButton = null;
  if (currentPage > pageNumberLimit) {
    pageDecrementButton = <li className={s.dots}>...</li>;
  }

  let pageIncrementButton = null;
  if (pageNumbers.length > maxPageNumberLimit) {
    pageIncrementButton = <li className={s.dots}>...</li>;
  }

  let showFirstNumber = null;
  if (currentPage > pageNumberLimit) {
    showFirstNumber = (
      <li
        id={pageNumbers[0]}
        onClick={handleClick}
        className={currentPage === 1 ? s.active : s.first}
      >
        {pageNumbers[0]}
      </li>
    );
  }

  let showLastNumber = null;
  if (
    pageNumbers.length > minPageNumberLimit &&
    pageNumbers.length > maxPageNumberLimit
  ) {
    showLastNumber = (
      <li
        id={pageNumbers[pageNumbers.length - 1]}
        onClick={(e) => handleLastPage(e)}
        className={currentPage === pageNumbers.length ? s.active : s.last}
      >
        {pageNumbers[pageNumbers.length - 1]}
      </li>
    );
  }

  return (
    <>
      <div className={s.container}>
        <ul className={s.paginationUl}>
          <li>
            <button
              className={s.buttonPrev}
              onClick={(e) => handlePrev(e)}
              disabled={currentPage - 1 === 0 ? true : false}
            >
              <i className={"fa fa-angle-left"}></i>
              {/* <h4>prev</h4> */}prev
            </button>
          </li>
          {showFirstNumber}
          {pageDecrementButton}
          {renderPageNumbers}
          {pageIncrementButton}
          {showLastNumber}
          <li>
            <button
              className={s.buttonNext}
              onClick={(e) => handleNext(e)}
              disabled={currentPage >= pageNumbers.length ? true : false}
            >
              next
              <i className={"fa fa-angle-right"}></i>
            </button>
          </li>
        </ul>
      </div>
      {/* <ShowCountries currentCountries={currentCountries} /> */}
    </>
  );
}
export default Pagination;
