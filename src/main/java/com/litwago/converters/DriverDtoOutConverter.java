package com.litwago.converters;

import com.litwago.dto.Driver;
import com.litwago.models.User;
import org.springframework.stereotype.Component;

@Component
public class DriverDtoOutConverter implements Converter<User, Driver> {

    @Override
    public Driver convert(User user) {
        return Driver.builder()
            .id(user.getId())
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .build();
    }
}
