package com.litwago.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Coupling {

    @Id
    @GeneratedValue
    Integer id;

    String oldTruckNumber;
    String newTruckNumber;
    String trailerNumber;
    String countryCode;
    String postalCode;
    OffsetDateTime date;
    boolean hasSeal;

    @Lob
    String oldDriverSignature;

    @Lob
    String newDriverSignature;

    @ManyToOne
    @JoinColumn(name = "oldDriverId")
    User oldDriver;

    @ManyToOne
    @JoinColumn(name = "newDriverId")
    User newDriver;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "trailerChangeId", referencedColumnName = "id")
    TrailerChange trailerChange;
}
