package com.litwago.viewmodels;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FuelRefrigerator {

    int liters;
    int motoHours;
    boolean signalizationWorks;
}
