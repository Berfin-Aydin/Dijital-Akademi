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
import {connect} from "react-redux";


class UploadNote extends Component {

    state = {
        file: undefined,
        files: null,
        selectedCategory: undefined
    }

    onChangeFile=(event)=>{
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
        const {file, files, selectedCategory} = this.state;
        const attachment = new FormData();
        attachment.append("multipartFile", files)
        const userName = this.props.loginSuccess.userName
        const response  = await addNote(attachment, selectedCategory.code, userName);

    }

    onCategoryChange =(event)=>{
        this.setState({
            selectedCategory: event.value
        })
    }

    render() {
            const categories = [
            {name: 'MATEMATIK', code: 'MATEMATIK'},
            {name: 'KIMYA', code: 'KIMYA'},
            {name: 'GEOMETRI', code: 'GEOMETRI'},
            {name: 'BIYOLOJI', code: 'BIYOLOJI'},
            {name: 'BILGISAYAR', code: 'BILGISAYAR'},
            {name: 'TARIH', code: 'TARIH'},
            {name: 'TURKCE', code: 'TURKCE'},
            {name: 'EDEBIYAT', code: 'EDEBIYAT'}
        ];

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
                            <Dropdown
                                options={categories}
                                onChange={this.onCategoryChange}
                                value={this.state.selectedCategory}
                                       optionLabel="name"
                                placeholder="Kategori Seçiniz" />
                        </div>
                    </div>

                    <Button label="Not Yükle" onClick={this.onClickUpload} loadingOptions={{ position: 'right' }} />

                </div>
            </div>
        );
    }
}
const mapStateToProps = (store) => {
    return {
        loginSuccess: store
    }
}

export default connect(mapStateToProps)(UploadNote);