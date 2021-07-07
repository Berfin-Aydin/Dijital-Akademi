import React, { Component } from 'react'
import SearchBox from '../pages/SearchBox';
import NoteList from '../pages/NoteList';
import { Route } from "react-router-dom"
import 'primeflex/primeflex.css';
import Login from '../pages/Login';
import Navbar from '../pages/Navbar';


export default class Dashboard extends Component {
    render() {
        return (
            <div>
                 <Navbar ></Navbar>
                <div className="flexgrid-demo">
               
                <div className="p-grid">
                        <div className="p-col-6 p-offset-3">
                            <div className="box">
                                <SearchBox />
                            </div>
                        </div>
                    </div>

                    <div className="p-grid">
                        <div className="p-col-8 p-offset-4">
                            <div className="box">
                                <NoteList />
                            </div>
                        </div>
                    </div>
                
            </div>
            </div>
           
        )
    }

}
