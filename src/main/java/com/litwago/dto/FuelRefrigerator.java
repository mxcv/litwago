package com.litwago.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class FuelRefrigerator {

    @PositiveOrZero
    @Max(999999999)
    int liters;

    @PositiveOrZero
    @Max(999999999)
    int motoHours;

    boolean signalizationWorks;
}
