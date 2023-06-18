package com.litwago.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.HashMap;
import java.util.Map;

public enum DamageType {

    SCRATCH,
    DENT,
    HOLE_CRACK,
    NONE;

    private static final Map<String, DamageType> namesMap = new HashMap<>(4);

    static {
        namesMap.put("B", SCRATCH);
        namesMap.put("L", DENT);
        namesMap.put("T", HOLE_CRACK);
        namesMap.put("N", NONE);
    }

    @JsonCreator
    public static DamageType forValue(String value) {
        return namesMap.get(value.toUpperCase());
    }

    @JsonValue
    public String toValue() {
        return namesMap.entrySet()
            .stream()
            .filter(x -> x.getValue() == this)
            .findFirst()
            .map(Map.Entry::getKey)
            .orElse(null);
    }
}
