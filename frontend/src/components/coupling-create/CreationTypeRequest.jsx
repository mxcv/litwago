import {Alert, Button, Container} from "@mui/material"
import * as React from "react";

function CreationTypeRequest({lastCoupling, setCreationType}) {

    if (typeof lastCoupling === 'string')
        return (
            <Container maxWidth="xs" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Alert color='warning' sx={{mt: 5}}>
                    Похоже, что данный прицеп не был найден.
                    Возможно, данный прицеп ещё не был зарегистрирован в базе даных.
                    А, возможно, вы ошиблись при вводе номера.
                    Сейчас заполните полную форму,
                    а все последующие разы будет доступна короткая форма для даного прицепа.
                </Alert>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }} onClick={() => setCreationType(0)}>
                    Заполнить полную форму
                </Button>
            </Container>
        )
    else
        return (
            <Container maxWidth="xs" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Alert color='info'>
                    Последний перецеп был выполнен <b>{new Date(lastCoupling.date).toLocaleString()}</b>.
                    Произошли ли измененния с прицепом за это время?
                    Если да, то заполните полную форму.
                    Иначе – выберете короткую (данные о состоянии прицепа будут перенесены с последнего перецепа).
                </Alert>
                <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={() => setCreationType(0)}>
                    Заполнить полную форму
                </Button>
                <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={() => setCreationType(1)}>
                    Заполнить короткую форму
                </Button>
            </Container>
        )
}

export default CreationTypeRequest
