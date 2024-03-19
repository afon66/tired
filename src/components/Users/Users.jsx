import React from "react";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import styles from "./Users.module.css";
import { useSelector } from "react-redux";
import Preloader from "../Common/Preloader/Preloader";

let Users = () => {
  const users = useSelector((state) => state.usersPage.users);
  return (
    <div>
      <Preloader />
      {/* <UsersSearchForm /> */}
      <div className={styles.container}>
        <Paginator />
        {users.map((user) => (
          <User u={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
