import React from "react";
import { useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import {theme} from './Theme'

const Title = styled.div`
  color: ${() => theme.colors.title};
  background-color: red;
  & h1 {
    border: ${() => theme.colors.border};
  }
`;

const Task = styled.a`
  text-decoration: ${(props) => (props.isAuth ? "line-through" : "none")};
`;

const Music = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <ThemeProvider theme={theme}>
      <Title>
        <h1>hello guys</h1>
        <p>hello I am paragraph</p>
      </Title>
      <Task
        // style={{ textDecoration: isAuth ? "line-through" : "none" }}
        isAuth={isAuth}
        href=""
      >
        hellYou mwf
      </Task>
    </ThemeProvider>
  );
};

export default Music;
