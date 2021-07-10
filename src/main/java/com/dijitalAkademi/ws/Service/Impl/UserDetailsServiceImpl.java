package com.dijitalAkademi.ws.Service.Impl;

import com.dijitalAkademi.ws.Repository.UserRepository;
import com.dijitalAkademi.ws.Service.UserService;
import com.dijitalAkademi.ws.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class UserDetailsServiceImpl  implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //user tipi verilecek
        User user = userRepository.findByUserName(username);
        if(user == null){
            throw new UsernameNotFoundException("Invalid username or password.");
        }// Rololuşturuyoruz
        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getUserPassword(), Arrays.asList(new SimpleGrantedAuthority("USER")));
    }
}