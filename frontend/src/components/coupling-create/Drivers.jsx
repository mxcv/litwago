import {useEffect, useState} from "react"
import { Stack } from "@mui/material"
import Driver from "./Driver";
import axios from "../../axios.jsx";

function Drivers({oldDriver, setOldDriver, newDriver, setNewDriver, driverType, tab, setTab}) {
	const [drivers, setDrivers] = useState()
	const [hasToSaveDriver, setHasToSaveDriver] = useState(null)
	let isOldDriverSaved = false, isNewDriverSaved = false

	useEffect(() => setHasToSaveDriver({}), [tab])
	useEffect(() => {isOldDriverSaved = true; saveDrivers()}, [oldDriver])
	useEffect(() => {isNewDriverSaved = true; saveDrivers()}, [newDriver])

	function saveDrivers() {
		if (tab !== null && isOldDriverSaved + isNewDriverSaved === (driverType === 0 ? 2 : 1)) {
			isOldDriverSaved = isNewDriverSaved = false
			setTab(tab)
		}
	}

	useEffect(() => {
		axios.get('/drivers')
			.then(response => {
				setDrivers(response.data)
			})
	}, [])

	return (
		<Stack spacing={4} direction={{xs: 'column', sm: 'row'}}>
			{
				driverType !== 2 &&
				<Driver driver={oldDriver}
						setDriver={setOldDriver}
						drivers={drivers}
						selectedDriver={driverType === 2 ? null : JSON.parse(localStorage.getItem('user'))}
						tab={hasToSaveDriver} />
			}
			{
				driverType !== 1 &&
				<Driver driver={newDriver}
						setDriver={setNewDriver}
						drivers={drivers}
						selectedDriver={driverType === 2 ? JSON.parse(localStorage.getItem('user')) : null}
						newDriver
						tab={hasToSaveDriver} />
			}
		</Stack>
	)
}

export default Drivers
