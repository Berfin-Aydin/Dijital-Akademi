import React, {Component} from 'react';
import "./AdminPage.css"
import { PrimeIcons } from 'primereact/api';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import logo from "../images/logo.png";
class AdminPage extends Component {
    render() {
        return (
        <div>

            <nav className="nav bg-purple justify-content-center">
                <Link>
                    <img   src={logo} class="h-8"  alt="..."  />
                </Link>
                <a className="nav-link text-white"  href="#">Logout <i className="fa fa-sign-out" aria-hidden="true" ></i></a>
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

                                        <Link className="card-title lead" to="/adminUser">Kullanıcılar </Link>
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
                                        <Link className="card-title lead" to="/adminNote">Notlar </Link>
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
                                        <p className="card-title lead">Hakkımızda</p>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="col-xs-6 col-sm-6 col-md-3 col-lg-2 p-2">
                            <a className="text-decoration-none" href="#">
                                <div className="card p-3 shadow bg-purple text-center border-0">
                                    <div className="card-body">
                                        <i className="pi pi-home" style={{'fontSize': '2em'}}></i>
                                        <hr/>
                                        <p className="card-title lead">Site Ana Sayfa</p>
                                    </div>
                                </div>
                            </a>
                        </div>





                    </div>
                </div>

                <footer className="footer fixed-bottom">
                    <div className="row text-center p-3">
                        <p className="small text-muted">berfin</p>
                    </div>
                </footer>


                <div className="modal fade" id="modelHELP" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId"
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
                                <p><i className="fa fa-volume-control-phone mr-3" aria-hidden="true"></i> +91-123654789
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

export default connect(mapStateToProps)(AdminPage);
