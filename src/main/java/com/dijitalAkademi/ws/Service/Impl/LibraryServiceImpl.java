package com.dijitalAkademi.ws.Service.Impl;

import com.dijitalAkademi.ws.Dto.LibraryDto;
import com.dijitalAkademi.ws.Repository.LibraryRepository;
import com.dijitalAkademi.ws.Service.LibraryService;
import com.dijitalAkademi.ws.entity.Library;
import com.dijitalAkademi.ws.entity.Note;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LibraryServiceImpl implements LibraryService {
    private final LibraryRepository libraryRepository;
    private final NoteServiceImpl noteServiceImp;


    @Override
    public String addLibrary(Long id) {
        Library library = new Library();//library yeni bir veri eklenecek yeni bir satır oluşturacağım için new dedim
        Note note = noteServiceImp.getNoteById(id);
        library.setNoteId(note);//dto göndermediğim için
        libraryRepository.save(library);
        return ("not eklendi");
    }

    @Override
    public String deleteLibrary(Long id) {
        try {
            libraryRepository.deleteByNoteId(id);
        } catch (Exception e) {
            throw new IllegalArgumentException("Not bulunamadı");
        }
        return ("Not silindi");
    }

    @Override
    public List<LibraryDto> getLibraryNotes(String username) {
        Long[] libraries = libraryRepository.getAllByUserName(username);
        if(libraries.length > 0)
            noteServiceImp.getAllNotesByNotId(libraries);
        System.out.println(libraries);
        return null;
    }
}
