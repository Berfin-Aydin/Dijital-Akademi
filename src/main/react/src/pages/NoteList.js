import React, { Component } from 'react'
import {addNoteToLibrary, getNotes} from "../api/apiCalls";
import {Link} from "react-router-dom";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {loginHandler, loginSuccess} from "../redux/authActions";
import {connect} from "react-redux";
import { Toast } from 'primereact/toast';

class NoteList extends Component {

    state={
        notes: [],
        addLibraryDialog: false,
        note: undefined,
        selectedNote: undefined
    }

    componentDidMount() {
        //Sayfa yüklenirken bir kere çalışır
        this.getNotesList();

    }
    getNotesList= async ()=>{
        try {
            const response = await getNotes();
            this.setState({
                notes: response.data
            });
        }catch (e) {
            console.log(e)
        }
    }

    confirmAddNote =  (note)=>  {
        this.setState({
            note: note,
            addLibraryDialog: true
        });
    }

    actionBodyTemplate =  (rowData) =>  {
        return (
            <React.Fragment>
                <Button icon="pi pi-upload" className="p-button-rounded p-button-warning" onClick={()=>this.confirmAddNote(rowData)} />
            </React.Fragment>
        );
    }

    hideAddLibraryDialog =() =>  {
        this.setState({
            addLibraryDialog: false,
            note: undefined
        });
    }

    addNoteToLibrary = async () => {
        //Kütüphanaye not ekleme işlemleri olacak
        const userName = this.props.loginSuccess.userName
        const {note} = this.state
        try {
            await addNoteToLibrary(userName, note);
            this.toast.show({
                severity: 'success',
                summary: 'Başarılı Mesaj',
                detail: 'Kütüphaneye Eklendi'
            });
            this.hideAddLibraryDialog()
        }catch (err) {
            console.log(err);
            this.toast.show({
                severity: 'error',
                summary: 'Hata Mesajı',
                detail: 'Kütüphaneye eklenemedi.'
            });
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.notes !== prevProps.notes){
            this.getNotesList();
        }
    }

    render() {
        let notes = [];
        let notFoundNotes = undefined
        if(this.props.notes === "NOT_FOUND"){
            notFoundNotes= "Not Bulunamadı"
        }
        else if(this.props.notes && this.props.notes.length > 0  ){
            notes = this.props.notes
        }else{
            notes = this.state.notes
        }
        const addLibraryDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideAddLibraryDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.addNoteToLibrary} />
            </React.Fragment>
        );
        return (
            <div>
                <Toast ref={(el) => this.toast = el} />
                {!notFoundNotes && <DataTable ref={(el) => this.dt = el}
                                              value={notes}
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
                    <Column body={this.actionBodyTemplate}/>
                </DataTable>}
                {notFoundNotes && <div>{notFoundNotes}</div>}

                <Dialog visible={this.state.addLibraryDialog} style={{ width: '450px' }}
                        header="Confirm" modal footer={addLibraryDialogFooter} onHide={this.hideAddLibraryDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.note && <span>Kütüphaneye eklensin  <b>{this.state.note.noteName}</b> mi?</span>}
                    </div>
                </Dialog>
            </div>
        )
    }
}
const mapStateToProps = (store) => {
    return {
        loginSuccess: store
    }
}

export default connect(mapStateToProps)(NoteList);
