import { BrowserRouter, Routes, Route } from "react-router-dom"
import CouplingCreate from "./components/CouplingCreate"
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
      <Box>
          <BrowserRouter>
          <Header user={user} setUser={handleSetUser} />
              <Routes>
                  <Route path='/' element={<Home />}></Route>
                  <Route path='/login' element={<Login setUser={handleSetUser} />}></Route>
                  <Route path='/register' element={<Register setUser={handleSetUser} />}></Route>
                  <Route path='/couplings/create' element={<CouplingCreate />}></Route>
              </Routes>
          </BrowserRouter>
      </Box>
    )
}

export default App
