import {useEffect, useState} from "react"
import { Stack } from "@mui/material"
import Driver from "./Driver";
import axios from "../../axios.jsx";

function Drivers({oldDriver, setOldDriver, newDriver, setNewDriver, driverType, tab, setTab}) {
	const [drivers, setDrivers] = useState()

	useEffect(() => {
		if (tab)
			setTab(tab)
	}, [tab])

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
						tab={tab} />
			}
			{
				driverType !== 1 &&
				<Driver driver={newDriver}
						setDriver={setNewDriver}
						drivers={drivers}
						selectedDriver={driverType === 2 ? JSON.parse(localStorage.getItem('user')) : null}
						newDriver
						tab={tab} />
			}
		</Stack>
	)
}

export default Drivers
