package com.litwago.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TireDamages {

    @NotNull
    @Valid
    TireAxis firstAxis;

    @NotNull
    @Valid
    TireAxis secondAxis;

    @NotNull
    @Valid
    TireAxis thirdAxis;
}
