package com.dijitalAkademi.ws.Repository;

import com.dijitalAkademi.ws.entity.About;
import com.dijitalAkademi.ws.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AboutRepository  extends JpaRepository<About,Long>{


    About findByUserName(String userName);
}
