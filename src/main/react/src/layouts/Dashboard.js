import React, {Component} from 'react'
import SearchBox from '../pages/SearchBox';
import NoteList from '../pages/NoteList';
import Navbar from '../pages/Navbar';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Navbar></Navbar>

                <div className="flexgrid-demo">

                    <div >
                        <div className="p-col-5 p-offset-3">
                            <div className="box">
                                <SearchBox/>
                            </div>
                        </div>
                        <div className="p-col-7 p-offset-4">
                            <div className="box">
                                <NoteList/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }

}
