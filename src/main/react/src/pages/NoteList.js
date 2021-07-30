import React, { Component } from 'react'
import {addNoteToLibrary, getNoteData, getNotes} from "../api/apiCalls";
import {Link} from "react-router-dom";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {loginHandler, loginSuccess} from "../redux/authActions";
import {connect} from "react-redux";
import { Toast } from 'primereact/toast';
import LibraryPdfViewer from "./LibraryPdfViewer";

class NoteList extends Component {

    state={
        notes: [],
        addLibraryDialog: false,
        note: undefined,
        selectedNote: undefined,
        viewNote:false
    }

    componentDidMount() {
        //Sayfa yüklenirken bir kere çalışır
        this.getNotesList();

    }

    hideViewNoteDialog = () => {
        this.setState({
            viewNote: false
        });
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

        addNoteToLibrary(userName, note).then(response => {
            this.toast.show({
                severity: 'success',
                summary: 'Başarılı Mesaj',
                detail: 'Kütüphaneye Eklendi'
            });
        }).catch(error=>{
            const err = Object.assign({}, error)
            if(err.response.data.message === "Aynı not ekli"){
                this.toast.show({
                    severity: 'error',
                    summary: 'Hata Mesajı',
                    detail: 'Kütüphanede not ekli!'
                });
            }else{
                this.toast.show({
                    severity: 'error',
                    summary: 'Hata Mesajı',
                    detail: 'Kütüphaneye eklenemedi.'
                });
            }

        })
        this.hideAddLibraryDialog()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.notes !== prevProps.notes){
            this.getNotesList();
        }
    }

    getNoteData = async (rowData) => {
        if (rowData === {} || rowData === undefined)
            return;
        const {noteId} = rowData;
        try {
            const response = await getNoteData(noteId);
            this.setState({
                noteData: response.data,
                viewNote: true
            });
        } catch (err) {
            console.log(err)
        }

    }

    viewPdfTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-eye" className="p-button-rounded p-button-info"
                        onClick={() => this.getNoteData(rowData)}/>
            </React.Fragment>
        );
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
                    <Column body={this.viewPdfTemplate}/>
                    <Column body={this.actionBodyTemplate}/>
                </DataTable>}
                {notFoundNotes && <div>{notFoundNotes}</div>}

                <Dialog visible={this.state.viewNote} style={{width: '100rem'}}
                        header="Not Detayı" modal onHide={this.hideViewNoteDialog}>
                    <div>
                        {this.state.noteData &&
                        <LibraryPdfViewer viewPdf={this.state.noteData}/>
                        }
                    </div>
                </Dialog>

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
