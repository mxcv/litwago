import { useState, useEffect } from "react"
import { Stack } from "@mui/material"
import ItemCountInput from "./ItemCountInput";
import equipmentNames from "../../assets/equipment-names.ru.json"
import equipmentNorms from "../../assets/equipment-norms.json"

function Equipment({equipment, setEquipment, tab, setTab}) {
  const [belts, setBelts] = useState(equipment?.belts ?? '')
  const [cargoShelves, setCargoShelves] = useState(equipment?.cargoShelves ?? '')
  const [spareWheels, setSpareWheels] = useState(equipment?.spareWheels ?? '')
  const [chocks, setChocks] = useState(equipment?.chocks ?? '')
  const [mountingBrackets, setMountingBrackets] = useState(equipment?.mountingBrackets ?? '')
  const [hooks, setHooks] = useState(equipment?.hooks ?? '')
  const [rods, setRods] = useState(equipment?.rods ?? '')
  const [palettes, setPalettes] = useState(equipment?.palettes ?? '')
  const [crossbar2Tier, setCrossbar2Tier] = useState(equipment?.crossbar2Tier ?? '')
  const [ladders, setLadders] = useState(equipment?.ladders ?? '')
  const [fasteningBoards, setFasteningBoards] = useState(equipment?.fasteningBoards ?? '')
  const [rubberMatsSmall, setRubberMatsSmall] = useState(equipment?.rubberMatsSmall ?? '')
  const [rubberMatsLarge, setRubberMatsLarge] = useState(equipment?.rubberMatsLarge ?? '')

  useEffect(() => {
    setEquipment(({
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
    }))
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
