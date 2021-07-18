package com.dijitalAkademi.ws.Contoller;


import com.dijitalAkademi.ws.Dto.NoteDto;
import com.dijitalAkademi.ws.Service.NoteService;
import com.dijitalAkademi.ws.entity.Categories;
import com.dijitalAkademi.ws.entity.Note;
import com.dijitalAkademi.ws.entity.User;
import com.dijitalAkademi.ws.shared.CurrentUser;
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

    @PostMapping("/{userName}/{category}")
    public ResponseEntity<NoteDto> addedNote(@PathVariable(value = "category") Categories category,
                                             @RequestBody NoteDto multipartFile,
                                             @PathVariable(value = "userName") String userName){
        System.out.println(userName);
        return ResponseEntity.ok(noteService.addedNote( multipartFile, category, userName));

    }

    // Tüm notlarır liste olarak alması lazım parametresiz noteDto kullanılacak
    //bakılıarak yapıldı
    @GetMapping("/getNotes")
    public ResponseEntity<List<NoteDto>> getNotes(){
        List<NoteDto> list=noteService.getNotes();
        return  ResponseEntity.ok(list);
    }
    //arama için
    @GetMapping("/searchNote/{category}")
    public ResponseEntity<List<NoteDto>> searchNote(@PathVariable(value="category") Categories category){
        List<NoteDto> list1=noteService.searchNote(category);
        return ResponseEntity.ok(list1) ;

    }


    //not silme olacak id'ye göre
    @DeleteMapping("/deleteNotes/{id}")
    public ResponseEntity<Long> deleteNote(@PathVariable(name="id") Long id){
        return ResponseEntity.ok(noteService.deleteNote(id));

    }

    @GetMapping("/noteData/{noteId}")
    public ResponseEntity<String> getNoteData(@PathVariable Long noteId){
        return ResponseEntity.ok(noteService.getNoteData(noteId));
    }

}
