import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Card, CardContent, TextField } from "@mui/material"

function ItemNumberInput({value, setValue, name}) {

  return (
    <Card>
      <CardContent>
        <FormControl>
          <FormLabel>{name}</FormLabel>
          <RadioGroup row value={typeof value === 'number' ? 'other' : value} onChange={e => setValue(e.target.value)}>
            <FormControlLabel control={<Radio required />} value="absent" label="Отсутствует" />
            <FormControlLabel control={<Radio required />} value="other" label="Есть" />
          </RadioGroup>
        </FormControl>
        {
          (typeof value === 'number' || value === 'other') && (
            <TextField key={name} variant='standard' type='number' fullWidth label='Номер'
              inputProps={{required: true, min: 0}}
              value={typeof value === 'number' ? value : ''} onChange={e => setValue(+e.target.value)} />
          )
        }
      </CardContent>
    </Card>
  )
}

export default ItemNumberInput
