package com.litwago.services;

import com.litwago.models.User;
import com.litwago.models.Role;
import com.litwago.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository repository;

    public List<User> getDrivers() {
        int userId = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return repository.findByIdNotAndRole(userId, Role.DRIVER);
    }
}
