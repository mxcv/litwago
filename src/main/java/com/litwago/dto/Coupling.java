package com.litwago.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Coupling {

    Integer id;

    @Size(max = 10)
    String oldTruckNumber;

    @Size(max = 10)
    String newTruckNumber;

    @NotBlank
    @Size(max = 10)
    String trailerNumber;

    @NotNull
    Location location;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    OffsetDateTime date;

    @Valid
    TrailerChange trailerChange;

    @Valid
    Driver oldDriver;

    @Valid
    Driver newDriver;
}
