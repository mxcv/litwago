package com.litwago.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class Driver {

    @NotBlank
    @Size(max = 30)
    String firstName;

    @NotBlank
    @Size(max = 30)
    String lastName;

    @NotBlank
    String signature;
}
