package com.dijitalAkademi.ws.Dto;

import com.dijitalAkademi.ws.entity.Categories;
import com.dijitalAkademi.ws.entity.Note;
import lombok.Data;

import java.util.Date;

@Data
public class LibraryDto {
    private  String userName;
    private Long noteId;
    //private Note noteId;
    private Categories noteCategory;

    private Date noteDate;

    private String docName;
    private String docType;

    private String file;
}
