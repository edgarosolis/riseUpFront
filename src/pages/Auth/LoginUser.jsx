import {Box, Container} from '@mui/material';
import Logo from '../../assets/images/RiseUpLogo.png';
import LoginCodeForm from '../../components/forms/LoginCodeForm';

const LogInUser = () => {

    return (
    <Container>
        <Box display="flex" alignItems="center" flexDirection="column" justifyContent="center" sx={{height:{xs:"calc(100vh - 88px)", sm:"calc(100vh - 96px)"}}}>
            <img src={Logo} className='logoIcon' alt='LOGO_RISEUP'/>
            <LoginCodeForm/>
        </Box>
    </Container>
    )
}

export default LogInUser