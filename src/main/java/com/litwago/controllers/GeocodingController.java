package com.litwago.controllers;

import com.litwago.dto.Location;
import com.litwago.services.GeocodingService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/geocode")
@Validated
@RequiredArgsConstructor
public class GeocodingController {

    private final GeocodingService geocodingService;

    @GetMapping
    public Location post(@RequestParam @Min(-90) @Max(90) double latitude,
                         @RequestParam @Min(-90) @Max(90) double longitude) {

        return geocodingService.getLocationByCoordinates(latitude, longitude);
    }
}
