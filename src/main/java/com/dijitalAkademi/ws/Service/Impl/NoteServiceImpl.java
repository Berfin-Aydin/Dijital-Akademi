package com.dijitalAkademi.ws.Service.Impl;

import com.dijitalAkademi.ws.Dto.NoteDto;
import com.dijitalAkademi.ws.Repository.LibraryRepository;
import com.dijitalAkademi.ws.Repository.NoteRepository;
import com.dijitalAkademi.ws.Repository.UserRepository;
import com.dijitalAkademi.ws.Service.NoteService;
import com.dijitalAkademi.ws.entity.Categories;
import com.dijitalAkademi.ws.entity.Library;
import com.dijitalAkademi.ws.entity.Note;
import com.dijitalAkademi.ws.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class NoteServiceImpl implements NoteService {

    NoteRepository noteRepository;
    UserRepository userRepository;
    LibraryRepository libraryRepository;

    public NoteServiceImpl(NoteRepository noteRepository, UserRepository userRepository, LibraryRepository libraryRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
        this.libraryRepository = libraryRepository;
    }

    public NoteDto addedNote(NoteDto file, Categories category, String userName) {

        User user = userRepository.findByUserName(userName);
        if (user == null) {
            throw new IllegalArgumentException("Kullanıcı bulunamadı");
        }

        //String docname = file.getOriginalFilename(); //seçilen dosyanın adını aldık
        try {

            Note doc = new Note();
            //doc.setDocName(docname);
            doc.setNoteCategory(category);
            doc.setNoteDate(new Date());
            doc.setNotePublisherUserId(user);
            //doc.setDocType(file.getContentType());
            doc.setData(file.getData());
            noteRepository.save(doc);

            NoteDto noteDto = new NoteDto();
            noteDto.setData(file.getData());
            return noteDto;
        } catch (Exception exception) {
            throw new IllegalArgumentException("hata oluştu");
        }
    }

    @Override
    @Transactional
    public String getNoteData(Long noteId) {
        Note note = noteRepository.getOne(noteId);
        System.out.println("note" + note.getData());
        return note.getData();
    }

    @Override
    public List<NoteDto> getNotes() {
        List<Note> noteList = noteRepository.findAll();
        return noteList.stream()
                .filter(Objects::nonNull)
                .map(this::noteToNoteDTO)
                .collect(Collectors.toList());
    }

    public List<?> getAllNotesByNotId(List<String> noteId) {

        //Long[] array = new Long[]{1L,3L};
        //List<Long> collect = Arrays.stream(noteId).filter(Objects::nonNull).map(aLong -> aLong.longValue()).collect(Collectors.toList());
        noteRepository.findAllByNoteIdIn(noteId);
//        System.out.println(notes);
//        return notes;
        return noteId;
    }


    @Override
    @Transactional
    public Long deleteNote(Long noteId) {

        try {
            libraryRepository.deleteByNoteId_NoteId(noteId);
            noteRepository.deleteById(noteId);

        } catch (Exception e) {
            throw new IllegalArgumentException("not bulunamadı" + e);
        }
        return noteId;
    }

    @Override
    public List<NoteDto> searchNote(Categories category) {

       List<Note> noteList1=noteRepository.findAllByNoteCategory(category);

        System.out.println(noteList1);
       // return null;
        return noteList1.stream()
               .filter(Objects::nonNull)
                .map(this::noteToNoteDTO)
                .collect(Collectors.toList());
    }

    private NoteDto noteToNoteDTO(Note note) {
        NoteDto noteDto = new NoteDto();
        noteDto.setNoteId(note.getNoteId());
        noteDto.setNoteName(note.getDocName());
        noteDto.setNoteCategory(note.getNoteCategory());
        noteDto.setNotePublisherUserId(note.getNotePublisherUserId().getUserName());
        noteDto.setNoteDownloadCount(note.getNoteDownloadCount());
        noteDto.setNotePublisherComment(note.getNotePublisherComment());
        return noteDto;
    }


    public Note getNoteById(Long id) {
        return noteRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Not Bulunamadı"));
    }
}
