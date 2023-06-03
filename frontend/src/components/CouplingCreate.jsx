import { Box, Container, Button, Tabs, Tab, Backdrop, CircularProgress } from "@mui/material"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import General from "./coupling-create/General"
import Equipment from "./coupling-create/Equipment"
import Documents from "./coupling-create/Documents"
import FuelRefrigerator from "./coupling-create/FuelRefrigerator";
import TireDamages from "./coupling-create/TireDamages"
import TruckDamages from "./coupling-create/TruckDamages"
import Drivers from "./coupling-create/Drivers";
import equipmentNorms from "../assets/equipment-norms.json"
import documentNorms from "../assets/document-norms.json"

function TabPanel({value, index, children}) {
  if (value === index)
    return (children);
}

function CouplingCreate() {
  const navigate = useNavigate();
  const isMount = useRef(true);
  const submitButton = useRef()
  const [tab, setTab] = useState(0)
  const [tab1, setTab1] = useState({value: 0})
  const [tab2, setTab2] = useState({value: 0})
  const [isloading, setIsLoading] = useState(false)
  const [isInnerLoading, setIsInnerLoading] = useState(false)

  const [general, setGeneral] = useState()
  const [fuelRefrigerator, setFuelRefrigerator] = useState()
  const [equipment, setEquipment] = useState()
  const [documents, setDocuments] = useState()
  const [tireDamages, setTireDamages] = useState()
  const [truckDamages, setTruckDamages] = useState()
  const [oldDriver, setOldDriver] = useState()
  const [newDriver, setNewDriver] = useState()

  useEffect(() => {
    if (isMount.current === false) {
      if (tab2 === 7)
        finish()
      else
        submitButton.current.click()
        //setTab1({value: tab2.value})
    }
    else
      isMount.current = false;
  }, [tab2])

  function finish() {
    let c = collectCoupling()
    setIsLoading(true)
    axios.post('/couplings', c, {responseType: 'blob'})
      .then((response) => {
        downloadFile(response.data, c.trailerNumber + '.pdf')
        navigate('/');
      })
      .catch(() => alert('Возникла ошибка при создании документа!'))
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

  function toISOStringWithTimezone(date) {
    const tzOffset = -date.getTimezoneOffset()
    const diff = tzOffset >= 0 ? '+' : '-'
    const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0')
    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      diff + pad(tzOffset / 60) +
      ':' + pad(tzOffset % 60)
  }

  function collectCoupling() {
    let c = {
      ...general,
      fuelRefrigerator: fuelRefrigerator === null ? null : {...fuelRefrigerator},
      equipment: {...equipment},
      documents: {...documents},
      tireDamages: {...tireDamages},
      truckDamages: {...truckDamages},
      oldDriver: general.oldTruckNumber === null ? null : {...oldDriver},
      newDriver: general.newTruckNumber === null ? null : {...newDriver}
    }
    delete c.autoLocation;
    c.date = toISOStringWithTimezone(new Date())
    for (let i in c.equipment)
      c.equipment[i] = stateToValue(c.equipment[i], equipmentNorms[i])
    for (let i in c.documents)
      c.documents[i] = stateToValue(c.documents[i], documentNorms[i])
    if (c.oldDriver)
      c.oldDriver.signature = c.oldDriver.signature.split(',')[1]
    if (c.newDriver)
      c.newDriver.signature = c.newDriver.signature.split(',')[1]
    return c;
  }

  function stateToValue(state, norm) {
    return state === 'absent' ? 0 : state === 'normal' ? norm : state
  }
  
  function valueToState(value, norm) {
    return value === undefined ? undefined : value === 0 ? 'absent' : value === norm ? 'normal' : value
  }

  return (
    <form onSubmit={e => {e.preventDefault(); setTab1({value: tab2.value})}}>
      <input type="submit" style={{display:'none'}} ref={submitButton} />
      <Container maxWidth='md' >
        <Box sx={{minHeight: '100vh', boxSizing: "border-box", pb: 2, display: 'flex', flexDirection: 'column'}}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={(e, v) => setTab2({value: v})} variant="scrollable" scrollButtons="auto">
              <Tab label="Общее" />
              <Tab disabled={isInnerLoading === true || fuelRefrigerator === undefined} label="Топливо, реф. установка" />
              <Tab disabled={isInnerLoading === true || equipment === undefined} label="Комплектация" />
              <Tab disabled={isInnerLoading === true || documents === undefined} label="Документы" />
              <Tab disabled={isInnerLoading === true || tireDamages === undefined} label="Шины" />
              <Tab disabled={isInnerLoading === true || truckDamages === undefined} label="Прицеп" />
              <Tab disabled={isInnerLoading === true || oldDriver === undefined} label="Водители" />
            </Tabs>
          </Box>
          <Box flex={1} sx={{py: 2}}>
            <TabPanel value={tab} index={0}>
              <General general={general} setGeneral={setGeneral} tab={tab1} setTab={t => setTab(t.value)} setIsLoading={setIsInnerLoading} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <FuelRefrigerator fuelRefrigerator={fuelRefrigerator} setFuelRefrigerator={setFuelRefrigerator} tab={tab1} setTab={t => setTab(t.value)} />
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <Equipment equipment={equipment} setEquipment={setEquipment} tab={tab1} setTab={t => setTab(t.value)} />
            </TabPanel>
            <TabPanel value={tab} index={3}>
              <Documents documents={documents} setDocuments={setDocuments} tab={tab1} setTab={t => setTab(t.value)} />
            </TabPanel>
            <TabPanel value={tab} index={4}>
              <TireDamages tireDamages={tireDamages} setTireDamages={setTireDamages} tab={tab1} setTab={t => setTab(t.value)} />
            </TabPanel>
            <TabPanel value={tab} index={5}>
              <TruckDamages truckDamages={truckDamages} setTruckDamages={setTruckDamages} tab={tab1} setTab={t => setTab(t.value)}  />
            </TabPanel>
            <TabPanel value={tab} index={6}>
              <Drivers general={general} oldDriver={oldDriver} setOldDriver={setOldDriver} newDriver={newDriver} setNewDriver={setNewDriver} tab={tab1} setTab={t => t.value < 7 ? setTab(t.value) : setTab2(t.value)} />
            </TabPanel>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Button variant='contained' disabled={isInnerLoading === true || tab === 0} onClick={() => setTab2({value: tab - 1})}>Назад</Button>
            {
              tab === 6 ? (
                <Button variant='contained' disabled={isInnerLoading === true} onClick={() => setTab2({value: tab + 1})} color='success'>Завершить</Button>
              ) : (
                <Button variant='contained' disabled={isInnerLoading === true} onClick={() => setTab2({value: tab + 1})}>Вперед</Button>
              )
            }
          </Box>
        </Box>
      </Container>
      <Backdrop open={isloading} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </form>
  )
}

export default CouplingCreate
