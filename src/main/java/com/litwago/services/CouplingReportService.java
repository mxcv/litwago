package com.litwago.services;

import com.litwago.exceptions.ReportException;
import com.litwago.viewmodels.Coupling;
import fr.opensagres.xdocreport.converter.ConverterTypeTo;
import fr.opensagres.xdocreport.converter.ConverterTypeVia;
import fr.opensagres.xdocreport.converter.Options;
import fr.opensagres.xdocreport.core.XDocReportException;
import fr.opensagres.xdocreport.document.IXDocReport;
import fr.opensagres.xdocreport.document.images.ByteArrayImageProvider;
import fr.opensagres.xdocreport.document.registry.XDocReportRegistry;
import fr.opensagres.xdocreport.template.IContext;
import fr.opensagres.xdocreport.template.TemplateEngineKind;
import fr.opensagres.xdocreport.template.formatter.FieldsMetadata;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.UUID;

@Service
public class CouplingReportService implements ReportService<Coupling> {

    @Value("classpath:reports/coupling-template.odt")
    Resource templateResource;

    public File createReport(Coupling coupling) {
        try {
            IXDocReport report = XDocReportRegistry.getRegistry()
                .loadReport(templateResource.getInputStream(), TemplateEngineKind.Velocity);

            FieldsMetadata metadata = new FieldsMetadata();
            metadata.addFieldAsImage("oldDriverSignature");
            metadata.addFieldAsImage("newDriverSignature");
            report.setFieldsMetadata(metadata);

            IContext context = report.createContext();
            context.put("c", coupling);
            context.put("oldDriverSignature", new ByteArrayImageProvider(coupling.getOldDriver().getSignature()));
            context.put("newDriverSignature", new ByteArrayImageProvider(coupling.getNewDriver().getSignature()));

            File out = new File(UUID.randomUUID() + ".pdf");
            Options options = Options.getTo(ConverterTypeTo.PDF).via(ConverterTypeVia.ODFDOM);
            report.convert(context, options, new FileOutputStream(out));
            return out;
        } catch (IOException | XDocReportException e) {
            e.printStackTrace();
            throw new ReportException(e);
        }
    }
}
