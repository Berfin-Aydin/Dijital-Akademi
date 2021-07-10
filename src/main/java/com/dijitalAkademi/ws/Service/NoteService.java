package com.dijitalAkademi.ws.Service;

import com.dijitalAkademi.ws.Dto.NoteDto;
import com.dijitalAkademi.ws.entity.Note;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface NoteService  {

    NoteDto addedNote( MultipartFile multipartFile, String category);

    List<NoteDto> getNotes();


    Long deleteNote(Long id);
}
