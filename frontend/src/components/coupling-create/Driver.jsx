import { useState, useEffect, useRef } from "react"
import {Stack, TextField, Typography, Paper, Button, Box, MenuItem, Skeleton} from "@mui/material"
import SignatureCanvas from 'react-signature-canvas'

function Driver({driver, setDriver, drivers, newDriver, selectedDriver, tab}) {
	const [id, setId] = useState((selectedDriver?.id ?? (driver?.id ?? '')).toString())
	const canvas = useRef()

	useEffect(() => {
		if (driver?.signature)
			canvas.current.fromDataURL(driver.signature, { width: 280, height: 280 })
	}, [])

	useEffect(() => {
		let d = {
			id: id === '' ? undefined : parseInt(id),
			signature: canvas.current.toDataURL()
		}
		setDriver(d)
	}, [tab])

	return (
		<Box sx={{flex: 1}}>
			<Typography sx={{textTransform: 'uppercase', textAlign: 'center', mb: 2}} variant="h4">
				{newDriver ? 'Принимаю' : 'Сдаю'}
			</Typography>
			<Stack spacing={3} sx={{width: '100%'}}>
				<TextField select variant='standard' fullWidth label='Водитель'
						   inputProps={{required: true}}
						   disabled={selectedDriver !== null}
						   value={id}
						   onChange={e => setId(e.target.value)}>
					{
						selectedDriver ? (
								<MenuItem key={selectedDriver.id} value={selectedDriver.id}>
									{selectedDriver.firstName} {selectedDriver.lastName}
								</MenuItem>
							) :
							drivers ?
								drivers.map(d => (
									<MenuItem key={d.id} value={d.id}>{d.firstName} {d.lastName}</MenuItem>
								))
								: (
									<Skeleton variant="rounded" sx={{width: '100%', height: '48px'}} />
								)
					}
				</TextField>
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
			</Stack>
		</Box>
	)
}

export default Driver
