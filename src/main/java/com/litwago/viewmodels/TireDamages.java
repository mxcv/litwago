package com.litwago.viewmodels;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TireDamages {

    TireAxis firstAxis;
    TireAxis secondAxis;
    TireAxis thirdAxis;
}
