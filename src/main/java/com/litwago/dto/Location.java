package com.litwago.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Location {

    @NotBlank
    @Size(max = 2)
    String countryCode;

    @NotBlank
    @Size(max = 10)
    String postalCode;
}
