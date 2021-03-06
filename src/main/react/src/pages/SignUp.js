import React from "react";
import 'react-phone-number-input/style.css'
import "./SignUp.css"
import { InputMask } from 'primereact/inputmask';
import axios from 'axios';
import {connect} from "react-redux";
import {signupHandler} from "../redux/authActions";
import {Link} from "react-router-dom";

class SignUp extends React.Component {

    state = {
        userEmailAddress: "",
        userPassword: "",
        userPasswordRepeat: "",
        userName: "",
        userSurname: "",
        userGender: "",
        userPhone: "",
        errorUserPasswordRepeat: "",
        errorPassword: "",
        errorEmail: "",
        errorName: "",
        erorSurname: "",
        isValid: false,
        errorUniqueUserName: false
    }
    onChangeInput = (event) => {
        //inputları aldım
        const { name, value } = event.target
        this.setState({
            [name]: value,
            errorUniqueUserName: false
        })
        if (event.target.name === "userPasswordRepeat") {
            this.setState({
                errorUserPasswordRepeat: ""
            })
        }
        if (event.target.name === "userPassword") {
            this.setState({
                errorPassword: ""
            })
        }
        if (event.target.name === "userEmailAddress") {
            this.setState({
                errorEmail: ""
            })
        }
    }

    onClickSave = async () => {
        //butona tıkladığında veri tabanına kayıt etme
        const { userEmailAddress, userPassword, userName, userSurname, userGender, userPhone, userPasswordRepeat } = this.state
        const body = {
            userEmailAddress: userEmailAddress,
            userPassword: userPassword,
            userName: userName,
            userGender: userGender,
            userSurname: userSurname,
            userPhone: userPhone
        }

        //e posta
        if (!this.state.userEmailAddress.includes("@")) {
            this.setState({
                errorEmail: "Geçerli bir e-posta giriniz"
            })
            return;
        }

        //şifre
        const passwordRegex = /(?=.*[0-9])/;
        if (userPassword.length < 8) {
            this.setState({
                errorPassword: "Şifreniz en az 8 karakter içermelidir"
            })
            return;
        } else if (!passwordRegex.test(this.state.userPassword)) {
            this.setState({
                errorPassword: "Şifreniz en az 1 rakam içermelidir"

            })
            return;
        }
        if (userPassword !== userPasswordRepeat) {
            this.setState({
                errorUserPasswordRepeat: "Girdiğiniz şifre aynı olmalıdır "
            })
            return;
        }

        try{
            const response = await this.props.signupHandler(body);
            this.setState({
                errorUniqueUserName: false
            })
            this.props.history.push("/")
        }catch (err) {
            console.log("error", err)
            this.setState({
                errorUniqueUserName: true
            })
        }

    }

    render() {
        const { userEmailAddress, userPassword, userName, userSurname, userGender, userPhone, userPasswordRepeat } = this.state

        return (
            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <h1>Dijital Akademi</h1>
                        <p>Ders Notlarını Arkadaşlarınla Paylaş</p>
                        {/*<input type="submit" name="" value="Login" /><br />*/}
                        <Link className="nav-link lead" to="/login" ><input type="submit" name="" value="Giriş Yap" /></Link>
                    </div>
                    <div className="col-md-9 register-right">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading">Hesabını Oluştur</h3>
                                <div className="row register-form">
                                    <div className="form-group mb-3">
                                        <div className="form-floating">
                                            <input type="text" class="form-control" name="userEmailAddress" placeholder="name@example.com" onChange={this.onChangeInput} />
                                            <label for="floatingInput">E-posta</label>
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.errorEmail}
                                            </div>

                                        </div>

                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <div className="form-floating col-md-11">
                                                <input type="text" class="form-control" id="floatingInput" name="userName" placeholder="name@example.com" onChange={this.onChangeInput} />
                                                <label for="floatingInput">İsim</label>
                                            </div>
                                        </div>

                                        <div className="form-group mb-3">

                                            <div className="form-floating col-md-11">
                                                <input type="text" className="form-control" id="floatingPassword" name="userPassword" placeholder="Password" onChange={this.onChangeInput} />
                                                <label for="floatingPassword">Şifre</label>

                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.errorPassword}
                                                </div>


                                            </div>
                                        </div>


                                        <div className="form-group mb-3">
                                            <div className="form-floating col-md-11 ">
                                                <input type="text" class="form-control" id="floatingPassword" name="userPasswordRepeat" placeholder="Password" onChange={this.onChangeInput} />
                                                <label for="floatingPassword">Tekrar Şifre</label>

                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.errorUserPasswordRepeat}
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-md-6" >
                                        <div className="form-group mb-3">

                                            <div className="form-floating">
                                                <input type="text" class="form-control" id="floatingInput" name="userSurname" placeholder="name@example.com" onChange={this.onChangeInput} />
                                                <label for="floatingInput">Soyad</label>
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <div className="form-floating ">
                                                <InputMask className="form-control " id="phone" name="userPhone" mask="(999) 999-9999" value={this.state.userPhone} placeholder="(999) 999-9999" onChange={this.onChangeInput} />
                                                <label htmlFor="phone">Telefon</label>
                                            </div>
                                        </div>
                                        <div>
                                            {this.state.errorUniqueUserName &&
                                            <div>
                                                Kullanıcı adı benzersiz olmalı
                                            </div>}
                                        </div>
                                        <button
                                            className="btn btnRegister btn-secondary"
                                            onClick={this.onClickSave}
                                            disabled={userEmailAddress === ""}
                                        >Üye Ol</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }


}

const mapStateToProps = (store) => {
    return {
        loginHandler: store.image
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signupHandler: (body) => {
            return dispatch(signupHandler(body));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
