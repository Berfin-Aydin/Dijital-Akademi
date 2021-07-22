import React, {Component} from 'react'
import SearchBox from '../pages/SearchBox';
import NoteList from '../pages/NoteList';
import Navbar from '../pages/Navbar';
import Footer from "../pages/Footer";

export default class Dashboard extends Component {

    state={
        notes: []
    }
    searchNote=(notes) =>{
        this.setState({
            notes
        })
    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="flexgrid-demo">
                    <div >
                        <div className="p-col-5 p-offset-3">
                            <div className="box">
                                <SearchBox searchNote ={this.searchNote}/>
                            </div>
                        </div>
                        <div className="p-col-7 p-offset-3">
                            <div className="box">
                                <NoteList notes = {this.state.notes}/>
                            </div>
                        </div>
                    </div>

                </div>
                <Footer></Footer>
            </div>

        )
    }

}
