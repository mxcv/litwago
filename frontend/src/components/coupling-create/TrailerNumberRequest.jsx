import * as React from "react";
import {useState} from "react";
import {Box, Button, Container, TextField} from "@mui/material"
import axios from "../../axios.jsx";

function TrailerNumberRequest({setLastCoupling, setIsLoading, setError}) {
    const [number, setNumber] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        axios.get('/couplings/last', {
                params: {
                    trailerNumber: number
                }
            })
            .then(r => setLastCoupling(r.data))
            .catch(error => {
                if (error.response?.status === 404)
                    setLastCoupling(number)
                else
                    setError('Возникла ошибка при поиске прицепа')
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <Container maxWidth="xs" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}
                 component="form"
                 onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    inputProps={{required: true, maxLength: 10}}
                    fullWidth
                    label="Номер прицепа"
                    value={number}
                    onChange={e => setNumber(e.target.value)} />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>Найти</Button>
            </Box>
        </Container>
    )
}

export default TrailerNumberRequest
