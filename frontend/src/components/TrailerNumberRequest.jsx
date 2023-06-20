import {Box, Button, Container} from "@mui/material"
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useState} from "react";
import axios from "../axios.jsx";

function TrailerNumberRequest({setLastCoupling}) {
    const [number, setNumber] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        axios.get('/couplings/last', {
                params: {
                    trailerNumber: number
                }
            })
            .then(r => {
                setLastCoupling(r.data)
            })
            .catch(() => {
                setLastCoupling(number)
            })
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
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }} disabled={isLoading}>Найти</Button>
            </Box>
        </Container>
    )
}

export default TrailerNumberRequest
