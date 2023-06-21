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
public class TruckDamage {

    @NotBlank
    @Size(max = 3)
    String area;

    DamageType damage;
}
