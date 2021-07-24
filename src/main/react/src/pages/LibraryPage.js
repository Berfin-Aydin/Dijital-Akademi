import React, {Component} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {getLibraryNotes, getNoteData} from "../api/apiCalls";
import {connect} from "react-redux";
import {Document, Page} from "react-pdf";
import {Button} from "primereact/button";
import LibraryPdfViewer from "./LibraryPdfViewer";
import Navbar from "./Navbar";

class LibraryPage extends Component {
    state = {
        library: [],
        notes: null,
        noteData: undefined,
        pageNumber: 1
    }

    componentDidMount() {
        const userName = this.props.loginSuccess.userName;
        getLibraryNotes(userName).then(response => {
            let notes = response.data.map(note => note.noteId);
            this.setState({
                notes,
                library: response.data
            });

        });
    }

    getNoteData = async (rowData) => {
        if (rowData === {} || rowData === undefined)
            return;
        const {noteId} = rowData;
        try {
            const response = await getNoteData(noteId);
            this.setState({
                noteData: response.data
            });
        } catch (err) {
            console.log(err)
        }

    }

    viewPdfTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-eye" className="p-button-rounded p-button-warning"
                        onClick={() => this.getNoteData(rowData)}/>
            </React.Fragment>
        );
    }

    onDocumentLoadSuccess = ({numPages}) => {
        // setNumPages(numPages);
        console.log("numOages", numPages)
    }


    render() {
        return (
            <>
                <Navbar/>
                <div>
                    <DataTable ref={(el) => this.dt = el}
                               value={this.state.library}
                               selection={this.state.selectedNote}
                               onSelectionChange={(e) => this.setState({selectedNote: e.value})}
                               dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                               globalFilter={this.state.globalFilter}
                               header="Notlar">

                        <Column headerStyle={{width: '3rem'}}/>
                        {/*<Column field="userName" header="Not Yükleyen Kişi" sortable/>*/}
                        <Column field="docName" header="Name" sortable/>
                        <Column field="noteCategory" header="Category" sortable/>
                        <Column body={this.viewPdfTemplate}/>
                    </DataTable>
                    <div>
                        {this.state.noteData &&
                        <LibraryPdfViewer viewPdf={this.state.noteData}/>
                        }
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        loginSuccess: store
    }
}

export default connect(mapStateToProps)(LibraryPage);
