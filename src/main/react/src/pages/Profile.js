import React, {Component} from 'react'
import {getUser} from "../api/apiCalls";
import {updateUser} from "../api/apiCalls";
import {connect} from "react-redux";
import {InputMask} from "primereact/inputmask";
import {Button} from "primereact/button";
import Navbar from "./Navbar";

class Profile extends Component {

    state = {
        users: [],
        userEmailAddress: "",
        userPassword: "",
        userPasswordRepeat: "",
        userName: "",
        userSurname: "",
        userGender: "",
        userPhone: "",
        errorName: "",
        errorEmail: "",
        errorSurname: ""
    }

    componentDidMount() {
        //sayfa yüklendiğinde çalışacak
        const userName = this.props.loginSuccess.userName;
        getUser(userName).then(response => {
            this.setState({
                userName: response.data.userName,
                userEmailAddress: response.data.userEmailAddress,
                userPassword: response.data.userPassword,
                userGender: response.data.userGender,
                userSurname: response.data.userSurname,
                userPhone: response.data.userPhone,
            });
        });


    }

    onChangeInput = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
        if (event.target.name === "userEmailAddress") {
            this.setState({
                errorEmail: ""
            })
        }
        if (event.target.name === "userName") {
            this.setState({
                errorName: ""
            })
        }
        if (event.target.name === "userSurname") {
            this.setState({
                errorSurname: ""
            })
        }

    }
    onClickSave = async (e) => {
        //veritabnına kayıt işlemi
        e.preventDefault()
        const {userEmailAddress, userPassword, userName, userSurname, userGender, userPhone, userPasswordRepeat} = this.state
        const body = {
            userEmailAddress: userEmailAddress,
            userPassword: userPassword,
            userName: userName,
            userGender: userGender,
            userSurname: userSurname,
            userPhone: userPhone
        }
        console.log("body", body)
        console.log("userName", userName)
        //e posta
        if (!this.state.userEmailAddress.includes("@")) {
            this.setState({
                errorEmail: "Geçerli bir e-posta giriniz"
            })
            return;
        }
        const re = /^[0-9\b]+$/;
        if (re.test(this.state.userSurname)) {
            this.setState({
                errorSurname: "rakam girilmez"
            })
            return;
        }
        try {
            await updateUser(userName, body);
        } catch (err) {
            console.log("error", err)
        }
    }

    render() {
        const {userName, userSurname, userPhone} = this.state
        return (
            <>
                <Navbar/>
                <div class="container">
                    <div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 edit_information">
                        <form action="" method="POST">
                            <h3 class="text-center">Kişisel Bilgileri Düzenle</h3>
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label class="profile_details_text">Ad:</label>
                                        <input type="text" name="userName" class="form-control" value={userName}
                                               required disabled/>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label class="profile_details_text">Soyad: </label>
                                        <input type="text" name="userSurname" class="form-control" value={userSurname}
                                               onChange={this.onChangeInput} required/>
                                        <div style={{fontSize: 12, color: "red"}}>
                                            {this.state.errorSurname}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="profile_details_text">E-posta:</label>
                                        <input type="email" name="userEmailAddress" class="form-control"
                                               value={this.state.userEmailAddress} required
                                               onChange={this.onChangeInput}/>
                                        <div style={{fontSize: 12, color: "red"}}>
                                            {this.state.errorEmail}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="profile_details_text">Telefon:</label>

                                        <InputMask className="form-control " id="phone" name="userPhone"
                                                   mask="(999) 999-9999" value={userPhone}
                                                   placeholder="(999) 999-9999"/>
                                    </div>
                                </div>
                            </div>

                            <div class="row">

                            </div>
                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 submit">
                                    <div class="form-group">
                                        {/*<input type="submit" class="btn btn-success" value="Submit"  onClick={this.onClickSave} />*/}
                                        <Button
                                            className="btn btn-success"
                                            onClick={this.onClickSave}
                                            disabled={userSurname === "" && userPhone === ""}
                                        >Register</Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>


        )
    }
}

const mapStateToProps = (store) => {
    return {
        loginSuccess: store
    }
}

export default connect(mapStateToProps)(Profile);
