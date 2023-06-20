package com.litwago.dto.out;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserAuthentication {

    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private String accessToken;
    private String refreshToken;
}
