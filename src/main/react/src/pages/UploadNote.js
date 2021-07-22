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
        file: null,
        fileType: undefined,
        selectedCategory: undefined,
        docName: undefined,
        errorFileType: false
    }
    fileType=['application/pdf'];
    onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        if(file&& this.fileType.includes(file.type)){
            const fileReader = new FileReader();

            fileReader.onloadend = () => {
                this.setState({
                    file: fileReader.result,
                    fileType: file.type
                })
            }
            fileReader.readAsDataURL(file);
            this.setState({
                errorFileType: false
            })
        }else{
            this.setState({
                errorFileType: true
            })
        }
    }

    onClickUpload = async () => {
        const {file, selectedCategory, docName, fileType} = this.state;
        const userName = this.props.loginSuccess.userName
        const body = {
            noteName: docName,
            noteDate: null,
            noteCategory: null,
            noteFilePath: null,
            notePublisherUserId: null,
            notePublisherComment: null,
            multipartFile: null,
            noteDownloadCount: 0,
            docType: fileType,
            data: file,

        }
        const response = await addNote(body, selectedCategory.code, userName);
        this.props.onHideDialog();

    }

    onCategoryChange = (event) => {
        this.setState({
            selectedCategory: event.value
        })
    }

    onChangeFileName = (event) => {
        this.setState({
            docName: event.target.value
        });
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

        const {selectedCategory, errorFileType, docName, } = this.state

        return (
            <div className="form-group">
                <InputText className="form-control-file" type="file" onChange={this.onChangeFile}/>
                {errorFileType && <div className='error-msg'>
                    Yanlış dosya tipi lütfen pdf şeçin
                </div>}
                <div className="p-grid p-fluid">
                    <div className="p-col-12 p-md-12">
                        <div className="p-inputgroup">
                            <InputText placeholder="Dosya Adı" onChange={this.onChangeFileName}/>
                        </div>
                    </div>

                    <div className="p-col-12 p-md-12">
                        <div className="p-inputgroup">
                            <Dropdown
                                options={categories}
                                onChange={this.onCategoryChange}
                                value={selectedCategory}
                                optionLabel="name"
                                placeholder="Kategori Seçiniz"/>
                        </div>
                    </div>

                    <Button label="Not Yükle"
                            disabled={errorFileType || !docName || !selectedCategory}
                            onClick={this.onClickUpload}
                            loadingOptions={{position: 'right'}}/>

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
