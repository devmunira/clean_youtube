import React, { useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from '../pages/home';
import NotFound from '../pages/NotFound';
import Player from '../pages/Player';
import Navbar from '../components/partials/Navbar';
import { StoreProvider } from 'easy-peasy';
import store from '../store/store';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const Theme = createTheme({
    palette: {
      primary: {
        main: '#2192FF',
        light : '#118DF0',
        dark : '#118DF0',
        contrastText : '#fff',
      },
      light : {
        main : '#e3f2fd'
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: (themeParam) => `
          h1 {
            color: ${themeParam.palette.success.main};
          }
        `,
      },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "*::-webkit-scrollbar": {
            width: "5px"
          },
          "*::-webkit-scrollbar-track": {
            background: "red"
          },
          "*::-webkit-scrollbar-thumb": {
            background: "blue",
            borderRadius: "2px"
          }
        }
      }
    }
  });
  return (
    <ThemeProvider theme={Theme}>
     <CssBaseline>
        <BrowserRouter>
            <StoreProvider store={store}>
                <Navbar></Navbar>
                <Routes>
                  <Route path='/' element={<Home></Home>}></Route>
                  <Route path='/playlist/:playerId' element={<Player></Player>}></Route>
                  <Route path='*' element={<NotFound></NotFound>}></Route>
                </Routes>
                <ToastContainer 
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
            </StoreProvider>
        </BrowserRouter>
     </CssBaseline>
    </ThemeProvider>
  )
}

export default App