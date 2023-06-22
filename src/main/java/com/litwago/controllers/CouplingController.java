package com.litwago.controllers;

import com.litwago.converters.Converter;
import com.litwago.dto.Coupling;
import com.litwago.dto.out.PageResponse;
import com.litwago.services.CouplingService;
import com.litwago.services.ReportService;
import com.litwago.utils.CleanupFileSystemResource;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("api/couplings")
@RequiredArgsConstructor
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
    public PageResponse<Coupling> get(@RequestParam int page, @RequestParam int size) {
        Page<com.litwago.models.Coupling> p = couplingService.getDriverCouplings(page, size);
        return new PageResponse<>((int)p.getTotalElements(), p.stream()
            .map(modelToDtoConverter::convert)
            .collect(Collectors.toList()));
    }

    @GetMapping
    public PageResponse<Coupling> getByTrailerNumber(@RequestParam String trailerNumber,
                                                     @RequestParam boolean withoutChange,
                                                     @RequestParam int page,
                                                     @RequestParam int size) {
        Page<com.litwago.models.Coupling> p = couplingService
            .getByTrailerNumber(trailerNumber, withoutChange, page, size);
        return new PageResponse<>((int)p.getTotalElements(), p.stream()
            .map(modelToDtoConverter::convert)
            .collect(Collectors.toList()));
    }
}
