import {
    Backdrop,
    Box,
    Button, CircularProgress,
    Container, IconButton,
    Paper,
    Stack,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@mui/material"
import DescriptionIcon from '@mui/icons-material/Description';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "../axios.jsx";

function DriverIndex() {
    const [couplings, setCouplings] = useState()
    const [isLoading, setIsLoading] = useState(false)
    let userId = JSON.parse(localStorage.getItem('user')).id

    useEffect(() => {
        axios.get('/couplings/my')
            .then(r => setCouplings(r.data))
            .catch(r => console.log(r))
    }, [])

    function downloadFile(data, filename) {
        const href = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }

    function createReport(id, trailerNumber) {
        setIsLoading(true)
        axios.get('/couplings/' + id, {responseType: 'blob'})
            .then((response) => {
                downloadFile(response.data, trailerNumber + '.pdf')
            })
            .catch(() => alert('Возникла ошибка при создании документа!'))
            .finally(() => setIsLoading(false))
    }

    return (
        <Container maxWidth='md'
                   sx={{pt: 2, display: 'flex', flexDirection: 'column'}}>
            <Button component={Link} to="/couplings/create" variant='contained' sx={{mb: 2}}>Оформить перецеп</Button>
            {
                couplings && (
                    <Typography variant='h5'>
                        Перецепов: {couplings.length}
                    </Typography>
                )
            }
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Прицеп</TableCell>
                            <TableCell>Дата</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            couplings && couplings.map(c => (
                                <TableRow key={c.id}
                                          sx={{backgroundColor: c.newDriver?.id === userId ? '#ffffb0' : 'inherit'}}>
                                    <TableCell>{c.trailerNumber}</TableCell>
                                    <TableCell>{new Date(c.date).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <IconButton color="secondary"
                                                    onClick={() => createReport(c.id, c.trailerNumber)}>
                                            <DescriptionIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Backdrop open={isLoading} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    )
}

export default DriverIndex
