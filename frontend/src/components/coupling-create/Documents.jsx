import { useState, useEffect } from "react"
import { Stack } from "@mui/material"
import ItemCountInput from "./ItemCountInput";
import ItemNumberInput from "./ItemNumberInput";
import documentNames from "../../assets/document-names.ru.json"
import documentNorms from "../../assets/document-norms.json"

function Documents({documents, setDocuments, tab, setTab}) {
  const [vehicleRegistration, setVehicleRegistration] = useState(documents?.vehicleRegistration ?? '')
  const [vehicleInspection, setVehicleInspection] = useState(documents?.vehicleInspection ?? '')
  const [conformity, setConformity] = useState(documents?.conformity ?? '')
  const [insurancePolicy, setInsurancePolicy] = useState(documents?.insurancePolicy ?? '')
  const [atpFrc, setAtpFrc] = useState(documents?.atpFrc ?? '')
  const [euro, setEuro] = useState(documents?.euro ?? '')
  const [thermographPrinter, setThermographPrinter] = useState(documents?.thermographPrinter ?? '')
  const [thermograph, setThermograph] = useState(documents?.thermograph ?? '')
  const [alarmPanel, setAlarmPanel] = useState(documents?.alarmPanel ?? '')
  const [keyNumber, setKeyNumber] = useState(documents?.keyNumber ?? '')

  useEffect(() => {
    setDocuments(({
      vehicleRegistration: vehicleRegistration,
      vehicleInspection: vehicleInspection,
      conformity: conformity,
      insurancePolicy: insurancePolicy,
      atpFrc: atpFrc,
      euro: euro,
      thermographPrinter: thermographPrinter,
      thermograph: thermograph,
      alarmPanel: alarmPanel,
      keyNumber: keyNumber
    }))
    setTab(tab)
  }, [tab])  
  
  return (
    <Stack direction='column' spacing={2}>
      <ItemCountInput value={vehicleRegistration} setValue={setVehicleRegistration} name={documentNames["vehicleRegistration"]} norm={documentNorms["vehicleRegistration"]} />
      <ItemCountInput value={vehicleInspection} setValue={setVehicleInspection} name={documentNames["vehicleInspection"]} norm={documentNorms["vehicleInspection"]} />
      <ItemCountInput value={conformity} setValue={setConformity} name={documentNames["conformity"]} norm={documentNorms["conformity"]} />
      <ItemCountInput value={insurancePolicy} setValue={setInsurancePolicy} name={documentNames["insurancePolicy"]} norm={documentNorms["insurancePolicy"]} />
      <ItemCountInput value={atpFrc} setValue={setAtpFrc} name={documentNames["atpFrc"]} norm={documentNorms["atpFrc"]} />
      <ItemCountInput value={euro} setValue={setEuro} name={documentNames["euro"]} norm={documentNorms["euro"]} />
      <ItemCountInput value={thermographPrinter} setValue={setThermographPrinter} name={documentNames["thermographPrinter"]} norm={documentNorms["thermographPrinter"]} />
      <ItemCountInput value={thermograph} setValue={setThermograph} name={documentNames["thermograph"]} norm={documentNorms["thermograph"]} />
      <ItemCountInput value={alarmPanel} setValue={setAlarmPanel} name={documentNames["alarmPanel"]} norm={documentNorms["alarmPanel"]} />
      <ItemNumberInput value={keyNumber} setValue={setKeyNumber} name={documentNames["keyNumber"]} />
    </Stack>
  )
}

export default Documents
