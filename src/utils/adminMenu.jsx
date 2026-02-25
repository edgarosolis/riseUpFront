import TuneIcon from '@mui/icons-material/Tune';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import QuizIcon from '@mui/icons-material/Quiz';
import GroupsIcon from '@mui/icons-material/Groups';

export const navItems = [
    {
      title: "Home",
      icon: <TuneIcon sx={{color:"white"}}/>,
      locationRef : "home",
      href: "/",
    },
    {
      title: "Admins",
      icon: <AdminPanelSettingsIcon sx={{color:"white"}}/>,
      locationRef : "admins",
      href: "/admins",
    },
    {
      title: "Questions",
      icon: <QuizIcon sx={{color:"white"}}/>,
      locationRef : "questions",
      href: "/questions",
    },
    {
      title: "Section Texts",
      icon: <TextSnippetIcon sx={{color:"white"}}/>,
      locationRef : "sectionTexts",
      href: "/section-texts",
    },
    {
      title: "Wonder of You",
      icon: <AutoAwesomeIcon sx={{color:"white"}}/>,
      locationRef : "wonderOfYou",
      href: "/wonder-of-you",
    },
    {
      title: "Groups",
      icon: <GroupsIcon sx={{color:"white"}}/>,
      locationRef : "groups",
      href: "/groups",
    },
];