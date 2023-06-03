import { useState, useEffect, useRef } from "react"
import { Stack, TextField, Typography, Paper, Button, Box, FormGroup, FormControlLabel, Checkbox, Backdrop } from "@mui/material"
import SignatureCanvas from 'react-signature-canvas'

function Driver({driver, setDriver, newDriver, tab}) {
  const [firstName, setFirstName] = useState(driver?.firstName ?? '')
  const [lastName, setLastName] = useState(driver?.lastName ?? '')
  const [hasSeal, setHasSeal] = useState(driver?.hasSeal ?? false)
  const canvas = useRef()

  useEffect(() => {
    if (driver?.signature)
      canvas.current.fromDataURL(driver.signature, { width: 280, height: 280 })
  }, [])

  useEffect(() => {
    let d = {
      firstName: firstName,
      lastName: lastName,
      signature: canvas.current.toDataURL()
    }
    if (newDriver)
      d.hasSeal = hasSeal
    setDriver(d)
  }, [tab])

  return (
    <Box sx={{flex: 1}}>
      <Typography sx={{textTransform: 'uppercase', textAlign: 'center', mb: 2}} variant="h4">
        {newDriver ? 'Принимаю' : 'Сдаю'}
      </Typography>
      <Stack spacing={3} sx={{width: '100%'}}>
        <Stack spacing={2} sx={{flex: 1}}>
          <TextField variant='standard' fullWidth label='Имя'
            inputProps={{required: true, maxLength: 30}}
            value={firstName}
            onChange={e => setFirstName(e.target.value)} />
          <TextField variant='standard' fullWidth label='Фамилия'
            inputProps={{required: true, maxLength: 30}}
            value={lastName}
            onChange={e => setLastName(e.target.value)} />
        </Stack>
        <Stack sx={{alignItems: 'center', flex: 1}}>
          <Box>
            <Paper variant="outlined" sx={{width: 'fit-content', mb: 1}}>
              <SignatureCanvas penColor='black' ref={canvas} canvasProps={{width: 280, height: 280}} />
            </Paper>
            <Button variant='contained' color="secondary" sx={{width: '100%'}}
              onClick={() => canvas.current.clear()}>
              Очистить
            </Button>
          </Box>
        </Stack>
        {
          newDriver ? (
            <FormGroup>
              <FormControlLabel label="Принял с пломбой" control={<Checkbox
                checked={hasSeal}
                onChange={e => setHasSeal(e.target.checked)} />} />
            </FormGroup>
          ) : null
        }
      </Stack>
    </Box>
  )
}

export default Driver
