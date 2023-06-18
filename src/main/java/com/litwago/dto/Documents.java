package com.litwago.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Documents {

    @PositiveOrZero
    @Max(99999)
    int vehicleRegistration;

    @PositiveOrZero
    @Max(99999)
    int vehicleInspection;

    @PositiveOrZero
    @Max(99999)
    int conformity;

    @PositiveOrZero
    @Max(99999)
    int insurancePolicy;

    @PositiveOrZero
    @Max(99999)
    int atpFrc;

    @PositiveOrZero
    @Max(99999)
    int euro;

    @PositiveOrZero
    @Max(99999)
    int thermographPrinter;

    @PositiveOrZero
    @Max(99999)
    int thermograph;

    @PositiveOrZero
    @Max(99999)
    int alarmPanel;

    @PositiveOrZero
    @Max(99999)
    int keyNumber;
}
