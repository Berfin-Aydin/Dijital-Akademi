package com.dijitalAkademi.ws.Service.Impl;

import com.dijitalAkademi.ws.Dto.AboutDto;
import com.dijitalAkademi.ws.Repository.AboutRepository;
import com.dijitalAkademi.ws.Service.AboutService;
import com.dijitalAkademi.ws.entity.About;
import org.springframework.stereotype.Service;

@Service
public class AboutServiceImpl implements AboutService {
    AboutRepository aboutRepository;
    public AboutServiceImpl(AboutRepository aboutRepository){
        this.aboutRepository=aboutRepository;

    }

    @Override
    public AboutDto createAbout(AboutDto aboutDto, String userName) {
        About about=aboutRepository.findByUserName(userName);
    if(about!=null){
        about.setId(aboutDto.getId());
    }
    about.setAboutImg(aboutDto.getAboutImg());
about.setAboutVision(aboutDto.getAboutVision());
about.setAboutMission(aboutDto.getAboutMission());
about.setAboutContact(aboutDto.getAboutContact());

aboutRepository.save(about);

        return aboutDto;
    }

    @Override
    public AboutDto getAbout(String userName) {
        About about=aboutRepository.findByUserName(userName);
        if(userName==null || about == null){
            throw new IllegalArgumentException("Hakkımda bilgisi bulunamadı");
        }
        //veritabına bir değişiklik yapmauyacğım için AboutDTO kullandım
        AboutDto aboutDto=new AboutDto();
        aboutDto.setUserName(about.getUserName()); //about get ile oku bunu dto(kullanıcıya gösterdiğim yere ata kullanıc setlenerek görünsün
       // aboutDto.setAboutImg(about.getAboutImg());
        aboutDto.setAboutVision(about.getAboutVision());
        aboutDto.setAboutMission(about.getAboutMission());
        aboutDto.setAboutContact(about.getAboutContact());
        return aboutDto;
    }
}
