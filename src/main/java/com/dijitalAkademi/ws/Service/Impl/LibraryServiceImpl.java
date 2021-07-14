package com.dijitalAkademi.ws.Service.Impl;

import com.dijitalAkademi.ws.Dto.LibraryDto;
import com.dijitalAkademi.ws.Dto.NoteDto;
import com.dijitalAkademi.ws.Repository.LibraryRepository;
import com.dijitalAkademi.ws.Repository.UserRepository;
import com.dijitalAkademi.ws.Service.LibraryService;
import com.dijitalAkademi.ws.entity.Library;
import com.dijitalAkademi.ws.entity.Note;
import com.dijitalAkademi.ws.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LibraryServiceImpl implements LibraryService {
    private final LibraryRepository libraryRepository;
    private final NoteServiceImpl noteServiceImp;
    private final UserRepository userRepository;

    @Override
    public String addLibrary(NoteDto noteDto, String userName) {
        Library library = new Library();//library yeni bir veri eklenecek yeni bir satır oluşturacağım için new dedim
        Note note = noteServiceImp.getNoteById(noteDto.getNoteId());
        User user = userRepository.findByUserName(userName);
        if(note == null){
            throw new IllegalArgumentException("Not bulunamadı");
        }
        if(user == null){
            throw new IllegalArgumentException("Kullanıcı bulunamadı");
        }
        //library.setNoteId(note);//dto göndermediğim için
        Note notes = new Note();
        notes.setDocName(noteDto.getNoteName());
        notes.setNoteId(note.getNoteId());
        notes.setDocType(noteDto.getNoteFilePath());
        notes.setNoteCategory(noteDto.getNoteCategory());
        notes.setData(null);
        notes.setNoteDate(noteDto.getNoteDate());
        library.setUserName(userName);
        library.setNoteId(notes);
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
    @Transactional
    public List<Library> getLibraryNotes(String username) {
        List<Library> libraries = libraryRepository.findAllByUserName(username);
        return libraries;
//        return libraries.stream()
//                .filter(Objects::nonNull)
//                .map(this::libraryToLibraryDTO)
//                .collect(Collectors.toList());
    }

    private LibraryDto libraryToLibraryDTO(Library library) {
        LibraryDto libraryDto = new LibraryDto();
        libraryDto.setUserName(library.getUserName());
        library.getNoteId().setData(null);
        library.getNoteId().setNotePublisherUserId(null);
        libraryDto.setNoteId(library.getNoteId());
        return libraryDto;
    }
}
