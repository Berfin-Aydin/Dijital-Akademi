package com.dijitalAkademi.ws.Service;

import com.dijitalAkademi.ws.Dto.NoteDto;
import com.dijitalAkademi.ws.entity.Categories;
import com.dijitalAkademi.ws.entity.Note;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface NoteService  {

    NoteDto addedNote(NoteDto multipartFile, Categories category, String userName);

    List<NoteDto> getNotes();


    Long deleteNote(Long noteId);

    List<NoteDto> searchNote(Categories category);

    String getNoteData(Long noteId);

    List<NoteDto> getNotesByUser(String userName);

}
