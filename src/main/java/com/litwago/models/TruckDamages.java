package com.litwago.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TruckDamages {

    @Id
    @GeneratedValue
    Integer id;

    @Column(length = 440)
    String otherDamage;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
        name = "truckDamages_truckDamage",
        joinColumns = @JoinColumn(name = "truckDamagesId"),
        inverseJoinColumns = @JoinColumn(name = "truckDamageId"))
    Set<TruckDamage> damages;

    @OneToOne(mappedBy = "truckDamages")
    TrailerChange trailerChange;
}
