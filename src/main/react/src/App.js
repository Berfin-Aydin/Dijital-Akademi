import React, { Profiler } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { MenuItem, Menu, Button } from '@material-ui/core';
import Login from './pages/Login';
import SearchBox from './pages/SearchBox';
import SignUp from './pages/SignUp';
import Dashboard from './layouts/Dashboard';
import { Route } from "react-router-dom"
import 'primeflex/primeflex.css';
import Navbar from './pages/Navbar';
import Profile from './pages/Profile';
class App extends React.Component {

  render() {
    return (
      <Profile/>
   
   

    );
  }
}
export default App;
