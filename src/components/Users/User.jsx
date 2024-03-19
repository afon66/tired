import React from "react";
import { NavLink } from "react-router-dom/dist";
import userPhoto from "../../assets/images/user.png";
import styles from "./Users.module.css";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../../redux/users-reducer";

let User = ({ u }) => {
  const followingInProgress = useSelector(
    (state) => state.usersPage.followingInProgress
  );
  const dispatch = useDispatch();
  return (
    <div>
      <div key={u.id}>
        <span>
          <div>
            <NavLink to={"/profile/" + u.id}>
              <img
                src={u.photos.small != null ? u.photos.small : userPhoto}
                className={styles.userPhoto}
              />
            </NavLink>
          </div>
          <div>
            {u.followed ? (
              <button
                disabled={followingInProgress.some((id) => id === u.id)}
                onClick={() => {
                  dispatch(unfollow(u.id));
                }}
              >
                Unfollow
              </button>
            ) : (
              <button
                disabled={followingInProgress.some((id) => id === u.id)}
                onClick={() => {
                  dispatch(follow(u.id));
                }}
              >
                Follow
              </button>
            )}
          </div>
        </span>
        <span>
          <div>{u.name}</div>
          <div>{u.status}</div>
        </span>
      </div>
    </div>
  );
};

export default User;
