import TuneIcon from '@mui/icons-material/Tune';
import PersonIcon from '@mui/icons-material/Person';

export const navItems = [
    {
      title: "Home",
      icon: <TuneIcon sx={{color:"white"}}/>,
      locationRef : "home",
      href: "/",
    },
    {
      title: "Users",
      locationRef : "users",
      icon: <PersonIcon sx={{color:"white"}}/>,
      href: "/users",
    },
];