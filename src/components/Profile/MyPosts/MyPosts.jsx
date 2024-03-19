import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import SendBtn from "./SendBtn/SendBtn";
import { useSelector } from "react-redux";

const MyPosts = () => {
const posts = useSelector(state => state.profilePage.posts)

  let postsElements = posts.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} />
  ));

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <SendBtn />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
