import React from "react";
import axios from 'axios';
import "./Login.css"
import {loginHandler} from "../redux/authActions";
import {connect} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
class Login extends React.Component {
    state = {
        userEmailAddress: "",
        userPassword: "",
        error: false,
        loginError: false
    }

    onChangeInput = (event) => {
        //inputları aldım
        const { name, value } = event.target
        this.setState({
            [name]: value,
            loginError: false
        })
    }

    onClickSave = async (event) => {
        //butona tıkladığında veri tabanına kayıt etme
        const name = event.target.name
        const { userEmailAddress, userPassword } = this.state
        const body = {
            userName: userEmailAddress,
            password: userPassword
        }
        try{
            const response = await this.props.loginHandlers(body, name);
            if(response.data !== "UNAUTHORIZED"){
                console.log("name", name)
                if(name === "admin"){
                    this.props.history.push("/adminPage")
                }else{
                    this.props.history.push("/")

                }
                this.setState({
                    loginError: false
                })
            }else{
                this.setState({
                    loginError: true
                })
            }

        }catch (err) {
            console.log("error", err)
            this.setState({
                loginError: true
            })
        }


    }
    render() {
        return (
            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <h1>Dijital Akademi</h1>
                        <p>Ders Notlarını Arkadaşlarınla Paylaş</p>
                        <Link className="nav-link lead" to="/signUp" ><input type="submit" name="" value="Üye Ol" /></Link>
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
                                                <label for="floatingInput">Kullanıcı adı</label>
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
                                    <div className="form-group col-md-9 register-right " >
                                        <button
                                            name="users"
                                            className="btn btn-secondary "
                                            onClick={(this.onClickSave)}

                                        >Giriş yap</button>
                                        <button
                                            name="admin"
                                            className="btn btn-secondary p-ml-2"
                                            onClick={(this.onClickSave)}

                                        >Admin Girişi</button>

                                    </div>
                                    {this.state.loginError && <div>
                                        Hatalı Giriş
                                    </div>}
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
        loginHandlers: (body, name) => {
            return dispatch(loginHandler(body, name));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);

