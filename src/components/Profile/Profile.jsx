import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";
import { useParams } from "react-router-dom";
import { getProfile, getStatus } from "../../redux/profile-reducer";
import { useDispatch, useSelector } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthContainer";
import React, { useEffect } from "react";

const Profile = () => {
  let { userId } = useParams();
  const authorizedUserId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) {
      userId = authorizedUserId;
    }
    dispatch(getProfile(userId));
    dispatch(getStatus(userId));
  }, [ dispatch]);
  return (
    <div>
      <ProfileInfo />
      <MyPosts />
    </div>
  );
};

export default withAuthRedirect(Profile);
