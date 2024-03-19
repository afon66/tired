import React from "react";
import preloader from "../../../assets/images/preloader.svg";
import "./Preloader.module.css";
import s from "./Preloader.module.css";
import { useSelector } from "react-redux";

const Preloader = () => {
  const isFetching = useSelector((state) => state.commonPage.isFetching);

  return (
    <div className={s.preloader}>
      {isFetching ? <img src={preloader} alt=""/> : null}
    </div>
  );
};

export default Preloader;
