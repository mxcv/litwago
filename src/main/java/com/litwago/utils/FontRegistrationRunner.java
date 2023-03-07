package com.litwago.utils;

import com.lowagie.text.FontFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class FontRegistrationRunner implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) {
        FontFactory.registerDirectory("/fonts");
    }
}
