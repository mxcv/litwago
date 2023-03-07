package com.litwago.converters;

import com.litwago.viewmodels.*;
import org.apache.commons.text.WordUtils;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@Component
public class CouplingViewModelConverter implements ViewModelConverter<com.litwago.dto.Coupling, Coupling> {

    @Override
    public Coupling toViewModel(com.litwago.dto.Coupling c) {
        return Coupling.builder()
            .firstTruckNumber(c.getFirstTruckNumber())
            .secondTruckNumber(c.getSecondTruckNumber())
            .trailerNumber(c.getTrailerNumber())
            .location(c.getLocation().getCountryCode().toUpperCase() + ", " + c.getLocation().getPostalCode())
            .date(c.getDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm")))
            .fuelRefrigerator(c.getFuelRefrigerator() == null ? new FuelRefrigerator() : FuelRefrigerator.builder()
                .liters(c.getFuelRefrigerator().getLiters())
                .motoHours(c.getFuelRefrigerator().getMotoHours())
                .signalizationWorks(c.getFuelRefrigerator().isSignalizationWorks())
                .build())
            .equipment(Equipment.builder()
                .belts(c.getEquipment().getBelts())
                .cargoShelves(c.getEquipment().getCargoShelves())
                .spareWheels(c.getEquipment().getSpareWheels())
                .chocks(c.getEquipment().getChocks())
                .mountingBrackets(c.getEquipment().getMountingBrackets())
                .hooks(c.getEquipment().getHooks())
                .rods(c.getEquipment().getRods())
                .palettes(c.getEquipment().getPalettes())
                .crossbar2Tier(c.getEquipment().getCrossbar2Tier())
                .ladders(c.getEquipment().getLadders())
                .fasteningBoards(c.getEquipment().getFasteningBoards())
                .rubberMatsSmall(c.getEquipment().getRubberMatsSmall())
                .rubberMatsLarge(c.getEquipment().getRubberMatsLarge())
                .build())
            .documents(Documents.builder()
                .vehicleRegistration(c.getDocuments().getVehicleRegistration())
                .vehicleInspection(c.getDocuments().getVehicleInspection())
                .conformity(c.getDocuments().getConformity())
                .insurancePolicy(c.getDocuments().getInsurancePolicy())
                .atpFrc(c.getDocuments().getAtpFrc())
                .euro(c.getDocuments().getEuro())
                .thermographPrinter(c.getDocuments().getThermographPrinter())
                .thermograph(c.getDocuments().getThermograph())
                .alarmPanel(c.getDocuments().getAlarmPanel())
                .keyNumber(c.getDocuments().getKeyNumber())
                .build())
            .tireDamages(TireDamages.builder()
                .firstAxis(tireAxisToViewModel(c.getTireDamages().getFirstAxis()))
                .secondAxis(tireAxisToViewModel(c.getTireDamages().getSecondAxis()))
                .thirdAxis(tireAxisToViewModel(c.getTireDamages().getThirdAxis()))
                .build())
            .truckDamages(TruckDamages.builder()
                .damages(truckDamagesToViewModel(c.getTruckDamages().getDamages()))
                .otherDamage(c.getTruckDamages().getOtherDamage() == null ? new String[4] : Arrays.copyOf(
                    WordUtils.wrap(c.getTruckDamages().getOtherDamage(), 110, System.lineSeparator(), true)
                        .split(System.lineSeparator()), 4))
                .build())
            .build();
    }

    private TireAxis tireAxisToViewModel(com.litwago.dto.TireAxis tireAxis) {
        return TireAxis.builder()
            .left(tireDamageToViewModel(tireAxis.getLeft()))
            .right(tireDamageToViewModel(tireAxis.getRight()))
            .build();
    }

    private String tireDamageToViewModel(com.litwago.dto.TireDamage tireDamage) {
        return tireDamage.getDamage().toValue() + " / " + tireDamage.getManufacturer();
    }

    private TruckDamage[] truckDamagesToViewModel(List<com.litwago.dto.TruckDamage> damages) {
        TruckDamage[] a = new TruckDamage[60];
        int i = 0;
        for (com.litwago.dto.TruckDamage d : damages)
            a[i++] = new TruckDamage(d.getArea(), d.getDamage().toValue());
        for (; i < a.length; ++i)
            a[i] = new TruckDamage("", "");
        return a;
    }
}
