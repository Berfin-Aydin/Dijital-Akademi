import React from "react";
import axios from 'axios';
import "./Login.css"
import {loginHandler} from "../redux/authActions";
import {connect} from 'react-redux'

class Login extends React.Component {
    state = {
        userEmailAddress: "",
        userPassword: "",
        error: false
    }

    onChangeInput = (event) => {
        console.log("event", event)
        //inputları aldım
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    onClickSave = async () => {
        //butona tıkladığında veri tabanına kayıt etme
        const { userEmailAddress, userPassword } = this.state
        const body = {
            userName: userEmailAddress,
            password: userPassword
        }
        //veritabanı bağlantısını kuralım
        // axios.post("/login", body).then(e => {
        //     //eğer başarılı ise burası çalışacak
        //     console.log("veriler", e);
        //     console.log("login", e.status)
        // }).catch(err => {
        //     //hata
        //     console.log("error", err)
        // })
        try{
            await this.props.loginHandlers(body);
            console.log("props", this.props)
        }catch (err) {
            console.log("error", err)
        }

    }
    render() {
        return (
            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                    <h1>Dijital Akademi</h1>
                        <p>Ders Notlarını Arkadaşlarınla Paylaş</p>
                    </div>
                    <div className="col-md-9 register-right">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading">Giriş Yap</h3>
                                <div className="row register-form">

                                    <div className="form-group col-md-9">
                                        <div className="form-group mb-3">
                                            <div className="form-floating">
                                                <input type="text" class="form-control" id="floatingInput" name="userEmailAddress" placeholder="name@example.com" onChange={this.onChangeInput} />
                                                <label for="floatingInput">E-posta</label>
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <div className="form-floating">
                                                < input type="text" class="form-control" id="floatingPassword" name="userPassword" placeholder="Password" onChange={this.onChangeInput} />
                                                <label for="floatingPassword">Şifre</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-9" >
                                        <button
                                            className="btn btnRegister"
                                            onClick={this.onClickSave}

                                        >Register</button>

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
        loginHandlers: (body) => {
            return dispatch(loginHandler(body));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);

