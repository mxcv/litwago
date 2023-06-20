import { BrowserRouter, Routes, Route } from "react-router-dom"
import CouplingCreate from "./components/CouplingCreate.jsx"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import {Box} from "@mui/material";
import Header from "./components/Header.jsx";
import {useState} from "react";

function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

    function handleSetUser(user) {
        if (user === null)
            localStorage.removeItem('user')
        else
            localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }

    return (
      <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
          <BrowserRouter>
			  <Header user={user} setUser={handleSetUser} />
			  <Box component='main' sx={{flex: 1, display: 'flex'}}>
				  <Routes>
					  <Route path='/' element={<Home user={user} />}></Route>
					  <Route path='/login' element={<Login setUser={handleSetUser} />}></Route>
					  <Route path='/register' element={<Register setUser={handleSetUser} />}></Route>
					  <Route path='/couplings/create' element={<CouplingCreate />}></Route>
				  </Routes>
			  </Box>
          </BrowserRouter>
      </Box>
    )
}

export default App
