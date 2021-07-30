import React, {Component} from 'react';
import "./AdminPage.css"
import {PrimeIcons} from 'primereact/api';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import logo from "../images/logo.png";
import {Button} from "@material-ui/core";
import {logoutSuccess} from "../redux/authActions";

class AdminPage extends Component {

    onClickLogout = () => {
        this.props.logoutSuccess();
    }

    render() {
        return (
            <div>
                <nav className="nav bg-purple justify-content-center">
                    <div className="d-flex align-items-lg-center mt-4 mt-lg-0 p-mr-6" >
                        <Link to={"/adminPage"} className="nav-link lead" >
                            <Button class="btn btn-secondary">
                                Ana Sayfa
                            </Button>
                        </Link>
                    </div>
                    <Link>
                        <img src={logo} class="h-8" alt="..."/>
                    </Link>
                    <div className="d-flex align-items-lg-center mt-4 mt-lg-0 ">
                        <Button class="btn btn-secondary" onClick={this.onClickLogout} component={Link}
                                to="/login">
                            Çıkış Yap
                        </Button>

                    </div>
                </nav>
                <div>
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-lg-12 p-5">
                                <h1><i className="pi pi-users" style={{'fontSize': '2em'}}></i> Yönetim Paneli</h1>
                                <hr/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-3 col-lg-2 p-2">
                                <a className="text-decoration-none" href="#">
                                    <div className="card p-3 shadow bg-purple text-center border-0">
                                        <div className="card-body">
                                            <i className="pi pi-user-edit" style={{'fontSize': '2em'}}></i>
                                            <hr/>

                                            <Link className="nav-link lead" to="/adminUser">Kullanıcılar </Link>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="col-xs-6 col-sm-6 col-md-3 col-lg-2 p-2">
                                <a className="text-decoration-none" href="#">
                                    <div className="card p-3 shadow bg-purple text-center border-0">
                                        <div className="card-body">
                                            <i className="pi pi-file" style={{'fontSize': '2em'}}></i>
                                            <hr/>
                                            <Link className="nav-link lead" to="/adminNote">Notlar </Link>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="col-xs-6 col-sm-6 col-md-3 col-lg-2 p-2">
                                <a className="text-decoration-none" href="#">
                                    <div className="card p-3 shadow bg-purple text-center border-0">
                                        <div className="card-body">
                                            <i className="pi pi-info-circle" style={{'fontSize': '2em'}}></i>
                                            <hr/>
                                            <Link className="nav-link lead" to="/AdminAbout">Hakkımızda </Link>
                                        </div>
                                    </div>
                                </a>
                            </div>

                        </div>
                    </div>

                    <div className="modal fade" id="modelHELP" tabIndex="-1" role="dialog"
                         aria-labelledby="modelTitleId"
                         aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title"><i className="fa fa-question-circle-o"
                                                                   aria-hidden="true"></i> Technical Support
                                        24/7</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body p-5">
                                    <p>
                                        <small>(Mon - Sat / 10AM - 6PM)</small>
                                    </p>
                                    <hr/>
                                    <p><i className="fa fa-envelope mr-3" aria-hidden="true"></i></p>
                                    <p><i className="fa fa-volume-control-phone mr-3"
                                          aria-hidden="true"></i> +91-123654789
                                    </p>

                                </div>

                            </div>
                        </div>
                    </div>
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

const mapDispatchToProps = (dispatch) => {
    return {
        logoutSuccess: () => {
            return dispatch(logoutSuccess());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
