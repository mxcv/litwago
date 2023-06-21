package com.litwago.dto;

import com.litwago.models.DamageType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TireDamage {

    DamageType damage;

    @NotBlank
    @Size(max = 15)
    String manufacturer;
}
