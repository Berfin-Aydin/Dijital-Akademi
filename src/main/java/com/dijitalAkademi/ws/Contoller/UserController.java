package com.dijitalAkademi.ws.Contoller;


import com.dijitalAkademi.ws.Dto.UserDto;
import com.dijitalAkademi.ws.Service.UserService;
import com.dijitalAkademi.ws.entity.User;
import com.dijitalAkademi.ws.util.ApiPaths;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController // Controller olduğunu belirttik
@RequestMapping(ApiPaths.UserCtrl.CTRL)
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/createUser")
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.createUser(userDto));
    }

    @PostMapping("/updateUser/{userName}")
    public ResponseEntity<UserDto> updateUser(@PathVariable(value = "userName") String userName, @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.updateUser(userName, userDto));
    }

    @GetMapping("/getUser/{userName}")
    public ResponseEntity<UserDto> getUser(@PathVariable(value = "userName") String userName) {
        UserDto userDto = userService.getUser(userName);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.login(userDto));
    }

    @DeleteMapping("/deleteUser1/{userName}")
    public ResponseEntity<String> deleteUser1(@PathVariable(value = "userName") String userName) {
        return ResponseEntity.ok(userService.deleteUser1(userName));
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<UserDto>> getUsers() {
        List<UserDto> list = userService.getUsers();
        return ResponseEntity.ok(list);
    }


}
