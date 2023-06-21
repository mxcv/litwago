import {
  Backdrop,
  Box,
  Button, CircularProgress,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell, TableContainer,
  TableHead,
  TableRow
} from "@mui/material"
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useState} from "react";
import axios from "../axios.jsx";
import DescriptionIcon from "@mui/icons-material/Description.js";

function MechanicIndex() {
  const [trailerNumber, seTrailerNumber] = useState()
  const [couplings, setCouplings] = useState()
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    axios.get('/couplings', {
      params: {
        trailerNumber: trailerNumber
      }
    })
        .then(r => {
          setCouplings(r.data)
        })
        .finally(() => setIsLoading(false))
  }

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
      <Container maxWidth="md" sx={{display: 'flex', flexDirection: 'column', mt: 3}}>
        <Box sx={{display: 'flex'}}
             component="form"
             onSubmit={handleSubmit}>
          <TextField
              flex={1}
              margin="normal"
              inputProps={{required: true, maxLength: 10}}
              fullWidth
              label="Номер прицепа"
              value={trailerNumber}
              onChange={e => seTrailerNumber(e.target.value)} />
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Button type="submit" sx={{ml: 2}} variant="contained" disabled={isLoading}>Найти</Button>
          </Box>
        </Box>
        <TableContainer component={Paper}>
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
                  couplings && couplings.map(c => (
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
        <Backdrop open={isLoading} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
  )
}

export default MechanicIndex
