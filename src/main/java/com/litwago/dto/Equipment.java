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
public class Equipment {

    @PositiveOrZero
    @Max(99999)
    int belts;

    @PositiveOrZero
    @Max(99999)
    int cargoShelves;

    @PositiveOrZero
    @Max(99999)
    int spareWheels;

    @PositiveOrZero
    @Max(99999)
    int chocks;

    @PositiveOrZero
    @Max(99999)
    int mountingBrackets;

    @PositiveOrZero
    @Max(99999)
    int hooks;

    @PositiveOrZero
    @Max(99999)
    int rods;

    @PositiveOrZero
    @Max(99999)
    int palettes;

    @PositiveOrZero
    @Max(99999)
    int crossbar2Tier;

    @PositiveOrZero
    @Max(99999)
    int ladders;

    @PositiveOrZero
    @Max(99999)
    int fasteningBoards;

    @PositiveOrZero
    @Max(99999)
    int rubberMatsSmall;

    @PositiveOrZero
    @Max(99999)
    int rubberMatsLarge;
}
