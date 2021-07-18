package com.dijitalAkademi.ws.Contoller;

import com.dijitalAkademi.ws.Dto.LibraryDto;
import com.dijitalAkademi.ws.Dto.NoteDto;
import com.dijitalAkademi.ws.Service.LibraryService;
import com.dijitalAkademi.ws.entity.Library;
import com.dijitalAkademi.ws.util.ApiPaths;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Controller olduğunu belirttik
@RequestMapping(ApiPaths.LibraryCtrl.CTRL)
public class LibraryController {
    LibraryService libraryService;
    public LibraryController(LibraryService libraryService){
        this.libraryService=libraryService;
    }

    @PostMapping("/addLibrary/{userName}")
    public ResponseEntity<String> addLibrary(@PathVariable(value="userName") String  userName, @RequestBody NoteDto noteDto){
        return ResponseEntity.ok(libraryService.addLibrary(noteDto, userName));
    }

    @DeleteMapping("/deleteLibrary/{id}")
    ResponseEntity<String> deleteLibrary(@PathVariable(name="id") Long id){
        return ResponseEntity.ok(libraryService.deleteLibrary(id));
    }

    @GetMapping("/getLibraryNotes/{userName}")
    public ResponseEntity<List<LibraryDto>> getLibraryNotes(@PathVariable String userName){

        return ResponseEntity.ok(libraryService.getLibraryNotes(userName));
    }

}
