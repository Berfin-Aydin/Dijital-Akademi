import React, { Component } from 'react'
import {getUser} from "../api/apiCalls";
import {connect} from "react-redux";
import {InputMask} from "primereact/inputmask";

 class Profile extends Component {

        state={
            users: [],
            userEmailAddress: "",
            userPassword: "",
            userPasswordRepeat: "",
            userName: "",
            userSurname: "",
            userGender: "",
            userPhone: "",
        }

    componentDidMount() {
        //sayfa yüklendiğinde çalışacak
        const userName=this.props.loginSuccess.userName;

        console.log("ressponse", userName)

        getUser(userName).then(response=>{
            console.log("resssssponse", response)
            this.setState({
                users:response.data,


            });
        });


    }
    onClickSave=async()=>{
        //veritabnına kayıt işlemi
        const { userEmailAddress, userPassword, userName, userSurname, userGender, userPhone, userPasswordRepeat } = this.state
        const body = {
            userEmailAddress: userEmailAddress,
            userPassword: userPassword,
            userName: userName,
            userGender: userGender,
            userSurname: userSurname,
            userPhone: userPhone
        }
        try {

        }

        catch(err){
            console.log("error", err)
        }
}
    render() {
        return (
            <div class="container">
                <div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 edit_information">
                    <form action="" method="POST">
                        <h3 class="text-center">Kişisel Bilgileri Düzenle</h3>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                    <label class="profile_details_text">Ad:</label>
                                    <input type="text" name="userName" class="form-control" value={this.props.loginSuccess.userName} required />
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                    <label class="profile_details_text">Soyad: </label>
                                    <input type="text" name="userSurname" class="form-control"value={this.state.users.userSurname}  required />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label class="profile_details_text">E-posta:</label>
                                    <input type="email" name="userEmailAddress" class="form-control" value={this.state.users.userEmailAddress} required />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label class="profile_details_text">Telefon:</label>

                                    <InputMask className="form-control " id="phone" name="userPhone" mask="(999) 999-9999" value={this.state.users.userPhone} placeholder="(999) 999-9999"  />
                                </div>
                            </div>
                        </div>

                        <div class="row">

                        </div>
                           <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 submit">
                                <div class="form-group">
                                    <input type="submit" class="btn btn-success" value="Submit" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>



        )
    }
}
const mapStateToProps = (store) => {
    return {
        loginSuccess: store
    }
}

export default connect(mapStateToProps)(Profile);