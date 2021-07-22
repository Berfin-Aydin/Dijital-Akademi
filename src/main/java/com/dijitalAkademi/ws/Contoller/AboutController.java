package com.dijitalAkademi.ws.Contoller;

import com.dijitalAkademi.ws.Dto.AboutDto;
import com.dijitalAkademi.ws.Dto.UserDto;
import com.dijitalAkademi.ws.Service.AboutService;
import com.dijitalAkademi.ws.util.ApiPaths;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // Controller olduğunu belirttik
@RequestMapping(ApiPaths.AboutCtrl.CTRL)
public class AboutController {
    AboutService aboutService;
    public AboutController( AboutService aboutService){
        this.aboutService=aboutService;
    }
    @PostMapping("/createAbout/{userName}")
    public ResponseEntity<AboutDto> createAbout(@PathVariable(value="userName") String userName, @RequestBody AboutDto aboutDto){
        return ResponseEntity.ok(aboutService.createAbout(aboutDto,userName));
    }
    @GetMapping("/getAbout/{userName}")
    ResponseEntity<AboutDto> getAbout(@PathVariable(value = "userName") String userName){
        AboutDto aboutDto=aboutService.getAbout(userName);
        return ResponseEntity.ok(aboutDto);
    }

}
