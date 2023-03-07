package com.litwago.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TireAxis {

    @NotNull
    @Valid
    TireDamage left;

    @NotNull
    @Valid
    TireDamage right;
}
