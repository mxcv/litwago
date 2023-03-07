import { useState, useRef, useEffect } from "react"
import { Box, Button, Pagination, useMediaQuery } from "@mui/material"

function CouplingPagination() {
  const [page, setPage] = useState(1)
  const [completed, setCompleted] = useState(0)
  const pagination = useRef()
  const xs = useMediaQuery(theme => theme.breakpoints.down('mobile'));
  const sm = useMediaQuery(theme => theme.breakpoints.down('sm'));
  
  function updatePagination(completed) {
    const buttons = pagination.current.getElementsByClassName('MuiPaginationItem-page')
    for (let i = 0; i < buttons.length; ++i) {
      buttons[i].disabled = completed < +buttons[i].innerText - 1
      buttons[i].classList[completed < +buttons[i].innerText - 1 ? 'add' : 'remove']('Mui-disabled')
    }
  }
  
  function onNextClick() {
    if (page === completed + 1) {
      setCompleted(completed + 1)
      updatePagination(completed + 1)
    }
    setPage(page + 1)
  }

  useEffect(() => updatePagination(completed), [xs, sm])

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <Button size={xs ? 'small' : 'medium'} variant='contained' disabled={page === 1} onClick={() => setPage(page - 1)}>Назад</Button>
      <Pagination size={xs ? 'small' : 'medium'}  count={8} siblingCount={sm ? 0 : 8} ref={pagination} page={page} onChange={(e, v) => setPage(v)} variant='outlined' color='secondary' hidePrevButton hideNextButton />
      <Button size={xs ? 'small' : 'medium'} variant='contained' disabled={page === 6} onClick={onNextClick}>Вперед</Button>
    </Box>
  )
}

export default CouplingPagination
