import {Alert, Button, Container} from "@mui/material"
import * as React from "react";

function DriverTypeRequest({setDriverType}) {

    return (
        <Container maxWidth="xs" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Button fullWidth variant="contained" onClick={() => setDriverType(0)}>
                Я сдаю прицеп другому водителю
            </Button>
            <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={() => setDriverType(1)}>
                Я ставлю прицеп на стоянку
            </Button>
            <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={() => setDriverType(2)}>
                Я забираю прицеп со стоянки
            </Button>
        </Container>
    )
}

export default DriverTypeRequest
