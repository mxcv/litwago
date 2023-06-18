package com.litwago.controllers;

import com.litwago.converters.Converter;
import com.litwago.dto.Coupling;
import com.litwago.services.CouplingService;
import com.litwago.services.ReportService;
import com.litwago.utils.CleanupFileSystemResource;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping("api/couplings")
public class CouplingController {

    private final ReportService<com.litwago.viewmodels.Coupling> reportService;
    private final Converter<Coupling, com.litwago.models.Coupling> dtoToModelConverter;
    private final Converter<com.litwago.models.Coupling, Coupling> modelToDtoConverter;
    private final Converter<com.litwago.models.Coupling, com.litwago.viewmodels.Coupling> modelToViewModelConverter;
    private final CouplingService couplingService;

    @PostMapping
    public void post(@Valid @RequestBody Coupling coupling) {
        couplingService.createCoupling(dtoToModelConverter.convert(coupling));
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
    public FileSystemResource get(@PathVariable int id) {
        return new CleanupFileSystemResource(
            reportService.createReport(
                modelToViewModelConverter.convert(
                    couplingService.getFullCoupling(id))));
    }

    @GetMapping("/last")
    public Coupling get(@RequestParam String trailerNumber) {
        return modelToDtoConverter.convert(
            couplingService.getLastFullCoupling(trailerNumber));
    }

    @GetMapping("/my")
    public List<Coupling> get() {
        return couplingService.getDriverCouplings()
            .stream()
            .map(modelToDtoConverter::convert)
            .collect(Collectors.toList());
    }
}
