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

class UploadedPage extends Component {

    state = {
        visibilityDialog: false
    }

    onHideDialog = () => {
        this.setState({
            visibilityDialog: false
        })
    }

    onClickDialog=()=>{
        this.setState({
            visibilityDialog: true
        })
    }
    render() {
        return (
            <div className="container">

                <Button>
                    <i className="pi pi-upload" style={{'fontSize': '1.5em'}} onClick={this.onClickDialog}></i>
                </Button>
                <Dialog
                    visible={this.state.visibilityDialog}
                    onHide={this.onHideDialog}
                    header="Ders Notu Yükle"
                >
                    <UploadNote />
                </Dialog>

            </div>
        );
    }
}

export default UploadedPage;