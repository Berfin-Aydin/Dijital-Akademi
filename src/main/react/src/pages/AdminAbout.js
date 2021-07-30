import React, {Component} from 'react';
import {InputTextarea} from 'primereact/inputtextarea';
import {getAbout, updateAbout} from "../api/apiCalls";
import {connect} from "react-redux";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import logo from "../images/logo.png";
import {logoutSuccess} from "../redux/authActions";

class AdminAbout extends Component {
    state = {
        about: {}
    }

    componentDidMount() {
        const userName = this.props.loginSuccess.userName;
        getAbout(userName).then(response => {
            this.setState({
                about: response.data

            })
        })
    }

    onChangeText = event => {
        const {name, value} = event.target;
        this.setState({about: {...this.state.about, [name]: value}});
    }

    onClickButton = () => {
        const userName = this.props.loginSuccess.userName;
        const {aboutContact, aboutMission, aboutVision, id} = this.state.about;
        const body = {
            id,
            aboutContact,
            aboutMission,
            aboutVision,
            userName
        }
        console.log("body", body)
        updateAbout(userName, body).then(response => {
            console.log("veriler güncellendi");
        }).catch(err => {
            console.log(err);
        })
    }
    onClickLogout=()=>{
        this.props.logoutSuccess();
    }


    render() {
        const {aboutContact, aboutMission, aboutVision} = this.state.about
        return (
            <div>
                <nav className="nav bg-purple justify-content-center">
                    <div className="d-flex align-items-lg-center mt-4 mt-lg-0 p-mr-6">
                        <Link to={"/adminPage"} className="nav-link lead">
                            <Button class="btn btn-secondary">
                                Ana Sayfa
                            </Button>
                        </Link>
                    </div>
                    <Link>
                        <img src={logo} className="h-8" alt="..."/>
                    </Link>
                    <div className="d-flex align-items-lg-center mt-4 mt-lg-0 ">
                        <Link to="/login" className="nav-link lead">
                            <Button class="btn btn-secondary" onClick={this.onClickLogout} >
                                Çıkış Yap
                            </Button>
                        </Link>
                    </div>
                </nav>
                <div className="card">
                    <h5>About Contact</h5>
                    <InputTextarea value={aboutContact} name="aboutContact" onChange={this.onChangeText}
                                   rows={5} cols={30}/>

                    <h5>About Mission</h5>
                    <InputTextarea value={aboutMission} name="aboutMission" onChange={this.onChangeText}
                                   rows={5} cols={30}/>

                    <h5>About Vision</h5>
                    <InputTextarea value={aboutVision} name="aboutVision" rows={5} cols={30}
                                   onChange={this.onChangeText}/>
                </div>
                <div>
                    <Button className="p-button-success m-2 p-mr-3" label="Kaydet" onClick={this.onClickButton}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(AdminAbout);
