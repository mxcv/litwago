package com.litwago.viewmodels;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class NewDriver extends Driver {

    boolean hasSeal;
}
