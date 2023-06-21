package com.litwago.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TireAxis {

    @NotNull
    @Valid
    TireDamage left;

    @NotNull
    @Valid
    TireDamage right;
}
