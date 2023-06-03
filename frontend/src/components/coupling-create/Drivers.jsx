import { useEffect } from "react"
import { Stack } from "@mui/material"
import Driver from "./Driver";

function Drivers({general, oldDriver, setOldDriver, newDriver, setNewDriver, tab, setTab}) {

  useEffect(() => {
    setTab(tab)
  }, [tab])

  return (
    <Stack spacing={4} direction={{xs: 'column', sm: 'row'}}>
      {
        general.oldTruckNumber ? (
          <Driver driver={oldDriver} setDriver={setOldDriver} tab={tab} />
        ) : null
      }
      {
        general.newTruckNumber ? (
          <Driver driver={newDriver} setDriver={setNewDriver} tab={tab} newDriver />
        ) : null
      }
    </Stack>
  )
}

export default Drivers
