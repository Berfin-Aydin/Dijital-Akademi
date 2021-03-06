package com.dijitalAkademi.ws.Service;

import com.dijitalAkademi.ws.Dto.RegistrationRequest;
import com.dijitalAkademi.ws.Dto.UserDto;

import java.util.List;

public interface UserService {

    UserDto createUser(UserDto userDto);

    UserDto  updateUser(String userName,UserDto userDto);

    UserDto getUser(String userName);

    UserDto login(UserDto userDto);

    List<UserDto> getUsers();

    Boolean register(RegistrationRequest registrationRequest);

    String deleteUser1(String userName);
}
