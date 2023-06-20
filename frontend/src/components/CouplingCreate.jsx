import {useState} from "react";
import TrailerNumberRequest from "./TrailerNumberRequest.jsx";
import CreationTypeRequest from "./CreationTypeRequest.jsx";
import DriverTypeRequest from "./DriverTypeRequest.jsx";
import CouplingFullCreate from "./CouplingFullCreate.jsx";
import CouplingShortCreate from "./CouplingShortCreate.jsx";

function CouplingCreate() {
    const [index, setIndex] = useState(0)
    const [lastCoupling, setLastCoupling] = useState()
    const [creationType, setCreationType] = useState()
    const [driverType, setDriverType] = useState()

    if (index === 0)
        return <TrailerNumberRequest setLastCoupling={c => {setIndex(1); setLastCoupling(c)}} />
    else if (index === 1)
        return <CreationTypeRequest lastCoupling={lastCoupling} setCreationType={t => {setIndex(2); setCreationType(t)}} />
    else if (index === 2)
        return <DriverTypeRequest setDriverType={t => {setIndex(3); setDriverType(t)}} />
    else if (index === 3) {
        if (creationType === 0)
            return <CouplingFullCreate lastCoupling={lastCoupling} driverType={driverType} />
        else if (creationType === 1)
            return <CouplingShortCreate
                trailerNumber={typeof lastCoupling === 'string' ? lastCoupling : lastCoupling.trailerNumber}
                driverType={driverType} />
    }
}

export default CouplingCreate
