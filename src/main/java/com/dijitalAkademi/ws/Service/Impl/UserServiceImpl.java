package com.dijitalAkademi.ws.Service.Impl;

import com.dijitalAkademi.ws.Dto.RegistrationRequest;
import com.dijitalAkademi.ws.Dto.UserDto;
import com.dijitalAkademi.ws.Repository.UserRepository;
import com.dijitalAkademi.ws.Service.UserService;
import com.dijitalAkademi.ws.entity.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    UserRepository userRepository;
    NoteServiceImpl noteServiceImpl;
    BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           BCryptPasswordEncoder bCryptPasswordEncoder,
                           NoteServiceImpl noteServiceImpl) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.noteServiceImpl = noteServiceImpl;
    }

    @Override
    public UserDto createUser(UserDto userDto) {
        Optional<User> byUserEmailAddress = userRepository.findByUserEmailAddress(userDto.getUserEmailAddress());
        if (byUserEmailAddress.isPresent()) {
            throw new IllegalArgumentException("emai,l var");
        }

        User user = new User();
        user.setUserName(userDto.getUserName());
        user.setUserGender(userDto.getUserGender());
        user.setUserSurname(userDto.getUserSurname());
        user.setUserPhone(userDto.getUserPhone());
        user.setUserPassword(userDto.getUserPassword());
        user.setUserEmailAddress(userDto.getUserEmailAddress());

        userRepository.save(user);

        return userDto;
    }

    @Override
    public UserDto updateUser(String userName, UserDto userDto) {

        User user = userRepository.findByUserName(userName);
        if (user == null) {
            throw new IllegalArgumentException("user bulunamad??");
        }
        user.setUserId(user.getUserId());
        user.setUserEmailAddress(userDto.getUserEmailAddress());
        user.setUserName(userDto.getUserName());
        user.setUserGender(userDto.getUserGender());
        user.setUserSurname(userDto.getUserSurname());
        user.setUserPhone(userDto.getUserPhone());
        userRepository.save(user);


        return userDto;
    }

    @Override
    public UserDto getUser(String userName) {
        User user = userRepository.findByUserName(userName);
        if (user == null) {
            throw new IllegalArgumentException("Kullan??c?? bulunamad??");
        }
        UserDto userDto = new UserDto();
        userDto.setUserEmailAddress(user.getUserEmailAddress());
        userDto.setUserPhone(user.getUserPhone());
        userDto.setUserGender(user.getUserGender());
        userDto.setUserName(user.getUserName());
        userDto.setUserSurname(user.getUserSurname());
        return userDto;
    }

    @Override
    public UserDto login(UserDto userDto) {
        User user = userRepository.findByUserEmailAddressAndUserPassword(userDto.getUserEmailAddress(), userDto.getUserPassword());
        if (user == null) {
            throw new IllegalArgumentException("giri?? yap??lamad??");
        }
        UserDto userDto1 = new UserDto();
        userDto1.setUserEmailAddress(user.getUserEmailAddress());
        userDto1.setUserName(user.getUserName());
        userDto1.setUserSurname(user.getUserSurname());
        return userDto1;

    }

    @Override
    public List<UserDto> getUsers() {

        List<User> userList = userRepository.findAll();
        return userList.stream()
                .filter(Objects::nonNull)
                .map(this::userToUserDTO)
                .collect(Collectors.toList());

    }

    private UserDto userToUserDTO(User user) {
        UserDto userDto = new UserDto();
        userDto.setUserPassword(user.getUserPassword());
        userDto.setUserPhone(user.getUserPhone());
        userDto.setUserName(user.getUserName());
        userDto.setUserGender(user.getUserGender());
        userDto.setUserSurname(user.getUserSurname());
        userDto.setUserEmailAddress(user.getUserEmailAddress());
        return userDto;
    }

    @Override
    public Boolean register(RegistrationRequest registrationRequest) {
        try {
            User userByUserName = userRepository.findByUserName(registrationRequest.getUserName());
            if (userByUserName != null) {
                return Boolean.FALSE;
            }
            User user = new User();
            user.setUserName(registrationRequest.getUserName());
            user.setUserGender(registrationRequest.getUserGender());
            user.setUserSurname(registrationRequest.getUserSurname());
            user.setUserPhone(registrationRequest.getUserPhone());
            user.setUserPassword(bCryptPasswordEncoder.encode(registrationRequest.getUserPassword()));
            user.setUserEmailAddress(registrationRequest.getUserEmailAddress());
            userRepository.save(user);
            return Boolean.TRUE;
        } catch (Exception e) {
            return Boolean.FALSE;
        }
    }

    @Override
    @Transactional
    public String deleteUser1(String userName) {
        User user = userRepository.findByUserName(userName);
        Boolean deletebyUserId = noteServiceImpl.deletebyUserId(userName);
        if (!deletebyUserId) {
            throw new IllegalArgumentException("user ait notlar silinemedi");
        }
        userRepository.delete(user);

        try {
            //userRepository.deleteByUserName(userName);
        } catch (Exception e) {
            throw new IllegalArgumentException("user bulunamad??");
        }
        return userName;
    }

}
