package com.litwago.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class NewDriver extends Driver {

    boolean hasSeal;
}
