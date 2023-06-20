import { Box, Container, Button, Tabs, Tab, Backdrop, CircularProgress } from "@mui/material"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import axios from '../axios.jsx'
import General from "./coupling-create/General"
import Equipment from "./coupling-create/Equipment"
import Documents from "./coupling-create/Documents"
import FuelRefrigerator from "./coupling-create/FuelRefrigerator";
import TireDamages from "./coupling-create/TireDamages"
import TruckDamages from "./coupling-create/TruckDamages"
import Drivers from "./coupling-create/Drivers";

function TabPanel({value, index, children}) {
    if (value === index)
        return (children);
}

function CouplingFullCreate({lastCoupling, driverType}) {
    const tabCount = 7
    const navigate = useNavigate();
    const isMount = useRef(true);
    const submitButton = useRef()
    const [tab, setTab] = useState(0)
    const [tab1, setTab1] = useState({value: 0})
    const [tab2, setTab2] = useState({value: 0})
    const [isLoading, setIsLoading] = useState(false)
    const [isInnerLoading, setIsInnerLoading] = useState(false)

    const [general, setGeneral] = useState({trailerNumber: hasLastCoupling() ? lastCoupling.trailerNumber : lastCoupling})
    const [fuelRefrigerator, setFuelRefrigerator] = useState(getTrailerChange('fuelRefrigerator'))
    const [equipment, setEquipment] = useState(getTrailerChange('equipment'))
    const [documents, setDocuments] = useState(getTrailerChange('documents'))
    const [tireDamages, setTireDamages] = useState(getTrailerChange('tireDamages'))
    const [truckDamages, setTruckDamages] = useState(getTrailerChange('truckDamages'))
    const [oldDriver, setOldDriver] = useState()
    const [newDriver, setNewDriver] = useState()

    function hasLastCoupling() {
        return typeof lastCoupling === 'object'
    }

    function getTrailerChange(name) {
        return hasLastCoupling() ? lastCoupling.trailerChange[name] : undefined
    }

    useEffect(() => {
        if (isMount.current === false) {
            if (tab2 === tabCount)
                finish()
            else
                submitButton.current.click()
        }
        else
            isMount.current = false;
    }, [tab2])

    useEffect(() => window.scrollTo(0, 0), [tab])

    function finish() {
        let c = collectCoupling()
        setIsLoading(true)
        axios.post('/couplings', c)
            .then(() => {
                navigate('/');
            })
            .catch(() => alert('Возникла ошибка при создании документа!'))
            .finally(() => setIsLoading(false))
    }

    function toISOStringWithTimezone(date) {
        let tzo = -date.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = num => (num < 10 ? '0' : '') + num
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds()) +
            dif + pad(Math.floor(Math.abs(tzo) / 60)) +
            ':' + pad(Math.abs(tzo) % 60)
    }

    function collectCoupling() {
        let c = {
            ...general,
            trailerChange: {
                fuelRefrigerator: fuelRefrigerator === null ? null : {...fuelRefrigerator},
                equipment: {...equipment},
                documents: {...documents},
                tireDamages: {...tireDamages},
                truckDamages: {...truckDamages},
            },
            oldDriver: driverType === 2 ? null : {...oldDriver},
            newDriver: driverType === 1 ? null : {...newDriver}
        }
        delete c.autoLocation
        c.date = toISOStringWithTimezone(new Date())
        if (c.oldDriver)
            c.oldDriver.signature = c.oldDriver.signature.split(',')[1]
        if (c.newDriver)
            c.newDriver.signature = c.newDriver.signature.split(',')[1]
        return c;
    }

    return (
        <Container component="form"
                   maxWidth='md'
                   sx={{pb: 2, display: 'flex', flexDirection: 'column'}}
                   onSubmit={e => {e.preventDefault(); setTab1({value: tab2.value})}} >
            <input type="submit" style={{display:'none'}} ref={submitButton} />
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
                    <General general={general} setGeneral={setGeneral} tab={tab1} setTab={t => setTab(t.value)} setIsLoading={setIsInnerLoading} driverType={driverType} />
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
                    <Drivers oldDriver={oldDriver} setOldDriver={setOldDriver} newDriver={newDriver} setNewDriver={setNewDriver} driverType={driverType} tab={tab1} setTab={t => t.value < tabCount ? setTab(t.value) : setTab2(t.value)} />
                </TabPanel>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button variant='contained' disabled={isInnerLoading === true || tab === 0} onClick={() => setTab2({value: tab - 1})}>Назад</Button>
                {
                    tab === tabCount - 1 ? (
                        <Button variant='contained' disabled={isInnerLoading === true} onClick={() => setTab2({value: tab + 1})} color='success'>Завершить</Button>
                    ) : (
                        <Button variant='contained' disabled={isInnerLoading === true} onClick={() => setTab2({value: tab + 1})}>Вперед</Button>
                    )
                }
            </Box>
            <Backdrop open={isLoading} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    )
}

export default CouplingFullCreate
