package com.dijitalAkademi.ws.Dto;

import com.dijitalAkademi.ws.entity.User;
import lombok.Data;
import org.springframework.ui.Model;

@Data
public class NoteDto {
    private String noteName;

    private Model model;

    private String noteCategory;

    private String noteFilePath;

    private int noteDownloadCount;

    User notePublisherUserId;

    private String notePublisherComment;

}
