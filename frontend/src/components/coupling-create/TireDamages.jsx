import { useState, useEffect } from "react"
import { MenuItem, TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material"
import { Stack } from "@mui/system";
import damages from '../../assets/damages.ru.json'

function Tire({tire, setTire}) {
  return (
    <Stack spacing={2}>
      <TextField select variant='standard' fullWidth label='Повреждение'
        inputProps={{required: true}}
        value={tire.damage}
        onChange={e => setTire({...tire, damage: e.target.value})}>
          {
            Object.keys(damages).map(code => (
              <MenuItem key={code} value={code}>{damages[code]}</MenuItem>
            ))
          }
      </TextField>
      <TextField variant='standard' fullWidth label='Производитель'
        inputProps={{required: true, maxLength: 15}}
        value={tire.manufacturer}
        onChange={e => setTire({...tire, manufacturer: e.target.value})} />
    </Stack>
  )
}

function Axis({number, axis, setAxis}) {
  return (
    <TableRow>
      <TableCell>{number}</TableCell>
      <TableCell>
        <Tire tire={axis.left} setTire={t => setAxis({...axis, left: t})} />
      </TableCell>
      <TableCell>
        <Tire tire={axis.right} setTire={t => setAxis({...axis, right: t})} />
      </TableCell>
    </TableRow>
  )
}

function TireDamages({tireDamages, setTireDamages, tab, setTab}) {
  const [firstAxis, setFirstAxis] = useState(tireDamages?.firstAxis ?? createEmptyTireDamage())
  const [secondAxis, setSecondAxis] = useState(tireDamages?.secondAxis ?? createEmptyTireDamage())
  const [thirdAxis, setThirdAxis] = useState(tireDamages?.thirdAxis ?? createEmptyTireDamage())

  useEffect(() => {
    setTireDamages(({
      firstAxis: firstAxis,
      secondAxis: secondAxis,
      thirdAxis: thirdAxis
    }))
    setTab(tab)
  }, [tab])

  function createEmptyTireDamage() {
    return {left: {damage: '', manufacturer: ''}, right: {damage: '', manufacturer: ''}}
  }

  return (
    <Stack spacing={2}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ось</TableCell>
              <TableCell align="center">Лево</TableCell>
              <TableCell align="center">Право</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Axis number={1} axis={firstAxis} setAxis={setFirstAxis} />
            <Axis number={2} axis={secondAxis} setAxis={setSecondAxis} />
            <Axis number={3} axis={thirdAxis} setAxis={setThirdAxis} />
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default TireDamages
