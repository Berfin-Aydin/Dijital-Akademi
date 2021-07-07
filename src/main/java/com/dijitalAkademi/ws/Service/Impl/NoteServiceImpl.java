package com.dijitalAkademi.ws.Service.Impl;

import com.dijitalAkademi.ws.Dto.NoteDto;
import com.dijitalAkademi.ws.Repository.NoteRepository;
import com.dijitalAkademi.ws.Service.NoteService;
import com.dijitalAkademi.ws.entity.Note;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class NoteServiceImpl implements NoteService {

    NoteRepository noteRepository;

    public NoteServiceImpl(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public NoteDto addedNote( MultipartFile file) {
        String docname = file.getOriginalFilename(); //seçilen dosyanın adını aldık
        byte[] decode = new byte[0];
//        try {
//            decode = Base64.getDecoder().decode(file.getBytes());
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        try {
            Note doc = new Note();
            doc.setDocName(docname);
            doc.setDocType(file.getContentType());
            doc.setData(file.getBytes());
            //doc.setNoteCategory(noteDto.getNoteCategory());
            noteRepository.save(doc);
            return null;
        }catch (Exception exception){
            throw new IllegalArgumentException("hata oluştu");
        }
    }

    @Override
    public List<NoteDto> getNotes() {
       List<Note> noteList=noteRepository.findAll();
        return noteList.stream()
                .filter(Objects::nonNull)
                .map(this::noteToNoteDTO)
                .collect(Collectors.toList());
    }

    public List<?> getAllNotesByNotId(Long[] noteId){

        Long[] array = new Long[]{1L,3L};
        List<Long> collect = Arrays.stream(noteId).filter(Objects::nonNull).map(aLong -> aLong.longValue()).collect(Collectors.toList());
        List<Note> notes = noteRepository.findAllByNoteIds(array);
        System.out.println(notes);
        return notes;
    }

    @Override
    public Long deleteNote(Long id) {

        try{
            noteRepository.deleteById(id);

        }catch (Exception e){
        throw new IllegalArgumentException("not bulunamadı");
        }

        return id;
    }

    private NoteDto noteToNoteDTO(Note note) {
        NoteDto noteDto=new NoteDto();
        noteDto.setNoteName(noteDto.getNoteName());
        noteDto.setNoteCategory(note.getNoteCategory());
        noteDto.setNoteDownloadCount(noteDto.getNoteDownloadCount());
        noteDto.setNotePublisherComment(note.getNotePublisherComment());
        return noteDto;

    }


    public Note getNoteById(Long id) {
        return noteRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Not Bulunamadı"));
    }
}
