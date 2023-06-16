import { BrowserRouter, Routes, Route } from "react-router-dom"
import CouplingCreate from "./components/CouplingCreate"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

function App() {

  return (
      <Box>
          <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                  <Toolbar>
                      <IconButton
                          size="large"
                          edge="start"
                          color="inherit"
                          aria-label="menu"
                          sx={{ mr: 2 }}>
                          <MenuIcon />
                      </IconButton>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                          News
                      </Typography>
                      <Button color="inherit">Login</Button>
                  </Toolbar>
              </AppBar>
          </Box>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<Home />}></Route>
                  <Route path='/login' element={<Login />}></Route>
                  <Route path='/register' element={<Register />}></Route>
                  <Route path='/couplings/create' element={<CouplingCreate />}></Route>
              </Routes>
          </BrowserRouter>
      </Box>
  )
}

export default App
