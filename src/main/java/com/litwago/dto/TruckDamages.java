package com.litwago.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class TruckDamages {

    @Valid
    List<TruckDamage> damages = new ArrayList<>();

    @Size(max = 440)
    String otherDamage;
}
