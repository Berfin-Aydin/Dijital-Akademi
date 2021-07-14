package com.dijitalAkademi.ws.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor // dolu Constructor
@NoArgsConstructor
@Entity
@Table(name = "library")
public class Library implements Serializable {

    @Id
    @GeneratedValue
    private Long libraryId;

    @Column(name = "library_user_id")
    private Long libraryUserId;

    @Column(name = "username")
    private String userName;

//    @Column(name = "noteId")
//    private Long noteId;


//deneme

    //not yazdığımda bağlantı sağlanmıyor çünkü üsteki note ile çakışma söz konusu
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "note_id")
    private Note noteId;


}
