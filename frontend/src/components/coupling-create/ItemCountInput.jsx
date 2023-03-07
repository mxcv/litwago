import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Card, CardContent, TextField } from "@mui/material"

function ItemCountInput({value, setValue, name, norm}) {

  return (
    <Card>
      <CardContent>
        <FormControl>
          <FormLabel>{name}</FormLabel>
          <RadioGroup row value={typeof value === 'number' ? 'other' : value} onChange={e => setValue(e.target.value)}>
            <FormControlLabel control={<Radio required />} value="absent" label="Отсутствует" />
            <FormControlLabel control={<Radio required />} value="normal" label={`В норме (${norm})`} />
            <FormControlLabel control={<Radio required />} value="other" label="Другое" />
          </RadioGroup>
        </FormControl>
        {
          (typeof value === 'number' || value === 'other') && (
            <TextField key={name} variant='standard' type='number' fullWidth label='Количество'
              inputProps={{required: true, min: 0}}
              value={typeof value === 'number' ? value : ''} onChange={e => setValue(+e.target.value)} />
          )
        }
      </CardContent>
    </Card>
  )
}

export default ItemCountInput
