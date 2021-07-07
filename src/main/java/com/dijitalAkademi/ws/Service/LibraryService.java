package com.dijitalAkademi.ws.Service;

import com.dijitalAkademi.ws.Dto.LibraryDto;

import java.util.List;

public interface LibraryService {
    String addLibrary(Long id);

    String  deleteLibrary(Long id);

    List<LibraryDto> getLibraryNotes(String username);
}
