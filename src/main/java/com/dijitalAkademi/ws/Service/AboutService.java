package com.dijitalAkademi.ws.Service;

import com.dijitalAkademi.ws.Dto.AboutDto;

public interface AboutService {
    AboutDto createAbout(AboutDto aboutDto, String id);

    AboutDto getAbout(String userName);
}
