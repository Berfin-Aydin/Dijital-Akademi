package com.dijitalAkademi.ws.Service;

import com.dijitalAkademi.ws.Dto.LibraryDto;
import com.dijitalAkademi.ws.Dto.NoteDto;
import com.dijitalAkademi.ws.entity.Library;

import java.util.List;

public interface LibraryService {
    String addLibrary(NoteDto noteDto, String username);

    String  deleteLibrary(Long id);

    List<LibraryDto> getLibraryNotes(String username);
}
