import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


export default function ModalDeleteConfirm({open, setOpen, deleteFunction}: {open: boolean, setOpen: Function, deleteFunction: Function}) {

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: '360px', sm: '400px'},
    bgcolor: '#2E3B55',
    boxShadow: 14,
    p: 4,
    color: '#fff',
    transitionDuration: 100,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" sx={{ marginBottom: 5 }}  component="div">
                Are you sure you want to delete this? 
            </Typography> 
            <Button title={'Do not delete'} type="submit" sx={{ marginTop: 2 }} onClick={() => {setOpen(false)}} size='large' variant="contained">No</Button>
            <Button title={'Delete'} sx={{ marginTop: 2, marginLeft: 5 }} onClick={() => {setOpen(false); deleteFunction()}} size='large' variant="text">Delete</Button>
        </Box>
      </Modal>
    </div>

  );
}
