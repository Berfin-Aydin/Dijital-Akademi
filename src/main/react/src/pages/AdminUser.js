import React, {Component} from 'react';
import {connect} from "react-redux";
import {Toast} from "primereact/toast";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {deleteUser1, getUsers} from "../api/apiCalls";
import {Button} from "primereact/button";

class AdminUser extends Component {
    state = {
        users: [],
        selectedUser: undefined,
        userSurname: "",
        user: undefined,
        userDeleteDialog: false
    }

    componentDidMount() {
        this.getUser();
    }
    getUser =()=>{
        getUsers().then(response => {
                console.log("users", response.data);
                this.setState({
                        users: response.data

                    }
                )
            }
        )
    }

    confirmAddNote = (user) => {
        this.setState({
            user: user,
            userDeleteDialog: true
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
    hideDeleteUserDialog = () => {
        this.setState({
            userDeleteDialog: false,
            user: undefined
        });
    }
    deleteUserToAdmin = async () => {
        try {
            await deleteUser1(this.state.user.userName);
            this.toast.show({
                severity: 'success',
                summary: 'Başarılı Mesaj',
                detail: 'Kullanıcı silindi'
            });
            this.hideDeleteUserDialog();
            this.getUser();
        } catch (err) {
            console.log(err);
            this.toast.show({
                severity: 'error',
                summary: 'Hata Mesajı',
                detail: 'Kullanıcı silinemedi.'
            });
        }

    }

    render() {
        const userDeleteDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteUserDialog}/>
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteUserToAdmin}/>
            </React.Fragment>
        );
        return (
            <div>
                <Toast ref={(el) => this.toast = el}/>
                <DataTable ref={(el) => this.dt = el}
                           value={this.state.users}
                           selection={this.state.selectedUser}
                           onSelectionChange={(e) => this.setState({selectedUser: e.value})}
                           dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                           globalFilter={this.state.globalFilter}
                           header="Kullanıcılar">
                    <Column headerStyle={{width: '3rem'}}/>
                    <Column field="userEmailAddress" header="E-posta"/>
                    <Column field="userName" header="İsim" sortable/>
                    <Column field="userSurname" header="Soyad"/>
                    <Column field="userPhone" header="Telefon"/>
                    <Column body={this.actionBodyTemplate}/>


                </DataTable>
                <Dialog visible={this.state.userDeleteDialog} style={{width: '450px'}}
                        header="Confirm" modal footer={userDeleteDialogFooter} onHide={this.hideDeleteUserDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                        {this.state.user &&
                        <span><b>{this.state.user.userName}</b> silmek istediğinize emin  misiniz?  </span>}
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

export default connect(mapStateToProps)(AdminUser);

