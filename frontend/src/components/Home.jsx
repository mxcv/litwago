import {Navigate} from 'react-router-dom'
import DriverIndex from "./DriverIndex.jsx";
import MechanicIndex from "./MechanicIndex.jsx";

function Home({user}) {
    
    if (user === null)
        return <Navigate to='/login' />
    else if (user.role === 'DRIVER')
        return <DriverIndex />
    else if (user.role === 'MECHANIC')
        return <MechanicIndex />
}

export default Home
