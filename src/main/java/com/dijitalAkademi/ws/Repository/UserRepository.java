package com.dijitalAkademi.ws.Repository;

import com.dijitalAkademi.ws.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findByUserEmailAddress(String email);

    User findByUserId(Long id);

    User findByUserEmailAddressAndUserPassword(String email,String password);
    //List<User> getAll();

}
