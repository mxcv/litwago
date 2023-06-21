package com.litwago.controllers;

import com.litwago.converters.Converter;
import com.litwago.dto.Driver;
import com.litwago.models.User;
import com.litwago.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/drivers")
@RequiredArgsConstructor
public class DriverController {

    private final UserService userService;
    private final Converter<User, Driver> converter;

    @GetMapping
    public List<Driver> get() {
        return userService.getDrivers()
            .stream()
            .map(converter::convert)
            .collect(Collectors.toList());
    }
}
