import {AppBar, Box, IconButton, Menu, MenuItem, Stack, Toolbar} from "@mui/material";
import logo from '../assets/logo.svg';
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function Header({user, setUser}) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    function logout() {
        setAnchorEl(null)
        setUser(null)
        navigate('/login')
    }

    return (
        <Box>
            {
                user !== null && (
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                component={Link}
                                to={'/'}
                                size="large"
                                edge="start"
                                color="inherit"
                                sx={{ mr: 2 }}>
                                <img src={logo} alt='logo' width={32} height={32} />
                            </IconButton>
                            <MenuItem component={Link} to='/' variant="h1">
                                Litwago
                            </MenuItem>
                            <Box sx={{flex: 1}} />
                            <Stack direction={'row'}>
                                <MenuItem onClick={e => setAnchorEl(e.currentTarget)}>{user.email}</MenuItem>
                                <Menu
                                    anchorEl={anchorEl}
                                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                    keepMounted
                                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                                    open={Boolean(anchorEl)}
                                    onClose={() => setAnchorEl(null)}>
                                    <MenuItem onClick={logout}>Выйти</MenuItem>
                                </Menu>
                            </Stack>
                        </Toolbar>
                    </AppBar>
                )
            }
        </Box>
    )
}

export default Header
