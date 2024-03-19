import React from "react";
import s from "./../Dialogs.module.css";

const Message = (props) => {
  return (
    <div className={s.messageWrapper}>
      <div >{props.message}</div>
      <div id="closeButton">&times;</div>
    </div>
  );
};

export default Message;
