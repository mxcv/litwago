package com.litwago.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TruckDamage {

    @NotBlank
    @Size(max = 3)
    String area;

    DamageType damage;
}
