package com.litwago.services;

import com.litwago.dto.Location;
import com.litwago.exceptions.GeocodingException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class GeocodingService {

    @Value("${geocoding.api-key}")
    private String apiKey;

    @SuppressWarnings("unchecked")
    public Location getLocationByCoordinates(double latitude, double longitude) {
        try {
            Map<String, ?> response = WebClient.create("https://api.geoapify.com/v1")
                .get()
                .uri(builder -> builder.path("/geocode/reverse")
                    .queryParam("lat", latitude)
                    .queryParam("lon", longitude)
                    .queryParam("type", "postcode")
                    .queryParam("apiKey", apiKey)
                    .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, ?>>() {})
                .block();
            Map<String, String> address = ((List<Map<String, Map<String, String>>>)
                Objects.requireNonNull(response).get("features")).get(0).get("properties");
            return new Location(address.get("country_code").toUpperCase(), address.get("postcode"));
        }
        catch (Exception e) {
            e.printStackTrace();
            throw new GeocodingException(e);
        }
    }
}
