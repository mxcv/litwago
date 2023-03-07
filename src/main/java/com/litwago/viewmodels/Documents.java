package com.litwago.viewmodels;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Documents {

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
}
