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

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FuelRefrigerator {

    @Id
    @GeneratedValue
    Integer id;

    int liters;
    int motoHours;
    boolean signalizationWorks;

    @OneToOne(mappedBy = "fuelRefrigerator")
    TrailerChange trailerChange;
}
