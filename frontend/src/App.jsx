import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CouplingCreate from "./components/CouplingCreate"
import Home from "./components/Home"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/couplings/create' element={<CouplingCreate />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
