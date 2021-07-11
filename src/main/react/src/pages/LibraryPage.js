import React, {Component} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {getLibraryNotes} from "../api/apiCalls";
import {connect} from "react-redux";

class LibraryPage extends Component {
    state = {
        notes: null
    }

    componentDidMount() {
        const userName=this.props.loginSuccess.userName;
        console.log("ressponse", userName)
        getLibraryNotes(userName).then(response => {
            this.setState({
                notes: response.data
            });

        });
    }

    render() {
        return (
            <div>
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
                    <Column body={this.actionBodyTemplate}/>
                </DataTable>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        loginSuccess: store
    }
}

export default connect(mapStateToProps)(LibraryPage);