package com.litwago.viewmodels;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class Driver {

    String firstName;
    String lastName;
    byte[] signature;
}
