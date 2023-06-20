import { useState, useEffect } from "react"
import { Stack } from "@mui/material"
import ItemCountInput from "./ItemCountInput";
import ItemNumberInput from "./ItemNumberInput";
import documentNames from "../../assets/document-names.ru.json"
import documentNorms from "../../assets/document-norms.json"

function Documents({documents, setDocuments, tab, setTab}) {
  const [vehicleRegistration, setVehicleRegistration] = useState(valueToState('vehicleRegistration'))
  const [vehicleInspection, setVehicleInspection] = useState(valueToState('vehicleInspection'))
  const [conformity, setConformity] = useState(valueToState('conformity'))
  const [insurancePolicy, setInsurancePolicy] = useState(valueToState('insurancePolicy'))
  const [atpFrc, setAtpFrc] = useState(valueToState('atpFrc'))
  const [euro, setEuro] = useState(valueToState('euro'))
  const [thermographPrinter, setThermographPrinter] = useState(valueToState('thermographPrinter'))
  const [thermograph, setThermograph] = useState(valueToState('thermograph'))
  const [alarmPanel, setAlarmPanel] = useState(valueToState('alarmPanel'))
  const [keyNumber, setKeyNumber] = useState(valueToState('keyNumber'))

    function valueToState(name) {
        let v = documents?.[name]
        return v === undefined ? '' : v === 0 ? 'absent' : v === documentNorms[name] ? 'normal' : v
    }

    function stateToValue(name, state) {
        return state === 'absent' ? 0 : state === 'normal' ? documentNorms[name] : state
    }

    useEffect(() => {
        let newDocuments = {
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
        }
        for (let d in newDocuments)
            newDocuments[d] = stateToValue(d, newDocuments[d])
        setDocuments(newDocuments)
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
