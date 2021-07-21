package com.dijitalAkademi.ws.Service.Impl;

import com.dijitalAkademi.ws.Dto.RegistrationRequest;
import com.dijitalAkademi.ws.Dto.UserDto;
import com.dijitalAkademi.ws.Repository.UserRepository;
import com.dijitalAkademi.ws.Service.UserService;
import com.dijitalAkademi.ws.entity.User;
import javassist.NotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    UserRepository userRepository;
    BCryptPasswordEncoder bCryptPasswordEncoder;
    // veritabanında gönderdiğiklerim  user frontend gönderdikleirm veritabanına dto olacak
    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public UserDto createUser(UserDto userDto) {
        Optional<User> byUserEmailAddress = userRepository.findByUserEmailAddress(userDto.getUserEmailAddress());
        if (byUserEmailAddress.isPresent()) {
            throw new IllegalArgumentException("emai,l var");
        }

        User user = new User();//yeni bir kullanıcı için satır oluşturacak
        // kullanıcı tarafından doldurulan bilgiler user entity'e atanacak
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
        //new demedşm çünkü yeni bir satır açmama gerek kalmadı zaten satrım var

        User user = userRepository.findByUserName(userName); //id'ye sahip olan entity bulunacak
        if (user == null) {
            throw new IllegalArgumentException("user bulunamadı");
        }
//user tarafından güncellencek olan bilgiler tekrar user entity'e atandı
        user.setUserId(user.getUserId());
        user.setUserEmailAddress(userDto.getUserEmailAddress());
        user.setUserName(userDto.getUserName());
        user.setUserGender(userDto.getUserGender());
        user.setUserSurname(userDto.getUserSurname());
        user.setUserPhone(userDto.getUserPhone());
        //user.setUserPassword(userDto.getUserPassword());
        userRepository.save(user);


        return userDto;
    }

    @Override
    public UserDto getUser(String userName) {
        //yeni bir satır açmama gerek yok zatenbenim satırım var sadece giriş biligileri kontorl edilecek
        User user = userRepository.findByUserName(userName);
        if (user == null) {
            throw new IllegalArgumentException("Kullanıcı bulunamadı");
        }
        UserDto userDto = new UserDto(); // frontEnd bizden UserDto beklediği için entitydeki veriler userDto'ya atanacak
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
            throw new IllegalArgumentException("giriş yapılamadı");
        }
        UserDto userDto1 = new UserDto();
        userDto1.setUserEmailAddress(user.getUserEmailAddress());
        userDto1.setUserName(user.getUserName());
        userDto1.setUserSurname(user.getUserSurname());
        return userDto1;

    }

    @Override
    public Long deleteUser(Long id) {
        try {
            userRepository.deleteById(id);

        }catch (Exception e)
        {
            throw new IllegalArgumentException("user bulunamadı");
        }
        return id;
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
            User user = new User();
            user.setUserName(registrationRequest.getUserName());
            user.setUserGender(registrationRequest.getUserGender());
            user.setUserSurname(registrationRequest.getUserSurname());
            user.setUserPhone(registrationRequest.getUserPhone());
            user.setUserPassword(bCryptPasswordEncoder.encode(registrationRequest.getUserPassword()));//password  şifreleyerek koyacak
            user.setUserEmailAddress(registrationRequest.getUserEmailAddress());
            userRepository.save(user);
            return Boolean.TRUE;
        }catch (Exception e){
            return Boolean.FALSE;
        }
    }

    @Override
    public String deleteUser1(String userName) {
        User user= userRepository.findByUserName(userName);
        userRepository.delete(user);

        try{
            //userRepository.deleteByUserName(userName);
        }catch (Exception e){
            throw new IllegalArgumentException("user bulunamadı");
        }
        return userName;
    }

/*
    OneToOne  1:1
    OneToMany 1:n
    ManyToOne: n:1
    ManyToMany n:n
*/


}
