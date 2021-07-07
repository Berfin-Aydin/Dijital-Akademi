package com.dijitalAkademi.ws.Dto;

import lombok.Data;

@Data
public class RegistrationRequest {

    private String userEmailAddress;

    private String userPassword;

    private String userName;

    private String userGender;

    private String userSurname;

    private String userPhone;
}
