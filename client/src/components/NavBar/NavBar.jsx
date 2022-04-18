import React from "react";
import { useState, useEffect } from "react";
import s from "../NavBar/NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 768px)" });
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);
  return (
    <div className={s.container}>
      {isTabletOrMobile && (
        <div>
          <h2 className={s.logo}>Countries App</h2>
          {(toggleMenu || screenWidth > 500) && (
            <ul className={s.list}>
              <li className={s.items}>Home</li>
              <li className={s.items}>
                <Link className={s.linkNav} to="/activity">
                  Create Activity
                </Link>
              </li>

              {/* <li className={s.items}>Contact</li> */}
            </ul>
          )}
          <button onClick={toggleNav} className={s.btn}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      )}
      {isDesktopOrLaptop && (
        <div className={s.contDesktop}>
          <h1 className={s.title}>Countries App</h1>
          <div className={s.linkList}>
            <Link className={s.link2} to="/countries">
              HOME
            </Link>
            <Link className={s.link} to="/activity">
              CREATE ACTIVITY
            </Link>
            {/* <Link className={s.link3} to="/activity">
              ABOUT
            </Link> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
