import { useState, useEffect } from "react"
import { Stack } from "@mui/material"
import ItemCountInput from "./ItemCountInput";
import equipmentNames from "../../assets/equipment-names.ru.json"
import equipmentNorms from "../../assets/equipment-norms.json"

function Equipment({equipment, setEquipment, tab, setTab}) {
    const [belts, setBelts] = useState(valueToState('belts'))
    const [cargoShelves, setCargoShelves] = useState(valueToState('cargoShelves'))
    const [spareWheels, setSpareWheels] = useState(valueToState('spareWheels'))
    const [chocks, setChocks] = useState(valueToState('chocks'))
    const [mountingBrackets, setMountingBrackets] = useState(valueToState('mountingBrackets'))
    const [hooks, setHooks] = useState(valueToState('hooks'))
    const [rods, setRods] =useState(valueToState('rods'))
    const [palettes, setPalettes] = useState(valueToState('palettes'))
    const [crossbar2Tier, setCrossbar2Tier] = useState(valueToState('crossbar2Tier'))
    const [ladders, setLadders] = useState(valueToState('ladders'))
    const [fasteningBoards, setFasteningBoards] = useState(valueToState('fasteningBoards'))
    const [rubberMatsSmall, setRubberMatsSmall] = useState(valueToState('rubberMatsSmall'))
    const [rubberMatsLarge, setRubberMatsLarge] = useState(valueToState('rubberMatsLarge'))

    function valueToState(name) {
        let v = equipment?.[name]
        return v === undefined ? '' : v === 0 ? 'absent' : v === equipmentNorms[name] ? 'normal' : v
    }

    function stateToValue(name, state) {
        return state === 'absent' ? 0 : state === 'normal' ? equipmentNorms[name] : state
    }

    useEffect(() => {
        let newEquipment = {
            belts: belts,
            cargoShelves: cargoShelves,
            spareWheels: spareWheels,
            chocks: chocks,
            mountingBrackets: mountingBrackets,
            hooks: hooks,
            rods: rods,
            palettes: palettes,
            crossbar2Tier: crossbar2Tier,
            ladders: ladders,
            fasteningBoards: fasteningBoards,
            rubberMatsSmall: rubberMatsSmall,
            rubberMatsLarge: rubberMatsLarge
        }
        for (let e in newEquipment)
            newEquipment[e] = stateToValue(e, newEquipment[e])
        setEquipment(newEquipment)
        setTab(tab)
    }, [tab])
  
    return (
        <Stack direction='column' spacing={2}>
            <ItemCountInput value={belts} setValue={setBelts} name={equipmentNames["belts"]} norm={equipmentNorms["belts"]} />
            <ItemCountInput value={cargoShelves} setValue={setCargoShelves} name={equipmentNames["cargoShelves"]} norm={equipmentNorms["cargoShelves"]} />
            <ItemCountInput value={spareWheels} setValue={setSpareWheels} name={equipmentNames["spareWheels"]} norm={equipmentNorms["spareWheels"]} />
            <ItemCountInput value={chocks} setValue={setChocks} name={equipmentNames["chocks"]} norm={equipmentNorms["chocks"]} />
            <ItemCountInput value={mountingBrackets} setValue={setMountingBrackets} name={equipmentNames["mountingBrackets"]} norm={equipmentNorms["mountingBrackets"]} />
            <ItemCountInput value={hooks} setValue={setHooks} name={equipmentNames["hooks"]} norm={equipmentNorms["hooks"]} />
            <ItemCountInput value={rods} setValue={setRods} name={equipmentNames["rods"]} norm={equipmentNorms["rods"]} />
            <ItemCountInput value={palettes} setValue={setPalettes} name={equipmentNames["palettes"]} norm={equipmentNorms["palettes"]} />
            <ItemCountInput value={crossbar2Tier} setValue={setCrossbar2Tier} name={equipmentNames["crossbar2Tier"]} norm={equipmentNorms["crossbar2Tier"]} />
            <ItemCountInput value={ladders} setValue={setLadders} name={equipmentNames["ladders"]} norm={equipmentNorms["ladders"]} />
            <ItemCountInput value={fasteningBoards} setValue={setFasteningBoards} name={equipmentNames["fasteningBoards"]} norm={equipmentNorms["fasteningBoards"]} />
            <ItemCountInput value={rubberMatsSmall} setValue={setRubberMatsSmall} name={equipmentNames["rubberMatsSmall"]} norm={equipmentNorms["rubberMatsSmall"]} />
            <ItemCountInput value={rubberMatsLarge} setValue={setRubberMatsLarge} name={equipmentNames["rubberMatsLarge"]} norm={equipmentNorms["rubberMatsLarge"]} />
        </Stack>
    )
}

export default Equipment
