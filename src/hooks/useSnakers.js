import React from "react";
const useSnakers = () => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    return{
        open,
        handleClick,
        handleClose,
        setOpen
    }
}

export default useSnakers