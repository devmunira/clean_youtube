

import useOpen from './useOpen';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const useNavbar = () => {
    const [navbarState, setNavbarState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
    
        setNavbarState({ ...navbarState, [anchor]: open });
      };
    
      const {open , handleClickOpen , handleClose} = useOpen(false);
    
      const theme = useTheme();

    return {
        navbarState, toggleDrawer , open , handleClickOpen , handleClose , theme  
    }
}



export default useNavbar;