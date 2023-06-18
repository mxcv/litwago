package com.litwago.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Documents {

    @Id
    @GeneratedValue
    Integer id;

    int vehicleRegistration;
    int vehicleInspection;
    int conformity;
    int insurancePolicy;
    int atpFrc;
    int euro;
    int thermographPrinter;
    int thermograph;
    int alarmPanel;
    int keyNumber;

    @OneToOne(mappedBy = "documents")
    TrailerChange trailerChange;
}
