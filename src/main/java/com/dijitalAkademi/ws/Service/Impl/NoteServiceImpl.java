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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final LibraryRepository libraryRepository;

    public NoteDto addedNote(NoteDto noteDto, Categories category, String userName) {

        User user = userRepository.findByUserName(userName);
        if (user == null) {
            throw new IllegalArgumentException("Kullanıcı bulunamadı");
        }

        try {

            Note doc = new Note();
            doc.setDocName(noteDto.getNoteName());
            doc.setNoteCategory(category);
            doc.setNoteDate(new Date());
            doc.setNotePublisherUserId(user);
            doc.setDocType(noteDto.getDocType());
            doc.setData(noteDto.getData());
            noteRepository.save(doc);

            NoteDto noteDto1 = new NoteDto();
            noteDto1.setData(noteDto.getData());
            return noteDto1;
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
    @Transactional
    public List<NoteDto> getNotesByUser(String userName) {
        List<Note> noteListByUserName = noteRepository.findAllByNotePublisherUserId_UserName(userName);
        return noteListByUserName.stream()
                .filter(Objects::nonNull)
                .map(this::noteToNoteDTO)
                .collect(Collectors.toList());
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
    @Transactional
    public List<NoteDto> searchNote(Categories category) {
        List<Note> noteList1 = noteRepository.findAllByNoteCategory(category);
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

    public Boolean deletebyUserId(String userName){
        try {
            libraryRepository.deleteAllByUserName(userName);
            noteRepository.deleteAllByNotePublisherUserId_UserName(userName);

        } catch (Exception e) {
            throw new IllegalArgumentException("not bulunamadı" + e);
        }
        return true;
    }

}
