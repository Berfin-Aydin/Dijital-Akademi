import React from "react";
import {BrowserRouter, Router} from "react-router-dom";
//import "./Navbar.css"
import logo from "../images/logo.png"
import {Route, Switch} from 'react-router-dom'
import {Link} from "react-router-dom"
import {Button} from "@material-ui/core";
import {connect} from "react-redux";
import {logoutSuccess, signupHandler} from "../redux/authActions";

class Navbar extends React.Component {
    onClickLogout=()=>{
        console.log("çıkış yap")
        this.props.logoutSuccess();
    }
    render() {
        const {isLoggedIn, userName} = this.props.loginSuccess
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-0 py-3">
                    <div className="container-xl">

                        <Link to="/">
                            <img src={logo} class="h-8" alt="..."/>
                        </Link>

                        <div className="collapse navbar-collapse" id="navbarCollapse">

                            <div className="navbar-nav mx-lg-auto">
                                <Link className="nav-link" to="/">Ana Sayfa </Link>
                                <Link className="nav-link" to="/libraryPage">Kütüphanem </Link>
                                <Link className="nav-link" to="/uploadedPage">Yüklediklerim </Link>
                                {/*<Link className="nav-link" to="/profile">Profil</Link>*/}
                                <a className="nav-item nav-link" href="#">Hakkında</a>
                            </div>

                            {isLoggedIn === false ? <>
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
                                </> :
                                <>
                                    <div className="d-flex align-items-lg-center mt-4 mt-lg-0 col-md-2 ">

                                        <Button class="btn btn-secondary" component={Link} to="/profile">
                                            {userName}
                                        </Button>
                                    </div>
                                    <div className="d-flex align-items-lg-center mt-4 mt-lg-0 ">
                                        <Button class="btn btn-primary" onClick={this.onClickLogout} component={Link} to="/login">
                                            Çıkış Yap
                                        </Button>
                                    </div>
                                </>
                            }

                        </div>
                    </div>
                </nav>


            </div>


        )
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
export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
