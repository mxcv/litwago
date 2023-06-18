package com.litwago.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TruckDamages {

    @Valid
    List<TruckDamage> damages = new ArrayList<>();

    @Size(max = 440)
    String otherDamage;
}
