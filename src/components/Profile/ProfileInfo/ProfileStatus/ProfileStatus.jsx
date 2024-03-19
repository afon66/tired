import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../../../../redux/profile-reducer";

const ProfileStatus = () => {
  const dispatch = useDispatch();
  const storeStatus = useSelector(state => state.profilePage.status)
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(storeStatus);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    dispatch(updateStatus(status));
  };
  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  useEffect(() => {
      setStatus(storeStatus);
  }, [storeStatus]);

  return (
    <div>
      {!editMode ? (
        <div>
          <span onDoubleClick={activateEditMode}>
            {storeStatus || "--------"}
          </span>
        </div>
      ) : (
        <div>
          <input
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status}
            onChange={onStatusChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
