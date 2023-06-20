import {Navigate} from 'react-router-dom'
import DriverIndex from "./DriverIndex.jsx";

function Home({user}) {
    
    if (user === null)
        return <Navigate to='/login' />
    else if (user.role === 'DRIVER')
        return <DriverIndex />
}

export default Home
