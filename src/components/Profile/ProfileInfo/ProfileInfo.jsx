import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import { useSelector } from "react-redux";

const ProfileInfo = () => {
  const profile = useSelector(state => state.profilePage.profile)

  if (!profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div>
        <ProfileStatus />
      </div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large} alt="" />
        <img src={profile.photos.small} alt="" />
        <h5>{profile.aboutMe}</h5>
        <h5>Name: {profile.fullName}</h5>
        <h5>{profile.lookingForAJobDescription}</h5>
        <h5>{profile.contacts.instagram}</h5>
      </div>
    </div>
  );
};

export default ProfileInfo;