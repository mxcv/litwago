import {Box, Button, Container, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material"
import DescriptionIcon from '@mui/icons-material/Description';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "../axios.jsx";

function DriverIndex({setIsLoading, setError}) {
    const pageSize = 10
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [couplings, setCouplings] = useState()
    const [couplingCount, setCouplingCount] = useState()
    let userId = JSON.parse(localStorage.getItem('user')).id

    useEffect(() => loadCouplings(page), [page])

    function loadCouplings(page) {
        window.scrollTo(0, 0)
        setIsLoading(true)
        axios.get('/couplings/my', {
                params: {
                    page: page - 1,
                    size: pageSize
                }
            })
            .then(r => {
                setCouplingCount(r.data.total)
                setPageCount(Math.ceil(r.data.total / pageSize))
                setCouplings(r.data.list)
            })
            .catch(() => setError('Не удалось загрузить перецепы'))
            .finally(() => setIsLoading(false))
    }

    function createReport(id, trailerNumber) {
        setIsLoading(true)
        axios.get('/couplings/' + id, {responseType: 'blob'})
            .then((response) => {
                const href = URL.createObjectURL(response.data);
                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', trailerNumber + '.pdf');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(href);
            })
            .catch(() => setError('Не удалось создать документ'))
            .finally(() => setIsLoading(false))
    }

    return (
        <Container maxWidth='md'
                   sx={{py: 2, display: 'flex', flexDirection: 'column'}}>
            <Button component={Link} to="/couplings/create" variant='contained' sx={{mb: 2}}>Оформить перецеп</Button>
            {
                couplings && (
                    <Typography variant='h5'>
                        Перецепов: {couplingCount}
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
            {
                pageCount !== 0 && (
                    <Box sx={{mt: 2, display: 'flex', justifyContent: 'center'}}>
                        <Pagination variant="outlined"
                                    color="primary"
                                    count={pageCount}
                                    page={page}
                                    onChange={(e, v) => setPage(v)} />
                    </Box>
                )
            }
        </Container>
    )
}

export default DriverIndex
