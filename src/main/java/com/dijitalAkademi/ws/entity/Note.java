package com.dijitalAkademi.ws.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor // dolu Constructor
@NoArgsConstructor
@Entity
@Table(name="notes")
public class Note implements Serializable {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long noteId;

    @Column(name="category")
    //@NotNull
    private String noteCategory;

    @Column(name="note_date")
   // @NotNull
    private String noteDate;

    @Column(name="download_count")
    private int noteDownloadCount;


    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "userId")
    private User notePublisherUserId;


    @Column(name="note_publisher_comment")
    private String notePublisherComment;


    private String docName;
    private String docType;

    @Lob
    private byte[] data;

    @Column(name = "file")
    private String file;


//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
//    @JoinColumn(name = "libraryId")
//    private Library library;

    //@OneToMany(mappedBy = "notes", cascade = CascadeType.ALL)
    //JoinColumn(name = "library_id")
   // private Set<Library> libraries = new HashSet<>();



}
