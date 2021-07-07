import React, { Component } from 'react'
import {getNotes} from "../api/apiCalls";

export default class NoteList extends Component {

    state={
        notes: []
    }

    componentDidMount() {
        //Sayfa yüklenirken bir kere çalışır

        getNotes().then(response => {
            console.log("response", response)
            this.setState({
                notes: response.data
            });
        } );
    }

    render() {
        return (
            <div>
                Notlar
            </div>
        )
    }
}
