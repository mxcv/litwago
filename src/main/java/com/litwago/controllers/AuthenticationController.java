package com.litwago.controllers;

import com.litwago.dto.in.UserLogin;
import com.litwago.dto.in.UserRefresh;
import com.litwago.dto.in.UserRegister;
import com.litwago.services.AuthenticationService;
import com.litwago.dto.out.UserAuthentication;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public UserAuthentication register(@RequestBody UserRegister request) {
        return service.register(request);
    }

    @PostMapping("/login")
    public UserAuthentication login(@RequestBody UserLogin request) {
        return service.login(request);
    }

    @PostMapping("/refresh")
    public UserAuthentication refresh(@RequestBody UserRefresh request) {
        return service.refresh(request);
    }
}
