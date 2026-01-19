import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router';
import { UserProvider } from './context/user';
import { ThemeProvider, createTheme } from '@mui/material';
import { AssessmentProvider } from './context/assessment';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette:{
    primary:{
      main:"#F4C542" //YELLOW
    } ,
    secondary:{
      main:"#000000", //BLACK
    },
    backSections:{
      main:"#FFC7001A"
    },
    yellow1:{
      main:"#FFC700"
    },
    yellow2:{
      main:"#CDA310",
    },
    yellow3:{
      main:"#907000",
    },
    yellow4:{
      main:"#6E5600"
    },
    report:{
      main:"#383838"
    },
    mustard:{
      main:"#D4AF37"
    },
  },
  typography:{
    fontFamily:['Tahoma','Nunito','Helvetica Neue','Arial','Helvetica'].join(',')
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // Color del borde al enfocarse (el primary de MUI es el azul por defecto)
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#F4C542', // ¡Rojo para todos los inputs al enfocarse!
          },
          // Color del borde inactivo
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#F4C542',
          },
        },
      },
    },
  },
})

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AssessmentProvider>
          <ThemeProvider theme={theme}>
            <App/>
          </ThemeProvider>
        </AssessmentProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
