package com.litwago.viewmodels;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TruckDamages {

    TruckDamage[] damages;
    String[] otherDamage;
}
