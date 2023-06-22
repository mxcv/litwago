import { useState, useEffect } from "react"
import {Stack, TextField, FormGroup, FormControlLabel, Checkbox} from "@mui/material"
import Location from "./Location.jsx";

function General({general, setGeneral, tab, setTab, setIsLoading, driverType}) {
	const [trailerNumber, setTrailerNumber] = useState(general.trailerNumber)
	const [oldTruckNumber, setOldTruckNumber] = useState(general?.oldTruckNumber ?? '')
	const [newTruckNumber, setNewTruckNumber] = useState(general?.newTruckNumber ?? '')
	const [hasSeal, setHasSeal] = useState(general?.hasSeal ?? false)
	const [location, setLocation] = useState(general?.location ?? {countryCode: '', postalCode: ''})
	const [autoLocation, setAutoLocation] = useState(general?.autoLocation)

	useEffect(() => {
		setGeneral({
			trailerNumber: trailerNumber,
			oldTruckNumber: oldTruckNumber === '' ? null : oldTruckNumber,
			newTruckNumber: newTruckNumber === '' ? null : newTruckNumber,
			hasSeal: hasSeal,
			location: location,
			autoLocation: autoLocation
		})
		setTab(tab)
	}, [tab])

	return (
		<Stack spacing={2}>
			<TextField variant='standard' fullWidth disabled label='Гос. номер полуприцепа'
					   inputProps={{required: true, maxLength: 10}}
					   value={trailerNumber}
					   onChange={e => setTrailerNumber(e.target.value)} />
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
					  setIsLoading={setIsLoading} />
		</Stack>
	)
}

export default General
