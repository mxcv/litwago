package com.litwago.viewmodels;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Driver {

    String firstName;
    String lastName;
    byte[] signature;
}
