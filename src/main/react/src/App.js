import React, {Profiler} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {MenuItem, Menu, Button} from '@material-ui/core';
import Login from './pages/Login';
import SearchBox from './pages/SearchBox';
import SignUp from './pages/SignUp';
import Dashboard from './layouts/Dashboard';
import {Route, Router} from "react-router-dom"
import 'primeflex/primeflex.css';
import Navbar from './pages/Navbar';
import Profile from './pages/Profile';
import UploadedPage from "./pages/UploadedPage";
import LibraryPage from "./pages/LibraryPage";

class App extends React.Component {

    render() {
        return (
            <div>
                <Route exact path="/" component={Dashboard}/>
                <Route path="/login" component={Login}/>
                <Route path="/signUp" component={SignUp}/>
                <Route path="/uploadedPage" component={UploadedPage}/>
                <Route path="/libraryPage" component={LibraryPage}/>
                <Route path="/profile" component={Profile}/>
            </div>
        );
    }
}

export default App;
