import {Navigate} from 'react-router-dom'
import DriverIndex from "./DriverIndex.jsx";
import MechanicIndex from "./MechanicIndex.jsx";

function Home({user, setIsLoading}) {
    
    if (user === null)
        return <Navigate to='/login' />
    else if (user.role === 'DRIVER')
        return <DriverIndex setIsLoading={setIsLoading} />
    else if (user.role === 'MECHANIC')
        return <MechanicIndex setIsLoading={setIsLoading} />
}

export default Home
