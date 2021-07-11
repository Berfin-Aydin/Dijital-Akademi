package com.dijitalAkademi.ws.Dto;

import com.dijitalAkademi.ws.entity.Note;
import lombok.Data;

@Data
public class LibraryDto {
    private  String userName;
    private Note noteId;
}
