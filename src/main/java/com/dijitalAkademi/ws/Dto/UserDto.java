package com.dijitalAkademi.ws.Dto;

import lombok.Data;

import javax.persistence.Column;

@Data
public class UserDto {

    private String userEmailAddress;

    private String userPassword;

    private String userName;

    private String userGender;

    private String userSurname;

    private String userPhone;

}
