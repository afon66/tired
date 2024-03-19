import React from "react";
import s from "./../Dialogs.module.css";
import { NavLink } from "react-router-dom";

const DialogItem = (props) => {
  // Функция обратного вызова для клика по пользователю
  const handleClick = () => {
    props.setSelectedUserId(props.id);
  };

  return (
    <div className={s.dialog + " " + s.active}>
      <NavLink to={"/dialogs/" + props.id} onClick={handleClick}>
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogItem;


// import React from 'react';
// import s from './../Dialogs.module.css';
// import {NavLink} from "react-router-dom";

// const DialogItem = (props) => {
//     let path = "/dialogs/" + props.id;

//     return <div className={s.dialog + ' ' + s.active}>
//         <NavLink to={path}>{props.name}</NavLink>
//     </div>
// }

// export default DialogItem;