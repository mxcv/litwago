package com.litwago.controllers;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.OffsetDateTimeSerializer;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping
    public String get(@RequestBody T d) {
        OffsetDateTime o = OffsetDateTime.parse("2023-02-07T12:23:41.000+01:00");
        return d.toString();
    }
}

@Data
class T {

    @JsonDeserialize()
    OffsetDateTime d;
}