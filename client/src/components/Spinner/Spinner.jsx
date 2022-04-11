import React from "react";
import s from "../Spinner/Spinner.module.css";

function Spinner() {
  return (
    <div className={s.ring}>
      Loading
      <span className={s.loadingSpan}></span>
    </div>
  );
}

export default Spinner;
