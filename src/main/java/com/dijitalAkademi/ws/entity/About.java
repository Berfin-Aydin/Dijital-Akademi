package com.dijitalAkademi.ws.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "about")
public class About implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="img")
    private String aboutImg;

    @Column(name="vision")

    private String aboutVision;

    @Column(name="mission")
    private String aboutMission;

    @Column(name="contact")

    private String aboutContact;

    @Column(name = "user_name")
    private String userName;


}
