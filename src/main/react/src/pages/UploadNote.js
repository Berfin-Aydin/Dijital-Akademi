import React, {Component} from 'react';
import {FileUpload} from "primereact/fileupload";
import {InputText} from "primereact/inputtext";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/saga-blue/theme.css';

import 'primeflex/primeflex.css';
import {Checkbox} from "primereact/checkbox";
import {RadioButton} from "primereact/radiobutton";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {addNote} from "../api/apiCalls";


class UploadNote extends Component {

    state = {
        file: undefined,
        category: "MAtematik",
        files: null
    }
    onChangeFile=(event)=>{
        console.log("vent", event.target.files)
        if(event.target.files.length <1){
            return;
        }

        const file = event.target.files[0];
        const fileReader = new  FileReader();

        fileReader.onloadend = () => {
            this.setState({
                file:fileReader.result,
                files: file
            })
        }
        fileReader.readAsDataURL(file);
    }

    onClickUpload = async ()=> {
        const {file, category, files} = this.state;
        console.log("file", file)
        const attachment = new FormData();

        attachment.append("multipartFile", files)
        const response  = await addNote(attachment, category);

    }

    render() {
        return (
            <div className="form-group">
                <InputText className="form-control-file" type="file" onChange={this.onChangeFile}/>

                <div className="p-grid p-fluid">
                    <div className="p-col-12 p-md-12">
                        <div className="p-inputgroup">
                            <InputText placeholder="Dosya Adı"  disabled={true}/>
                        </div>
                    </div>

                    <div className="p-col-12 p-md-12">
                        <div className="p-inputgroup">
                            <Dropdown optionLabel="name" placeholder="Kategori Seçiniz" />
                        </div>
                    </div>

                    <Button label="Not Yükle" onClick={this.onClickUpload} loadingOptions={{ position: 'right' }} />

                </div>
            </div>
        );
    }
}

export default UploadNote;