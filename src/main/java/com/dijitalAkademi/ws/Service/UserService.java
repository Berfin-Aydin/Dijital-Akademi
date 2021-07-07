package com.dijitalAkademi.ws.Service;

import com.dijitalAkademi.ws.Dto.RegistrationRequest;
import com.dijitalAkademi.ws.Dto.UserDto;

import java.util.List;

public interface UserService {

    UserDto createUser(UserDto userDto);

    UserDto  updateUser(Long id,UserDto userDto);

    UserDto getUser(Long id);

    UserDto login(UserDto userDto);

    Long deleteUser(Long id);

    List<UserDto> getUsers();

    Boolean register(RegistrationRequest registrationRequest);
}
