import {
  Box,
  Button,
  Checkbox,
  Container, FormControlLabel, FormGroup,
  IconButton, Pagination,
  Paper,
  Table,
  TableBody,
  TableCell, TableContainer,
  TableHead,
  TableRow, Typography
} from "@mui/material"
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useEffect, useState} from "react";
import axios from "../axios.jsx";
import DescriptionIcon from "@mui/icons-material/Description.js";

function MechanicIndex({setIsLoading, setError}) {
  const pageSize = 10
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [trailerNumber, setTrailerNumber] = useState('')
  const [withoutChange, setWithoutChange] = useState(false)
  const [couplings, setCouplings] = useState()
  const [couplingCount, setCouplingCount] = useState()

  useEffect(() => page ? loadCouplings(page) : undefined, [page])

  function loadCouplings(page) {
    setIsLoading(true)
    window.scrollTo(0, 0)
    axios.get('/couplings', {
        params: {
          trailerNumber: trailerNumber,
          withoutChange: withoutChange,
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
      <Container maxWidth="md" sx={{display: 'flex', flexDirection: 'column', py: 2}}>
        <Box component="form" onSubmit={e => {e.preventDefault(); page === 1 ? loadCouplings(1) : setPage(1)}}>
          <Box sx={{display: 'flex'}}>
            <TextField
                flex={1}
                margin="normal"
                inputProps={{required: true, maxLength: 10}}
                fullWidth
                label="Номер прицепа"
                value={trailerNumber}
                onChange={e => setTrailerNumber(e.target.value)} />
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Button type="submit" sx={{ml: 2}} variant="contained">Найти</Button>
            </Box>
          </Box>
          <FormGroup>
            <FormControlLabel label="Только с изменениями"
                              control={<Checkbox checked={withoutChange}
                                                 onChange={e => setWithoutChange(e.target.checked)} />} />
          </FormGroup>
        </Box>
        {
            couplings && (
                <Typography variant='h5'>
                  Перецепов: {couplingCount}
                </Typography>
            )
        }
        {
            couplings && (
              <TableContainer component={Paper} sx={{mt: 2}}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>1 грузовик</TableCell>
                      <TableCell>2 грузовик</TableCell>
                      <TableCell>Дата</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                        couplings.map(c => (
                            <TableRow key={c.id}>
                              <TableCell>{c.oldTruckNumber}</TableCell>
                              <TableCell>{c.newTruckNumber}</TableCell>
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
            )
        }
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

export default MechanicIndex
