package com.dijitalAkademi.ws.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor // dolu Constructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User extends BaseEntity {


    @Id
    @GeneratedValue
    private Long userId;

    @Column(name = "user_email_address")
    @NotNull
    private String userEmailAddress;

    @Column(name = "user_password")
    @NotNull
    private String userPassword;

    @Column(name = "user_name")
    @NotNull
    private String userName;

    @Column(name = "user_surname")
    private String userSurname;

    @Column(name = "user_gender")
    private String userGender;

    @Column(name = "user_phone")
    private String userPhone;

    @Column(name = "user_regsiter_date")
    private Date userRegsiterDate;

    @Column(name = "user_status")
    private int userStatus;

}
