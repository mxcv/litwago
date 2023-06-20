import {Alert, Stack, MenuItem, TextField, Skeleton, IconButton} from "@mui/material"
import axios from '../../axios.jsx'
import RefreshIcon from '@mui/icons-material/Refresh';
import countries from "../../assets/countries.ru.json"
import {useEffect} from "react";

function Location({location, setLocation, autoLocation, setAutoLocation, setIsLoading}) {

	useEffect(() => {
		if (autoLocation === undefined)
			loadLocation()
	}, [])

	useEffect(() => {
		setIsLoading(autoLocation === undefined)
	}, [autoLocation])

	function loadLocation() {
		setLocation({countryCode: '', postalCode: ''})
		setAutoLocation(undefined)
		if (navigator.geolocation)
			navigator.geolocation.getCurrentPosition(geocode, () => setAutoLocation(null), { timeout: 10000 })
		else
			setAutoLocation(null)
	}

	function geocode(position) {
		axios.get('/geocode', {
				params: {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				}
			})
			.then(r => {setLocation(r.data); setAutoLocation(r.data)})
			.catch(() => setAutoLocation(null))
	}

	function renderLocationAlert() {
		if (autoLocation !== undefined) {
			if (autoLocation === null)
				return <Alert severity="error" action={
					<IconButton size="large" aria-label="delete" onClick={loadLocation}>
						<RefreshIcon />
					</IconButton>
				}>Местоположение не удалось определить автоматически. Введите его вручную или побробуйте снова.</Alert>
			else if (autoLocation.countryCode === location.countryCode && autoLocation.postalCode === location.postalCode)
				return <Alert severity="success">Местоположение определено автоматически. При необходимости его можно изменить.</Alert>
			else
				return <Alert severity="info" action={
					<IconButton size="large" aria-label="delete" onClick={() => setLocation(autoLocation)}>
						<RefreshIcon />
					</IconButton>
				}>Местоположение введено вручную.</Alert>
		}
	}

	return (
		<Stack spacing={2}>
			{
				autoLocation === undefined ? (
					<Stack direction='row' spacing={2}>
						<Skeleton variant="rounded" sx={{width: '100%', height: '48px'}} />
						<Skeleton variant="rounded" sx={{width: '100%', height: '48px'}} />
					</Stack>
				) : (
					<Stack direction='row' spacing={2}>
						<TextField select variant='standard' fullWidth label='Страна'
								   inputProps={{required: true}}
								   value={location.countryCode}
								   onChange={e => setLocation(l => ({...l, countryCode: e.target.value}))}>
							{
								Object.keys(countries).map(code => (
									<MenuItem key={code} value={code}>{countries[code]}</MenuItem>
								))
							}
						</TextField>
						<TextField variant='standard' fullWidth label='Почтовый индекс'
								   inputProps={{required: true, maxLength: 10}}
								   value={location.postalCode}
								   onChange={e => setLocation(l => ({...l, postalCode: e.target.value}))} />
					</Stack>
				)
			}
			{renderLocationAlert()}
		</Stack>
	)
}

export default Location
