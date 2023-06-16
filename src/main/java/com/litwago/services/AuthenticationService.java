package com.litwago.services;

import com.litwago.dto.in.UserLogin;
import com.litwago.dto.in.UserRegister;
import com.litwago.exceptions.DuplicateEmailException;
import com.litwago.models.Role;
import com.litwago.models.User;
import com.litwago.repositories.UserRepository;
import com.litwago.dto.out.UserAuthentication;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public UserAuthentication register(UserRegister request) {
        var user = User.builder()
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.DRIVER)
            .build();
        if (repository.existsUserByEmail(user.getEmail()))
            throw new DuplicateEmailException();
        return authenticate(user);
    }

    public UserAuthentication login(UserLogin request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()));
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        return authenticate(user);
    }

    public UserAuthentication refresh(String refreshToken) {
        var user = repository.findByEmail(jwtService.extractUsername(refreshToken)).orElseThrow();
        if (!user.getRefreshToken().equals(refreshToken) || jwtService.isTokenExpired(refreshToken))
            throw new RuntimeException();
        return authenticate(user);
    }

    private UserAuthentication authenticate(User user) {
        user.setRefreshToken(jwtService.generateRefreshToken(user));
        repository.save(user);
        return UserAuthentication.builder()
            .email(user.getEmail())
            .role(user.getRole().name())
            .accessToken(jwtService.generateToken(user))
            .refreshToken(user.getRefreshToken())
            .build();
    }
}
