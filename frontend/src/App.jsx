import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CouplingCreate from "./components/CouplingCreate"
import Home from "./components/Home"

function App() {

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        mobile: 400,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/couplings/create' element={<CouplingCreate />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
