import React, { Component } from 'react'

export default class Profile extends Component {
    render() {
        return (
            <div class="container">
                <div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 edit_information">
                    <form action="" method="POST">
                        <h3 class="text-center">Edit Personal Information</h3>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                    <label class="profile_details_text">First Name:</label>
                                    <input type="text" name="first_name" class="form-control" value="" required />
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                    <label class="profile_details_text">Last Name: </label>
                                    <input type="text" name="last_name" class="form-control" value="" required />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label class="profile_details_text">Email Address:</label>
                                    <input type="email" name="email" class="form-control" value="" required />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label class="profile_details_text">Mobile Number:</label>
                                    <input type="tel" name="phone" class="form-control" value="" />

                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label class="profile_details_text">Date Of Birth:</label>
                                    <input type="date" name="birthday" class="form-control" value="" required />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label class="profile_details_text">Gender:</label>
                                    <select name="gender" class="form-control" value="" required>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label class="profile_details_text">Nationality:</label>
                                    <input type="text" name="nationality" class="form-control" value="" required />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label class="profile_details_text">Monthly Income:</label>
                                    <input type="text" name="monthly_income" class="form-control" value="" required />
                                </div>
                            </div>
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
