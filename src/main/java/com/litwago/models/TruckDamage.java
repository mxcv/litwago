package com.litwago.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class TruckDamage {

    @Id
    @GeneratedValue
    Integer id;

    String area;
    DamageType damage;

    @ManyToMany(mappedBy = "damages")
    Set<TruckDamages> truckDamages;
}
