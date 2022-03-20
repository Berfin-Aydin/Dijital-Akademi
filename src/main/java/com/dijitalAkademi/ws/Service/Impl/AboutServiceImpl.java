package com.dijitalAkademi.ws.Service.Impl;

import com.dijitalAkademi.ws.Dto.AboutDto;
import com.dijitalAkademi.ws.Repository.AboutRepository;
import com.dijitalAkademi.ws.Service.AboutService;
import com.dijitalAkademi.ws.entity.About;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AboutServiceImpl implements AboutService {
    private final AboutRepository aboutRepository;

    @Override
    public AboutDto createAbout(AboutDto aboutDto, String userName) {
        if(userName.isEmpty()){
            throw new IllegalArgumentException("User name boş olamaz");
        }
        if(Objects.isNull(aboutDto)){
            throw new IllegalArgumentException("Boş kayoıt eklenemez");
        }
        About about = aboutRepository.findByUserName(userName);
        if (about != null) {
            about.setId(aboutDto.getId());
        }
        about.setUserName(userName);
        about.setAboutVision(aboutDto.getAboutVision());
        about.setAboutMission(aboutDto.getAboutMission());
        about.setAboutContact(aboutDto.getAboutContact());

        aboutRepository.save(about);

        return aboutDto;
    }

    @Override
    public AboutDto getAbout(String userName) {
        if(userName.isEmpty()){
            throw new IllegalArgumentException("Kullanıcı adı boş olamaz");
        }
        About about = aboutRepository.findByUserName(userName);
        if (about == null) {
            throw new IllegalArgumentException("Hakkımda bilgisi bulunamadı");
        }

        AboutDto aboutDto = new AboutDto();
        aboutDto.setUserName(about.getUserName());
        aboutDto.setAboutVision(about.getAboutVision());
        aboutDto.setId(about.getId());
        aboutDto.setAboutMission(about.getAboutMission());
        aboutDto.setAboutContact(about.getAboutContact());
        return aboutDto;
    }
}
