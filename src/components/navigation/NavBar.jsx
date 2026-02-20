import { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../../context/user';
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import Logo from '../../assets/images/RiseUpLogo.png';

const NavBar = () => {

    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [, setAnchorEl] = useState(null);

    const handleClose= ()=>{
        setAnchorEl(null);
    }

    const handleLogOut = ()=>{
        setCurrentUser(null);
        localStorage.removeItem('userRiseUp');
        handleClose();
    }

    return (
    <>
        <AppBar sx={{backgroundColor:"white"}} position='static'>
            <Container maxWidth="false">
                <Toolbar disableGutters sx={{justifyContent:"space-between",padding:"10px 0px"}}>
                {
                    /* LOGO - visible on all screen sizes */
                    <Box sx={{ display: 'flex' }}>
                        <Link to="/">
                            <img
                                src={Logo}
                                className='logoImage'
                                alt='LOGO_RISEUP'
                                style={{ width: 'clamp(30px, 8vw, 50px)' }}
                            />
                        </Link>
                    </Box>
                }
                {
                    currentUser &&
                    <Button onClick={handleLogOut}>
                        LOG OUT
                    </Button>
                }
                </Toolbar>
            </Container>
        </AppBar>
        <Outlet/>
    </>
    )
}

export default NavBar