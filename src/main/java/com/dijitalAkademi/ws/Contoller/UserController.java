package com.dijitalAkademi.ws.Contoller;


import com.dijitalAkademi.ws.Dto.UserDto;
import com.dijitalAkademi.ws.Service.UserService;
import com.dijitalAkademi.ws.entity.User;
import com.dijitalAkademi.ws.util.ApiPaths;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController // Controller olduğunu belirttik
@RequestMapping(ApiPaths.UserCtrl.CTRL)

public class UserController {

    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/createUser")
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.createUser(userDto));
    }

    @PostMapping("/updateUser/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable(name = "id") Long id, @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.updateUser(id, userDto));
    }

    @GetMapping("/getUser/{userName}")
    public ResponseEntity<UserDto> getUser(@PathVariable(value = "userName") String userName) {
        UserDto userDto = userService.getUser(userName);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody UserDto userDto){
    return ResponseEntity.ok(userService.login(userDto));
    }

    @DeleteMapping ("/deleteUser/{id}")
    public ResponseEntity<Long> deleteUser(@PathVariable(name="id") Long id){
        return ResponseEntity.ok(userService.deleteUser(id));
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<UserDto>> getUsers(){
        List<UserDto> list =  userService.getUsers();
        return ResponseEntity.ok(list);
    }



}
