package com.litwago.converters;

import com.litwago.models.DamageType;
import com.litwago.viewmodels.*;
import org.apache.commons.text.WordUtils;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Base64;
import java.util.Set;

@Component
public class CouplingViewModelConverter implements Converter<com.litwago.models.Coupling, Coupling> {

    private final static String EMPTY_IMAGE = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

    @Override
    public Coupling convert(com.litwago.models.Coupling c) {
        return Coupling.builder()
            .oldTruckNumber(c.getOldTruckNumber())
            .newTruckNumber(c.getNewTruckNumber())
            .trailerNumber(c.getTrailerNumber())
            .location(c.getCountryCode().toUpperCase() + ", " + c.getPostalCode())
            .date(c.getDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm")))
            .hasSeal(c.isHasSeal())
            .fuelRefrigerator(c.getTrailerChange().getFuelRefrigerator() == null ? new FuelRefrigerator() : FuelRefrigerator.builder()
                .liters(c.getTrailerChange().getFuelRefrigerator().getLiters())
                .motoHours(c.getTrailerChange().getFuelRefrigerator().getMotoHours())
                .signalizationWorks(c.getTrailerChange().getFuelRefrigerator().isSignalizationWorks())
                .build())
            .equipment(Equipment.builder()
                .belts(c.getTrailerChange().getEquipment().getBelts())
                .cargoShelves(c.getTrailerChange().getEquipment().getCargoShelves())
                .spareWheels(c.getTrailerChange().getEquipment().getSpareWheels())
                .chocks(c.getTrailerChange().getEquipment().getChocks())
                .mountingBrackets(c.getTrailerChange().getEquipment().getMountingBrackets())
                .hooks(c.getTrailerChange().getEquipment().getHooks())
                .rods(c.getTrailerChange().getEquipment().getRods())
                .palettes(c.getTrailerChange().getEquipment().getPalettes())
                .crossbar2Tier(c.getTrailerChange().getEquipment().getCrossbar2Tier())
                .ladders(c.getTrailerChange().getEquipment().getLadders())
                .fasteningBoards(c.getTrailerChange().getEquipment().getFasteningBoards())
                .rubberMatsSmall(c.getTrailerChange().getEquipment().getRubberMatsSmall())
                .rubberMatsLarge(c.getTrailerChange().getEquipment().getRubberMatsLarge())
                .build())
            .documents(Documents.builder()
                .vehicleRegistration(c.getTrailerChange().getDocuments().getVehicleRegistration())
                .vehicleInspection(c.getTrailerChange().getDocuments().getVehicleInspection())
                .conformity(c.getTrailerChange().getDocuments().getConformity())
                .insurancePolicy(c.getTrailerChange().getDocuments().getInsurancePolicy())
                .atpFrc(c.getTrailerChange().getDocuments().getAtpFrc())
                .euro(c.getTrailerChange().getDocuments().getEuro())
                .thermographPrinter(c.getTrailerChange().getDocuments().getThermographPrinter())
                .thermograph(c.getTrailerChange().getDocuments().getThermograph())
                .alarmPanel(c.getTrailerChange().getDocuments().getAlarmPanel())
                .keyNumber(c.getTrailerChange().getDocuments().getKeyNumber())
                .build())
            .tireDamages(TireDamages.builder()
                .firstAxis(TireAxis.builder()
                    .left(tireDamageToViewModel(
                        c.getTrailerChange().getTireDamages().getFirstLeftDamage(),
                        c.getTrailerChange().getTireDamages().getFirstLeftManufacturer()))
                    .right(tireDamageToViewModel(
                        c.getTrailerChange().getTireDamages().getFirstRightDamage(),
                        c.getTrailerChange().getTireDamages().getFirstRightManufacturer()))
                    .build())
                .secondAxis(TireAxis.builder()
                    .left(tireDamageToViewModel(
                        c.getTrailerChange().getTireDamages().getSecondLeftDamage(),
                        c.getTrailerChange().getTireDamages().getSecondLeftManufacturer()))
                    .right(tireDamageToViewModel(
                        c.getTrailerChange().getTireDamages().getSecondRightDamage(),
                        c.getTrailerChange().getTireDamages().getSecondRightManufacturer()))
                    .build())
                .thirdAxis(TireAxis.builder()
                    .left(tireDamageToViewModel(
                        c.getTrailerChange().getTireDamages().getThirdLeftDamage(),
                        c.getTrailerChange().getTireDamages().getThirdLeftManufacturer()))
                    .right(tireDamageToViewModel(
                        c.getTrailerChange().getTireDamages().getThirdRightDamage(),
                        c.getTrailerChange().getTireDamages().getThirdRightManufacturer()))
                    .build())
                .build())
            .truckDamages(TruckDamages.builder()
                .damages(truckDamagesToViewModel(c.getTrailerChange().getTruckDamages().getDamages()))
                .otherDamage(c.getTrailerChange().getTruckDamages().getOtherDamage() == null ? new String[4] : Arrays.copyOf(
                    WordUtils.wrap(c.getTrailerChange().getTruckDamages().getOtherDamage(), 110, System.lineSeparator(), true)
                        .split(System.lineSeparator()), 4))
                .build())
            .oldDriver(c.getOldDriver() == null
                ? Driver.builder()
                    .signature(Base64.getDecoder().decode(EMPTY_IMAGE))
                    .build()
                : Driver.builder()
                    .firstName(c.getOldDriver().getFirstName())
                    .lastName(c.getOldDriver().getLastName())
                    .signature(Base64.getDecoder().decode(c.getOldDriverSignature()))
                    .build())
            .newDriver(c.getNewDriver() == null
                ? Driver.builder()
                    .signature(Base64.getDecoder().decode(EMPTY_IMAGE))
                    .build()
                : Driver.builder()
                    .firstName(c.getNewDriver().getFirstName())
                    .lastName(c.getNewDriver().getLastName())
                    .signature(Base64.getDecoder().decode(c.getNewDriverSignature()))
                    .build())
            .build();
    }

    private String tireDamageToViewModel(DamageType damageType, String manufacturer) {
        return damageType.toValue() + " / " + manufacturer;
    }

    private TruckDamage[] truckDamagesToViewModel(Set<com.litwago.models.TruckDamage> damages) {
        TruckDamage[] a = new TruckDamage[60];
        int i = 0;
        for (com.litwago.models.TruckDamage d : damages)
            a[i++] = new TruckDamage(d.getArea(), d.getDamage().toValue());
        for (; i < a.length; ++i)
            a[i] = new TruckDamage("", "");
        return a;
    }
}
