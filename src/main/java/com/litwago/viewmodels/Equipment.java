package com.litwago.viewmodels;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Equipment {

    int belts;
    int cargoShelves;
    int spareWheels;
    int chocks;
    int mountingBrackets;
    int hooks;
    int rods;
    int palettes;
    int crossbar2Tier;
    int ladders;
    int fasteningBoards;
    int rubberMatsSmall;
    int rubberMatsLarge;
}
