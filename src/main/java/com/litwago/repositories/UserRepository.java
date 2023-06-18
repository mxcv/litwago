package com.litwago.repositories;

import java.util.List;
import java.util.Optional;

import com.litwago.models.Role;
import com.litwago.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    List<User> findByIdNotAndRole(Integer id, Role role);
    Optional<User> findByEmail(String email);
    boolean existsUserByEmail(String email);
}
