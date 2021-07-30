import React, {Component} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {deleteNotes, deleteNotesFromLibrary, getLibraryNotes, getNoteData} from "../api/apiCalls";
import {connect} from "react-redux";
import {Document, Page} from "react-pdf";
import {Button} from "primereact/button";
import LibraryPdfViewer from "./LibraryPdfViewer";
import Navbar from "./Navbar";
import {Dialog} from "primereact/dialog";
import {Toast} from "primereact/toast";

class LibraryPage extends Component {
    state = {
        library: [],
        notes: null,
        noteData: undefined,
        pageNumber: 1,
        note: undefined,
        removeLibraryDialog: false,
    }

    componentDidMount() {
        const userName = this.props.loginSuccess.userName;
        this.getLibraryNotes(userName)
    }

    getLibraryNotes = (userName) => {
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

    confirmAddNote = (note) => {
        this.setState({
            note: note,
            removeLibraryDialog: true
        });
    }

    actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger"
                        onClick={() => this.confirmAddNote(rowData)}/>
            </React.Fragment>
        );
    }

    deleteNote = async () => {
        const {noteId} = this.state.note
        const {userName} = this.props.loginSuccess
        deleteNotesFromLibrary(noteId, userName).then(response => {
            this.toast.show({
                severity: 'success',
                summary: 'Başarılı Mesaj',
                detail: 'Kütüphaneden not silindi.'
            });
            this.getLibraryNotes(userName)
        }).catch(err=>{
            console.log(err.data)
            this.toast.show({
                severity: 'error',
                summary: 'Hata Mesajı',
                detail: 'Kütüphaneden not silinemedi.'
            });
        })
        this.hideDialog();
    }

    hideDialog = () => {
        this.setState({
            removeLibraryDialog: false,
            note: undefined
        });
    }

    render() {
        const removeLibraryDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog}/>
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteNote}/>
            </React.Fragment>
        );
        return (
            <>
                <Toast ref={(el) => this.toast = el}/>
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
                        <Column body={this.actionBodyTemplate}/>
                    </DataTable>
                    <div>
                        {this.state.noteData &&
                        <LibraryPdfViewer viewPdf={this.state.noteData}/>
                        }
                    </div>
                    <Dialog visible={this.state.removeLibraryDialog} style={{width: '450px'}}
                            header="Confirm" modal footer={removeLibraryDialogFooter} onHide={this.hideDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                            {this.state.note &&
                            <span>Not kütüphaneden kaldırılsın <b>{this.state.note.noteName}</b> mi?</span>}
                        </div>
                    </Dialog>
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
