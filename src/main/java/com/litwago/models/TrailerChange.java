package com.litwago.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TrailerChange {

    @Id
    @GeneratedValue
    Integer id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fuelRefrigeratorId", referencedColumnName = "id")
    FuelRefrigerator fuelRefrigerator;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "equipmentId", referencedColumnName = "id")
    Equipment equipment;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "documentsId", referencedColumnName = "id")
    Documents documents;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "tireDamagesId", referencedColumnName = "id")
    TireDamages tireDamages;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "truckDamagesId", referencedColumnName = "id")
    TruckDamages truckDamages;

    @OneToOne(mappedBy = "trailerChange")
    Coupling coupling;
}
