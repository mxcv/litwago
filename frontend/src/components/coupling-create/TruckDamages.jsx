import { useState, useEffect } from "react"
import { MenuItem, TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Card, Button, Box, IconButton } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Stack } from "@mui/system";
import truckSpots from '../../assets/truck-areas.json'
import damageTypes from '../../assets/damages.ru.json'
import truck1 from '../../assets/truck1.png'
import truck2 from '../../assets/truck2.png'

function Image({src}) {
  return (
    <Paper variant="outlined" sx={{width: {xs: '100%', sm: '50%'}, height: '100%', p: 1, boxSizing: 'border-box'}}>
      <img src={src} style={{width: '100%', height: '100%', maxHeight: '200px', objectFit: 'contain'}} />
    </Paper>
  )
}

function TruckDamages({truckDamages, setTruckDamages, tab, setTab}) {
  const [damages, setDamages] = useState(truckDamages?.damages ?? [])
  const [otherDamage, setOtherDamage] = useState(truckDamages?.otherDamage ?? '')
  const [area, setArea] = useState('')
  const [damage, setDamage] = useState('')

  useEffect(() => {
    setTruckDamages(({
      damages: damages,
      otherDamage: otherDamage
    }))
    setTab(tab)
  }, [tab])

  function onDamageAdd() {
    setDamages(d => [...d, {area: area, damage: damage}])
    setArea('')
    setDamage('')
  }

  function onDamageDelete(i) {
    setDamages(damages.filter((d, index) => index !== i))
  }

  return (
    <Stack spacing={2}>
      <Stack direction={{xs: 'column', sm: 'row'}} spacing={1}>
        <Image src={truck1} />
        <Image src={truck2} />
      </Stack>
      <Stack direction='row' spacing={1} sx={{alignItems: 'flex-end'}}>
        <TextField select variant='standard' fullWidth label='Место'
          value={area}
          onChange={e => setArea(e.target.value)}>
            {
              truckSpots.map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))
            }
        </TextField>
        <TextField select variant='standard' fullWidth label='Повреждение'
          value={damage}
          onChange={e => setDamage(e.target.value)}>
            {
              Object.keys(damageTypes).filter(d => d !== 'N').map(d => (
                <MenuItem key={d} value={d}>{damageTypes[d]}</MenuItem>
              ))
            }
        </TextField>
        <Button variant="outlined" color="primary" size="small"
          onClick={onDamageAdd}
          disabled={area === '' || damage === '' || damage.length === 60}>
          <AddIcon fontSize="large" />
        </Button>
      </Stack>
      {
        damages.length ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Место</TableCell>
                  <TableCell>Повреждение</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  damages.map((d, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{d.area}</TableCell>
                      <TableCell>{damageTypes[d.damage]}</TableCell>
                      <TableCell align='right'>
                        <IconButton color="error"
                          onClick={() => onDamageDelete(i)}>
                          <DeleteOutlineIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        ) : null
      }
      <TextField multiline variant="standard" label="Другие повреждения"
        helperText={otherDamage.length + ' / 440'}
        onKeyPress={e => e.key === "Enter" && e.preventDefault() }
        inputProps={{maxLength: 440}}
        value={otherDamage}
        onChange={e => setOtherDamage(e.target.value)} />
    </Stack>
  )
}

export default TruckDamages
