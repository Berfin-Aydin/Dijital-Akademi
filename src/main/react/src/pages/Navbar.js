import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
//import "./Navbar.css"
import logo from "../images/logo.png"
import { Route, Switch } from 'react-router-dom'
import { Link } from "react-router-dom"
import { Button } from "@material-ui/core";

export default class Navbar extends React.Component {
    render() {
        return (

            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-0 py-3">
                    <div className="container-xl">

                        <Link>
                            <img src={logo} class="h-8" alt="..." />
                        </Link>

                        <div className="collapse navbar-collapse" id="navbarCollapse">

                            <div className="navbar-nav mx-lg-auto">
                                <a className="nav-item nav-link active" href="#" aria-current="page"> Mağaza </a>
                                <Link className="nav-link" to="/libraryPage">Kütüphanem </Link>
                                <Link className="nav-link" to="/uploadedPage">Yüklediklerim </Link>
                                <Link className="nav-link" to="/profile">Profil</Link>
                                <a className="nav-item nav-link" href="#">Hakkında</a>
                            </div>

                            <div className="d-flex align-items-lg-center mt-4 mt-lg-0 col-md-2">

                                <Button class="btn btn-primary" component={Link} to="/login">
                                    Giriş Yap
                                </Button>

                            </div>
                            <div className="d-flex align-items-lg-center mt-4 mt-lg-0 ">

                                <Button class="btn btn-primary" component={Link} to="/signUp">
                                    Üye Ol
                                </Button>

                            </div>
                        </div>
                    </div>
                </nav>


            </div>


        )



    }
}
