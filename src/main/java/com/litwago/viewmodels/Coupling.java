package com.litwago.viewmodels;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Coupling {

    String oldTruckNumber;
    String newTruckNumber;
    String trailerNumber;
    String location;
    String date;
    FuelRefrigerator fuelRefrigerator;
    Equipment equipment;
    Documents documents;
    TireDamages tireDamages;
    TruckDamages truckDamages;
    Driver oldDriver;
    NewDriver newDriver;
}
