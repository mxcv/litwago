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
public class TrailerChange {

    @Valid
    FuelRefrigerator fuelRefrigerator;

    @NotNull
    @Valid
    Equipment equipment;

    @NotNull
    @Valid
    Documents documents;

    @NotNull
    @Valid
    TireDamages tireDamages;

    @NotNull
    @Valid
    TruckDamages truckDamages;
}
