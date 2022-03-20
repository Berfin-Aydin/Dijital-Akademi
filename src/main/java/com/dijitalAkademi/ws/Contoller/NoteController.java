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
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController // Controller olduğunu belirttik
@RequestMapping(ApiPaths.NoteCtrl.CTRL)
public class NoteController {

    NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("/{userName}/{category}")
    public ResponseEntity<NoteDto> addedNote(@PathVariable(value = "category") Categories category,
                                             @RequestBody NoteDto multipartFile,
                                             @PathVariable(value = "userName") String userName) {
        System.out.println(userName);
        return ResponseEntity.ok(noteService.addedNote(multipartFile, category, userName));

    }

    // Tüm notlarır liste olarak alması lazım parametresiz noteDto kullanılacak
    //bakılıarak yapıldı
    @GetMapping("/getNotes")
    public ResponseEntity<List<NoteDto>> getNotes() {
        List<NoteDto> list = noteService.getNotes();
        return ResponseEntity.ok(list);
    }

    //arama için
    @GetMapping("/searchNote/{category}")
    public ResponseEntity<?> searchNote(@PathVariable(value = "category") Categories category) {
        List<NoteDto> list1 = noteService.searchNote(category);
        if (list1.isEmpty()) {
            return ResponseEntity.ok(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(list1);

    }


    //not silme olacak id'ye göre
    @DeleteMapping("/deleteNotes/{noteId}")
    public ResponseEntity<Long> deleteNote(@PathVariable Long noteId) {
        return ResponseEntity.ok(noteService.deleteNote(noteId));

    }


    @GetMapping("/noteData/{noteId}")
    public ResponseEntity<String> getNoteData(@PathVariable Long noteId) {
        return ResponseEntity.ok(noteService.getNoteData(noteId));
    }

    @GetMapping("getNotesByUser/{userName}")
    public ResponseEntity<List<NoteDto>> getNotesByUser(@PathVariable String userName) {
        return ResponseEntity.ok(noteService.getNotesByUser(userName));
    }

}
