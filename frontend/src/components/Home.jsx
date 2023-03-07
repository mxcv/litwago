import { Button, Box, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

function Home() {

  return (
    <Stack sx={{height: '100vh', justifyContent: 'center'}}>
      <Box sx={{textAlign: 'center'}}>
        <Button component={Link} to="/couplings/create" variant='contained'>Оформить перецеп</Button>
      </Box>
    </Stack>
  )
}

export default Home
