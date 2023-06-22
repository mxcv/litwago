import * as React from 'react';
import {Button, Checkbox, Container, FormControlLabel, FormGroup, Stack, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Location from "./Location.jsx";
import Drivers from "./Drivers.jsx";
import axios from "../../axios.jsx";

function CouplingShortCreate({trailerNumber, driverType, setIsLoading, setError}) {
    const navigate = useNavigate();
    const [oldTruckNumber, setOldTruckNumber] = useState('')
    const [newTruckNumber, setNewTruckNumber] = useState('')
    const [hasSeal, setHasSeal] = useState(false)
    const [location, setLocation] = useState({countryCode: '', postalCode: ''})
    const [autoLocation, setAutoLocation] = useState()
    const [oldDriver, setOldDriver] = useState()
    const [newDriver, setNewDriver] = useState()
    const [hasToSaveDriver, setHasToSaveDriver] = useState(null)
    const [isInnerLoading, setIsInnerLoading] = useState(false)

    function finish() {
        setIsLoading(true)
        axios.post('/couplings', collectCoupling())
            .then(() => navigate('/'))
            .catch(() => setError('Не удалось создать акт перецепа'))
            .finally(() => setIsLoading(false))
    }

    function collectCoupling() {
        let c = {
            trailerNumber: trailerNumber,
            oldTruckNumber: oldTruckNumber === '' ? null : oldTruckNumber,
            newTruckNumber: newTruckNumber === '' ? null : newTruckNumber,
            hasSeal: hasSeal,
            location: location,
            oldDriver: driverType === 2 ? null : {...oldDriver},
            newDriver: driverType === 1 ? null : {...newDriver}
        }
        c.date = toISOStringWithTimezone(new Date())
        if (c.oldDriver)
            c.oldDriver.signature = c.oldDriver.signature.split(',')[1]
        if (c.newDriver)
            c.newDriver.signature = c.newDriver.signature.split(',')[1]
        return c;
    }

    function toISOStringWithTimezone(date) {
        let tzo = -date.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = num => (num < 10 ? '0' : '') + num
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds()) +
            dif + pad(Math.floor(Math.abs(tzo) / 60)) +
            ':' + pad(Math.abs(tzo) % 60)
    }

    return (
        <Container sx={{py: 2, display: 'flex', flexDirection: 'column'}}
                   component="form"
                   maxWidth='md'
                   onSubmit={e => {e.preventDefault(); setHasToSaveDriver({})}}>
            <Stack gap={2} flex={1}>
                <TextField variant='standard' fullWidth disabled label='Гос. номер полуприцепа'
                           inputProps={{required: true, maxLength: 10}}
                           value={trailerNumber} />
                {
                    driverType !== 2 &&
                    <TextField variant='standard' fullWidth label='Гос. номер сдающего тягача'
                               inputProps={{required: true, maxLength: 10}}
                               value={oldTruckNumber}
                               onChange={e => setOldTruckNumber(e.target.value)}/>
                }
                {
                    driverType !== 1 &&
                    <TextField variant='standard' fullWidth label='Гос. номер принимающего тягача'
                               inputProps={{required: true, maxLength: 10}}
                               value={newTruckNumber}
                               onChange={e => setNewTruckNumber(e.target.value)} />
                }
                <FormGroup>
                    <FormControlLabel label="На прицепе есть пломба" control={<Checkbox
                        checked={hasSeal}
                        onChange={e => setHasSeal(e.target.checked)} />} />
                </FormGroup>
                <Location location={location}
                          setLocation={setLocation}
                          autoLocation={autoLocation}
                          setAutoLocation={setAutoLocation}
                          setIsLoading={setIsInnerLoading} />
                <Drivers oldDriver={oldDriver}
                         setOldDriver={setOldDriver}
                         newDriver={newDriver}
                         setNewDriver={setNewDriver}
                         driverType={driverType}
                         tab={hasToSaveDriver}
                         setTab={finish} />
            </Stack>
            <Button type='submit' sx={{mt: 4}} variant='contained' color='success' disabled={isInnerLoading}>Завершить</Button>
        </Container>
    )
}

export default CouplingShortCreate
