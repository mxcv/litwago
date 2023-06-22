import { BrowserRouter, Routes, Route } from "react-router-dom"
import CouplingCreate from "./components/coupling-create/CouplingCreate.jsx"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import {Alert, Backdrop, Box, CircularProgress, Snackbar} from "@mui/material";
import Header from "./components/Header.jsx";
import {useState} from "react";
import * as React from "react";

function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

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
              <Route path='/' element={<Home user={user} setIsLoading={setIsLoading} setError={setError} />}></Route>
              <Route path='/login' element={<Login setUser={handleSetUser} setIsLoading={setIsLoading} setError={setError} />}></Route>
              <Route path='/register' element={<Register setUser={handleSetUser} setIsLoading={setIsLoading} setError={setError} />}></Route>
              <Route path='/couplings/create' element={<CouplingCreate setIsLoading={setIsLoading} setError={setError} />}></Route>
            </Routes>
          </Box>
          <Backdrop open={isLoading} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Snackbar
              open={error !== null}
              onClose={() => setError(null)}
              autoHideDuration={5000}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        </BrowserRouter>
      </Box>
    )
}

export default App
