import React, { useState } from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import SendBtn from "./SendBtn/SendBtn";
import { useDispatch, useSelector } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthContainer";
import { sendMessage } from "../../redux/dialogs-reducer";

const Dialogs = (props) => {
  const dispatch = useDispatch();
  const dialogsPage = useSelector((state) => state.dialogsPage);

  // Состояние для хранения выбранного пользователя
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Фильтрация сообщений по выбранному пользователю
  const messagesToShow = selectedUserId
    ? dialogsPage.messages.filter((msg) => msg.userId === selectedUserId)
    : dialogsPage.messages;

  let dialogsElements = dialogsPage.dialogs.map((d) => (
    <DialogItem
      name={d.name}
      key={d.id}
      id={d.id}
      setSelectedUserId={setSelectedUserId}
    />
  ));
  let messagesElements = messagesToShow.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  const onSendMessageClick = (value) => {
    dispatch(sendMessage({selectedUserId, value}));
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <SendBtn onSendMessageClick={onSendMessageClick} />
      </div>
    </div>
  );
};

export default withAuthRedirect(Dialogs);


// import React from "react";
// import s from "./Dialogs.module.css";
// import DialogItem from "./DialogItem/DialogItem";
// import Message from "./Message/Message";
// import FormSubForMess from "./FormSubForMess/FormSubForMess";
// import { useDispatch, useSelector } from "react-redux";
// import { withAuthRedirect } from "../../hoc/withAuthContainer";
// import {sendMessage} from '../../redux/dialogs-reducer'

// const Dialogs = (props) => {
//   const dispatch = useDispatch();
//   const dialogsPage = useSelector((state) => state.dialogsPage);

//   let dialogsElements = dialogsPage.dialogs.map((d) => (
//     <DialogItem name={d.name} key={d.id} id={d.id} />
//   ));
//   let messagesElements = dialogsPage.messages.map((m) => (
//     <Message message={m.message} key={m.id} />
//   ));

//   let onSendMessageClick = (value) => {
//     dispatch(sendMessage(value));
//   };

//   return (
//     <div className={s.dialogs}>
//       <div className={s.dialogsItems}>{dialogsElements}</div>
//       <div className={s.messages}>
//         <div>{messagesElements}</div>
//         <FormSubForMess onSendMessageClick={onSendMessageClick} />
//       </div>
//     </div>
//   );
// };

// export default withAuthRedirect(Dialogs);
