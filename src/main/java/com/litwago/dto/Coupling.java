package com.litwago.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.OffsetDateTime;
import java.time.ZonedDateTime;

@Data
public class Coupling {

    @NotBlank
    @Size(max = 10)
    String firstTruckNumber;

    @NotBlank
    @Size(max = 10)
    String secondTruckNumber;

    @NotBlank
    @Size(max = 10)
    String trailerNumber;

    @NotNull
    Location location;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    OffsetDateTime date;

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
