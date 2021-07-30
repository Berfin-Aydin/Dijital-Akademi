import React, {Component} from 'react';
import {connect} from "react-redux";
import {getNoteData, getNotes} from "../api/apiCalls";
import {deleteNotes} from "../api/apiCalls";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import LibraryPdfViewer from "./LibraryPdfViewer";
import {Link} from "react-router-dom";
import logo from "../images/logo.png";
import {logoutSuccess} from "../redux/authActions";

class AdminNote extends Component {
    state = {
        notes: [],
        addLibraryDialog: false,
        note: undefined,
        selectedNote: undefined,
        viewNote: false
    }

    componentDidMount() {
        //Sayfa yüklenirken bir kere çalışır
        this.getAdminNotes();
    }

    getAdminNotes = () => {
        getNotes().then(response => {
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger"
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
    hideViewNoteDialog = () => {
        this.setState({
            viewNote: false
        });
    }

    deleteNoteToAdmin = async () => {
        const {noteId} = this.state.note
        try {
            await deleteNotes(noteId);
            this.toast.show({
                severity: 'success',
                summary: 'Başarılı Mesaj',
                detail: 'Not silindi.'
            });
            this.getAdminNotes();
        } catch (err) {
            console.log(err);
            this.toast.show({
                severity: 'error',
                summary: 'Hata Mesajı',
                detail: 'Not silinemedi.'
            });
        }
        this.hideAddLibraryDialog();
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
    onClickLogout = () => {
        this.props.logoutSuccess();
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
                <nav className="nav bg-purple justify-content-center">
                    <div className="d-flex align-items-lg-center mt-4 mt-lg-0 ">
                        <Link to={"/adminPage"} className="nav-link lead">
                            <Button class="btn btn-secondary">
                                Ana Sayfa
                            </Button>
                        </Link>
                    </div>
                    <Link>
                        <img src={logo} className="h-8" alt="..."/>
                    </Link>
                    <div className="d-flex align-items-lg-center mt-4 mt-lg-0 p-mr-6">
                        <Link to="/login" className="nav-link lead">
                            <Button class="btn btn-secondary" onClick={this.onClickLogout} >
                                Çıkış Yap
                            </Button>
                        </Link>
                    </div>
                </nav>
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
                    <Column body={this.viewPdfTemplate}/>
                    <Column body={this.actionBodyTemplate}/>
                </DataTable>

                <Dialog visible={this.state.viewNote} style={{width: '100rem'}}
                        header="Not Detayı" modal onHide={this.hideViewNoteDialog}>
                    <div>
                        {this.state.noteData &&
                        <LibraryPdfViewer viewPdf={this.state.noteData}/>
                        }
                    </div>
                </Dialog>

                <Dialog visible={this.state.addLibraryDialog} style={{width: '450px'}}
                        header="Confirm" modal footer={addLibraryDialogFooter} onHide={this.hideAddLibraryDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                        {this.state.note && <span>Not <b>{this.state.note.noteName}</b> silinsin mi?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        logoutSuccess: () => {
            return dispatch(logoutSuccess());
        }
    }
}
export default connect(null, mapDispatchToProps)(AdminNote);
