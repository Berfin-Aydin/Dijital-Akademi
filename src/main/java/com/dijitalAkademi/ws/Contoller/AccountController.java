package com.dijitalAkademi.ws.Contoller;

import com.dijitalAkademi.ws.Dto.LoginRequest;
import com.dijitalAkademi.ws.Dto.RegistrationRequest;
import com.dijitalAkademi.ws.Dto.TokenResponse;
import com.dijitalAkademi.ws.Repository.UserRepository;
import com.dijitalAkademi.ws.Service.Impl.UserServiceImpl;
import com.dijitalAkademi.ws.entity.User;
import com.dijitalAkademi.ws.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

@RestController
@RequestMapping("/token")
public class AccountController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserServiceImpl userService;

    //login işlemi
    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) throws AuthenticationException {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword()));
        final User user = userRepository.findByUserName(request.getUserName());
        final String token = jwtTokenUtil.generateToken(user);
        return ResponseEntity.ok(new TokenResponse(user.getUserName(), token));
    }

    @PostMapping("/admin")
    public ResponseEntity<?> loginAdmin(@RequestBody LoginRequest request) throws AuthenticationException {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword()));
        final User user = userRepository.findByUserName(request.getUserName());
        final String token = jwtTokenUtil.generateToken(user);
        if(user.getUserStatus() != 1){
            throw new IllegalArgumentException("hatalı giriş");
        }
        return ResponseEntity.ok(new TokenResponse(user.getUserName(), token));
    }

    //Kullanıcı Kayıt işlemii
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> register(@RequestBody RegistrationRequest registrationRequest) throws AuthenticationException {
        Boolean response = userService.register(registrationRequest);
        if(!response){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("aynı kullanıcı bulunuyor");
        }
        return ResponseEntity.ok(true);
    }

}
