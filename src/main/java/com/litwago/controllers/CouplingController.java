package com.litwago.controllers;

import com.litwago.converters.ViewModelConverter;
import com.litwago.dto.Coupling;
import com.litwago.utils.CleanupFileSystemResource;
import com.litwago.services.ReportService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/couplings")
@CrossOrigin
public class CouplingController {

    private final ReportService<com.litwago.viewmodels.Coupling> reportService;
    private final ViewModelConverter<Coupling, com.litwago.viewmodels.Coupling> viewModelConverter;

    public CouplingController(@Autowired ReportService<com.litwago.viewmodels.Coupling> reportService,
                              @Autowired ViewModelConverter<Coupling, com.litwago.viewmodels.Coupling> viewModelConverter) {
        this.reportService = reportService;
        this.viewModelConverter = viewModelConverter;
    }

    @PostMapping(produces = MediaType.APPLICATION_PDF_VALUE)
    public FileSystemResource post(@Valid @RequestBody Coupling coupling) {
        System.out.println(coupling.toString());
        return new CleanupFileSystemResource(
            reportService.createReport(
                viewModelConverter.toViewModel(coupling)));
    }
}
