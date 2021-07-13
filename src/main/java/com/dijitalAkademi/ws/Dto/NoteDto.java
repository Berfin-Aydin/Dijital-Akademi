package com.dijitalAkademi.ws.Dto;

import com.dijitalAkademi.ws.entity.Categories;
import com.dijitalAkademi.ws.entity.User;
import lombok.Data;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class NoteDto {
    private Long noteId;

    private String noteName;

    private Model model;

    private Date date;

    private Categories noteCategory;

    private String noteFilePath;

    private int noteDownloadCount;

    private byte[] data;

    private String notePublisherUserId;

    private String notePublisherComment;

    private MultipartFile multipartFile;

}
