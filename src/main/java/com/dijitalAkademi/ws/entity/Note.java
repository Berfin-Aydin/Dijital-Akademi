package com.dijitalAkademi.ws.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
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
    @Enumerated(EnumType.STRING)
    private Categories noteCategory;

    @Column(name="note_date")
   // @NotNull
    private Date noteDate;

    @Column(name="download_count")
    private int noteDownloadCount;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User notePublisherUserId;


    @Column(name="note_publisher_comment")
    private String notePublisherComment;


    private String docName;
    private String docType;

    @Lob
    private String data;

    @Column(name = "file")
    private String file;


}
