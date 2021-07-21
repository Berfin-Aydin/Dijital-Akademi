import React, {Component} from 'react';
import {connect} from "react-redux";
import {getNotes} from "../api/apiCalls";
import {deleteNotes} from "../api/apiCalls";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";

class AdminNote extends Component {
    state = {
        notes: [],
        addLibraryDialog: false,
        note: undefined,
        selectedNote: undefined,

    }

    componentDidMount() {
        //Sayfa yüklenirken bir kere çalışır
        getNotes().then(response => {
            console.log("bbbeer", response.data)
            this.setState({
                notes: response.data
            });
        });
    }

    confirmAddNote = (note) => {
        this.setState({
            note: note,
            addLibraryDialog: true
        });
    }

    actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"
                        onClick={() => this.confirmAddNote(rowData)}/>
            </React.Fragment>
        );
    }

    hideAddLibraryDialog = () => {
        this.setState({
            addLibraryDialog: false,
            note: undefined
        });
    }

    deleteNoteToAdmin = async () => {
        const {noteId} = this.state.note
        try {
            await deleteNotes(noteId);
            this.toast.show({
                severity: 'success',
                summary: 'Başarılı Mesaj',
                detail: 'Kütüphaneye Eklendi'
            });
            this.hideAddLibraryDialog()
        } catch (err) {
            console.log(err);
            this.toast.show({
                severity: 'error',
                summary: 'Hata Mesajı',
                detail: 'Kütüphaneye eklenemedi.'
            });
        }

    }

    render() {
        const addLibraryDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideAddLibraryDialog}/>
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteNoteToAdmin}/>
            </React.Fragment>
        );
        return (
            <div>
                <Toast ref={(el) => this.toast = el}/>
                <DataTable ref={(el) => this.dt = el}
                           value={this.state.notes}
                           selection={this.state.selectedNote}
                           onSelectionChange={(e) => this.setState({selectedNote: e.value})}
                           dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                           globalFilter={this.state.globalFilter}
                           header="Notlar">

                    <Column headerStyle={{width: '3rem'}}/>
                    <Column field="notePublisherUserId" header="Not Yükleyen Kişi" sortable/>
                    <Column field="noteName" header="Name" sortable/>
                    <Column field="noteCategory" header="Category"/>
                    <Column field="noteId" header="ıd"/>
                    <Column body={this.actionBodyTemplate}/>
                </DataTable>

                <Dialog visible={this.state.addLibraryDialog} style={{width: '450px'}}
                        header="Confirm" modal footer={addLibraryDialogFooter} onHide={this.hideAddLibraryDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                        {this.state.note && <span>Kütüphaneye eklensin  <b>{this.state.note.noteName}</b> mi?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        loginSuccess: store
    }
}

export default connect(mapStateToProps)(AdminNote);
