import React, { useEffect } from "react";
import styles from "../../Users/Users.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setCurrentPage } from "../../../redux/users-reducer";

let Paginator = () => {
  const pageSize = useSelector((state) => state.usersPage.pageSize);
  const totalUsersCount = useSelector(
    (state) => state.usersPage.totalUsersCount
  );
  const currentPage = useSelector((state) => state.usersPage.currentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const onPageChanged = (pageNumber) => {
    dispatch(getUsers(pageNumber, pageSize));
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <div className={styles.container}>
      {pages.map((p) => {
        return (
          <span
            className={currentPage === p && styles.selectedPage}
            onClick={(e) => {
              onPageChanged(p);
            }}
          >
            {p}
          </span>
        );
      })}
    </div>
  );
};
export default Paginator;
