package com.litwago.viewmodels;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Coupling {

    String firstTruckNumber;
    String secondTruckNumber;
    String trailerNumber;
    String location;
    String date;
    FuelRefrigerator fuelRefrigerator;
    Equipment equipment;
    Documents documents;
    TireDamages tireDamages;
    TruckDamages truckDamages;
}
