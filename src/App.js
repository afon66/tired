import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import Users from "./components/Users/Users";
import { Route, Routes } from "react-router-dom";
import Login from './components/Login/Login';
import { initializeApp } from './redux/app-reducer';
import { connect } from 'react-redux';
import Preloader from './components/Common/Preloader/Preloader';
import Music from './components/Music/Music';

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {

    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className='app-wrapper' >
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/dialogs/:userId?'
              element={<Dialogs />} />
            <Route path='/profile/:userId?'
              element={<Profile />} />
            <Route path='/users'
              element={<Users />} />
            <Route path='/login' element={<Login />} />
            <Route path='/music' element={<Music />} />
          </Routes>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, { initializeApp })(App);