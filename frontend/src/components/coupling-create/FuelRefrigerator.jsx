import { useState, useEffect } from "react"
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material"
import { Stack } from "@mui/system";

function FuelRefrigerator({fuelRefrigerator, setFuelRefrigerator, tab, setTab}) {
  const [isPresent, setIsPresent] = useState(fuelRefrigerator === undefined ? '' : fuelRefrigerator === null ? 'false' : 'true')
  const [liters, setLiters] = useState(fuelRefrigerator?.liters ?? '')
  const [motoHours, setMotoHours] = useState(fuelRefrigerator?.motoHours ?? '')
  const [signalizationWorks, setSignalizationWorks] = useState(fuelRefrigerator?.signalizationWorks ?? '')

  useEffect(() => {
    setFuelRefrigerator(isPresent === 'false' ? null : ({
      liters : liters,
      motoHours : motoHours,
      signalizationWorks : signalizationWorks === 'true' ? true : false,
    }))
    setTab(tab)
  }, [tab])

  return (
    <Stack spacing={2}>
      <FormControl>
        <FormLabel>Есть ли на полуприцепе рефрижератор?</FormLabel>
        <RadioGroup value={isPresent} onChange={e => setIsPresent(e.target.value)}>
          <FormControlLabel control={<Radio required />} value="true" label="Есть" />
          <FormControlLabel control={<Radio required />} value="false" label="Нет" />
        </RadioGroup>
      </FormControl>
      {
        (isPresent === 'true') && (
          <Stack spacing={2}>
            <TextField variant='standard' type='number' fullWidth label='Литры'
              inputProps={{required: true, min: 0}}
              value={liters} onChange={e => setLiters(+e.target.value)} />
            <TextField variant='standard' type='number' fullWidth label='Моточасы'
              inputProps={{required: true, min: 0}}
              value={motoHours} onChange={e => setMotoHours(+e.target.value)} />
            <FormControl>
              <FormLabel>Сигнализация работает?</FormLabel>
              <RadioGroup value={signalizationWorks} onChange={e => setSignalizationWorks(e.target.value)}>
                <FormControlLabel control={<Radio required />} value="true" label="Да" />
                <FormControlLabel control={<Radio required />} value="false" label="Нет" />
              </RadioGroup>
            </FormControl>
          </Stack>
        )
      }
    </Stack>
  )
}

export default FuelRefrigerator
