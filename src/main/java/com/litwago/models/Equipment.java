package com.litwago.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
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
@Entity
public class Equipment {

    @Id
    @GeneratedValue
    Integer id;

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

    @OneToOne(mappedBy = "equipment")
    TrailerChange trailerChange;
}
