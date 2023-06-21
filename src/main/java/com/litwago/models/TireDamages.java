package com.litwago.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TireDamages {

    @Id
    @GeneratedValue
    Integer id;

    DamageType firstLeftDamage;
    String firstLeftManufacturer;
    DamageType firstRightDamage;
    String firstRightManufacturer;

    DamageType secondLeftDamage;
    String secondLeftManufacturer;
    DamageType secondRightDamage;
    String secondRightManufacturer;

    DamageType thirdLeftDamage;
    String thirdLeftManufacturer;
    DamageType thirdRightDamage;
    String thirdRightManufacturer;

    @OneToOne(mappedBy = "tireDamages")
    TrailerChange trailerChange;
}
