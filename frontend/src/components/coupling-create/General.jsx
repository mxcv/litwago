import { useState, useEffect } from "react"
import { Alert, Stack, MenuItem, TextField, Skeleton, IconButton } from "@mui/material"
import axios from '../../axios.jsx'
import RefreshIcon from '@mui/icons-material/Refresh';
import countries from "../../assets/countries.ru.json"

function General({general, setGeneral, tab, setTab, setIsLoading}) {
  const [oldTruckNumber, setOldTruckNumber] = useState(general?.oldTruckNumber ?? '')
  const [newTruckNumber, setNewTruckNumber] = useState(general?.newTruckNumber ?? '')
  const [trailerNumber, setTrailerNumber] = useState(general?.trailerNumber ?? '')
  const [location, setLocation] = useState(general?.location ?? {countryCode: '', postalCode: ''})
  const [autoLocation, setAutoLocation] = useState(general?.autoLocation)

  useEffect(() => {
    if (autoLocation === undefined)
      loadLocation()
  }, [])

  useEffect(() => {
    setGeneral(({
      oldTruckNumber: oldTruckNumber === '' ? null : oldTruckNumber,
      newTruckNumber: newTruckNumber === '' ? null : newTruckNumber,
      trailerNumber: trailerNumber,
      location: location,
      autoLocation: autoLocation
    }))
    setTab(tab)
  }, [tab])

  useEffect(() => {
    setIsLoading(autoLocation === undefined || oldTruckNumber === '' && newTruckNumber === '')
  }, [oldTruckNumber, newTruckNumber, autoLocation])

  function loadLocation() {
    setLocation({countryCode: '', postalCode: ''})
    setAutoLocation(undefined)
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(geocode, () => setAutoLocation(null), { timeout: 10000 })
    else
      setAutoLocation(null)
  }

  function geocode(position) {
    axios.get('/geocode', {
        params: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      })
      .then(r => {setLocation(r.data); setAutoLocation(r.data)})
      .catch(() => setAutoLocation(null))
  }

  function renderLocationAlert() {
    if (autoLocation !== undefined) {
      if (autoLocation === null)
        return <Alert severity="error" action={
          <IconButton size="large" aria-label="delete" onClick={loadLocation}>
            <RefreshIcon />
          </IconButton>
        }>Местоположение не удалось определить автоматически. Введите его вручную или побробуйте снова.</Alert>
      else if (autoLocation.countryCode === location.countryCode && autoLocation.postalCode === location.postalCode)
        return <Alert severity="success">Местоположение определено автоматически. При необходимости его можно изменить.</Alert>
      else
        return <Alert severity="info" action={
          <IconButton size="large" aria-label="delete" onClick={() => setLocation(autoLocation)}>
            <RefreshIcon />
          </IconButton>
        }>Местоположение введено вручную.</Alert>
    }
  }

  return (
    <Stack spacing={2}>
      <TextField variant='standard' fullWidth label='Гос. номер сдающего тягача'
        inputProps={{maxLength: 10}}
        value={oldTruckNumber}
        onChange={e => setOldTruckNumber(e.target.value)} />
      <TextField variant='standard' fullWidth label='Гос. номер принимающего тягача'
        inputProps={{maxLength: 10}}
        value={newTruckNumber}
        onChange={e => setNewTruckNumber(e.target.value)} />
      <TextField variant='standard' fullWidth label='Гос. номер полуприцепа'
        inputProps={{required: true, maxLength: 10}}
        value={trailerNumber}
        onChange={e => setTrailerNumber(e.target.value)} />
        {
          autoLocation === undefined ? (
            <Stack direction='row' spacing={2}>
              <Skeleton variant="rounded" sx={{width: '100%', height: '48px'}} />
              <Skeleton variant="rounded" sx={{width: '100%', height: '48px'}} />
            </Stack>
          ) : (
            <Stack direction='row' spacing={2}>
              <TextField select variant='standard' fullWidth label='Страна'
                inputProps={{required: true}}
                value={location.countryCode}
                onChange={e => setLocation(l => ({...l, countryCode: e.target.value}))}>
                  {
                    Object.keys(countries).map(code => (
                      <MenuItem key={code} value={code}>{countries[code]}</MenuItem>
                    ))
                  }
              </TextField>
              <TextField variant='standard' fullWidth label='Почтовый индекс'
                inputProps={{required: true, maxLength: 10}}
                value={location.postalCode}
                onChange={e => setLocation(l => ({...l, postalCode: e.target.value}))} />
            </Stack>
          )
        }
      {renderLocationAlert()}
    </Stack>
  )
}

export default General
