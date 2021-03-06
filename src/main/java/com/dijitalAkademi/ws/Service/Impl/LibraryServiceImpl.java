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
        Library library = new Library();
        Note note = noteServiceImp.getNoteById(noteDto.getNoteId());
        User user = userRepository.findByUserName(userName);

        Library getLibraryByuserName = libraryRepository.getNoteByNoteId_NoteIdAndUserName(noteDto.getNoteId(), userName);
        if (getLibraryByuserName != null) {
            throw new IllegalArgumentException("Aynı not ekli");
        }

        if (note == null) {
            throw new IllegalArgumentException("Not bulunamadı");
        }
        if (user == null) {
            throw new IllegalArgumentException("Kullanıcı bulunamadı");
        }
        //library.setNoteId(note);//dto göndermediğim için
        Note notes = new Note();
        notes.setDocName(noteDto.getNoteName());
        notes.setNoteId(note.getNoteId());
        notes.setDocType(noteDto.getNoteFilePath());
        notes.setNoteCategory(noteDto.getNoteCategory());
        //notes.setData(null);
        notes.setNoteDate(noteDto.getNoteDate());
        library.setUserName(userName);
        library.setNoteId(notes);
        libraryRepository.save(library);
        return ("not eklendi");
    }

    @Override
    public String deleteLibrary(Long id, String userName) {
        try {
            Library note = libraryRepository.getNoteByNoteId_NoteIdAndUserName(id, userName);
            libraryRepository.deleteById(note.getLibraryId());
        } catch (Exception e) {
            System.out.println(e);
            throw new IllegalArgumentException("Not bulunamadı");
        }
        return ("Not silindi");
    }

    @Override
    @Transactional
    public List<LibraryDto> getLibraryNotes(String username) {
        List<Library> libraries = libraryRepository.findAllByUserName(username);
        return libraries.stream()
                .filter(Objects::nonNull)
                .map(this::libraryToLibraryDTO)
                .collect(Collectors.toList());
    }

    private LibraryDto libraryToLibraryDTO(Library library) {
        LibraryDto libraryDto = new LibraryDto();
//        library.getNoteId().setData(null);
//        library.getNoteId().setNotePublisherUserId(null);
        libraryDto.setUserName(library.getUserName());
        //libraryDto.setNoteId(library.getNoteId());
        //libraryDto.getNoteId().setData(null);
        libraryDto.setNoteId(library.getNoteId().getNoteId());
        libraryDto.setDocName(library.getNoteId().getDocName());
        libraryDto.setNoteDate(library.getNoteId().getNoteDate());
        libraryDto.setNoteCategory(library.getNoteId().getNoteCategory());
        libraryDto.setDocType(library.getNoteId().getDocType());
        return libraryDto;
    }
}
