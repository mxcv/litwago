package com.litwago.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TireDamage {

    DamageType damage;

    @NotBlank
    @Size(max = 15)
    String manufacturer;
}
