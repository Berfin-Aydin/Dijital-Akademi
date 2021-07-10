package com.dijitalAkademi.ws.Contoller;


import com.dijitalAkademi.ws.Dto.NoteDto;
import com.dijitalAkademi.ws.Service.NoteService;
import com.dijitalAkademi.ws.entity.Note;
import com.dijitalAkademi.ws.util.ApiPaths;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController // Controller olduğunu belirttik
@RequestMapping(ApiPaths.NoteCtrl.CTRL)
public class NoteController {

    NoteService noteService;

    public NoteController(NoteService noteService){
        this.noteService = noteService;
    }

    @PostMapping("/{category}")
    public ResponseEntity<NoteDto> addedNote(@PathVariable String category,  @RequestBody MultipartFile multipartFile){
        return ResponseEntity.ok(noteService.addedNote( multipartFile, category));

    }

    // Tüm notlarır liste olarak alması lazım parametresiz noteDto kullanılacak
    //bakılıarak yapıldı
    @GetMapping("/getNotes")
    public ResponseEntity<List<NoteDto>> getNotes(){
        List<NoteDto> list=noteService.getNotes();
        return  ResponseEntity.ok(list);
    }


    //not silme olacak id'ye göre
    @DeleteMapping("/deleteNotes/{id}")
    public ResponseEntity<Long> deleteNote(@PathVariable(name="id") Long id){
        return ResponseEntity.ok(noteService.deleteNote(id));

    }

}
