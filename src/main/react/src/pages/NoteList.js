import React, { Component } from 'react'
import {getNotes} from "../api/apiCalls";
import {Link} from "react-router-dom";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";

export default class NoteList extends Component {

    state={
        notes: [],
        deleteProductDialog: false
    }

    componentDidMount() {
        //Sayfa yüklenirken bir kere çalışır

        getNotes().then(response => {
            console.log("response", response)
            this.setState({
                notes: response.data
            });
        } );
    }

    confirmDeleteProduct(product) {
        this.setState({
            product,
            deleteProductDialog: true
        });
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    hideDeleteProductDialog() {
        this.setState({ deleteProductDialog: false });
    }

    render() {

        return (
            <div>
                {/*<DataTable ref={(el) => this.dt = el}*/}
                {/*           value={this.state.notes}*/}
                {/*           selection={this.state.selectedProducts}*/}
                {/*           onSelectionChange={(e) => this.setState({ selectedProducts: e.value })}*/}
                {/*           dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}*/}
                {/*           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"*/}
                {/*           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"*/}
                {/*           globalFilter={this.state.globalFilter}*/}
                {/*           header={header}>*/}

                {/*    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}/>*/}
                {/*    <Column field="code" header="Code" sortable/>*/}
                {/*    <Column field="name" header="Name" sortable/>*/}
                {/*    <Column header="Image" body={this.imageBodyTemplate}/>*/}
                {/*    <Column field="price" header="Price" body={this.priceBodyTemplate} sortable/>*/}
                {/*    <Column field="category" header="Category" sortable/>*/}
                {/*    <Column field="rating" header="Reviews" body={this.ratingBodyTemplate} sortable/>*/}
                {/*    <Column field="inventoryStatus" header="Status" body={this.statusBodyTemplate} sortable/>*/}
                {/*    <Column body={this.actionBodyTemplate}/>*/}
                {/*</DataTable>*/}

                {/*<Dialog visible={this.state.deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={this.hideDeleteProductDialog}>*/}
                {/*    <div className="confirmation-content">*/}
                {/*        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />*/}
                {/*        {this.state.product && <span>Are you sure you want to delete <b>{this.state.product.name}</b>?</span>}*/}
                {/*    </div>*/}
                {/*</Dialog>*/}
            </div>
        )
    }
}
