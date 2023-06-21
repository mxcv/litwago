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
