package com.dijitalAkademi.ws.Dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String userName;

    private String password;
}
