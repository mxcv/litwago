package com.litwago.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FuelRefrigerator {

    @PositiveOrZero
    @Max(999999999)
    int liters;

    @PositiveOrZero
    @Max(999999999)
    int motoHours;

    boolean signalizationWorks;
}
