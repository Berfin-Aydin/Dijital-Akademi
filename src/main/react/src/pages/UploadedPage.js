import React, {Component} from 'react';
import {FileUpload} from "primereact/fileupload";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/saga-blue/theme.css';

import 'primeflex/primeflex.css';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import UploadNote from "./UploadNote";
import Navbar from "./Navbar";
import {getNoteByUserName, getNoteData} from "../api/apiCalls";
import {connect} from "react-redux";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import LibraryPdfViewer from "./LibraryPdfViewer";
import {Toolbar} from "primereact/toolbar";

class UploadedPage extends Component {

    state = {
        visibilityDialog: false,
        notes: []
    }

    componentDidMount() {
        this.getNotes()
    }

    getNotes = async () => {
        try {
            const {userName} = this.props.loginSuccess
            const response = await getNoteByUserName(userName);
            this.setState({
                notes: response.data
            })
        } catch (e) {
            console.log(e)
        }
    }

    onHideDialog = () => {
        this.setState({
            visibilityDialog: false
        })
    }

    onClickDialog = () => {
        this.setState({
            visibilityDialog: true
        })
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

    header = () => {
        return (
            <div className="container">
                <Button style={{'fontSize': '1.5em'}} onClick={this.onClickDialog}> Not Yükle
                </Button>
                {/*<i className="pi pi-upload" style={{'fontSize': '1.5em'}} onClick={this.onClickDialog}></i>*/}

                <Dialog
                    visible={this.state.visibilityDialog}
                    onHide={this.onHideDialog}
                    header="Ders Notu Yükle"
                >
                    <UploadNote onHideDialog={this.onHideDialog}/>
                </Dialog>

            </div>
        )
    }
    rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="container">
                    <Button style={{'fontSize': '1em'}} onClick={this.onClickDialog}>
                        <i className="pi pi-upload p-mr-3" style={{'fontSize': '1.5em'}} />
                        Not Yükle
                    </Button>
                    {/*<i className="pi pi-upload" style={{'fontSize': '1.5em'}} onClick={this.onClickDialog}></i>*/}

                    <Dialog
                        visible={this.state.visibilityDialog}
                        onHide={this.onHideDialog}
                        header="Ders Notu Yükle"
                    >
                        <UploadNote onHideDialog={this.onHideDialog}/>
                    </Dialog>

                </div>
            </React.Fragment>
        )
    }

    render() {
        return (
            <>
                <Navbar/>

                <div className="container">
                    <Toolbar className="p-mb-4" right={this.rightToolbarTemplate}></Toolbar>
                    <DataTable ref={(el) => this.dt = el}
                               value={this.state.notes}
                               selection={this.state.selectedNote}
                               onSelectionChange={(e) => this.setState({selectedNote: e.value})}
                               dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                               globalFilter={this.state.globalFilter}
                               header="Yüklediklerim">

                        <Column headerStyle={{width: '3rem'}}/>
                        <Column field="notePublisherUserId" header="Not Yükleyen Kişi" sortable/>
                        <Column field="noteName" header="Name" sortable/>
                        <Column field="noteCategory" header="Category"/>
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
export default connect(mapStateToProps)(UploadedPage);
