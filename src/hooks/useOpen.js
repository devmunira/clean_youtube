import { useState } from "react";

const useOpen = ({msg=false}) => {
    const [open, setOpen] = useState(false);

    const [state, setstate] = useState('');


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return {
        open,
        handleClickOpen,
        handleClose,
        state
    }
}

export default useOpen;