import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ModalForm = ({open , handleClose , getValues}) => {
  const [state, setState] = useState('PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl')

  const passValue = (e) => {
    if(!state){
      toast.error('Invalid State')
    }else{
      getValues(state)
      setState('')
      handleClose()
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Playlist Add</DialogTitle>
        <DialogContent>
          <DialogContentText>
            For Add any youtube playlist, you have to paste playlistId or playlink.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Playlist Id Or Playlist Link"
            fullWidth
            variant="standard"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={passValue}>Add New Playlist</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalForm;
