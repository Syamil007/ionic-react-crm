import { Portal, Snackbar, Alert, Button, Dialog, DialogTitle, DialogActions, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useState } from 'react'
import baseUrl, { api } from '../../Urls';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Approve_payment({
  data,
  row,
  input_payment,
  set_input_payment
}: any) {

  const [info, set_info] = useState<any>(
    JSON.parse(localStorage.getItem("token") as any)
  ); //if no token, info= null
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //api function
  function patch_payment() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var raw = JSON.stringify({
      "id": 1,
      "approve": true
    });

    var requestOptions:any = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${baseUrl}${api.payments}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  //api function

  return (
    <div>
    <Portal>
      <Snackbar
        open={input_payment.delete_snackbar}
        autoHideDuration={6000}
        onClose={() => {
          set_input_payment({
            ...input_payment,
            delete_snackbar: false,
          });
        }}
      >
        <Alert
          onClose={() => {
            set_input_payment({
              ...input_payment,
              delete_snackbar: false,
            });
          }}
          severity={input_payment.delete_respon.message ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {input_payment?.delete_respon?.message
            ? input_payment?.delete_respon?.message
            : "Successfully Delete!"}
        </Alert>
      </Snackbar>
    </Portal>
    <Button className='bg-blue-500 capitalize mt-4' onClick={handleClickOpen} variant="contained">Approve</Button>
    <Dialog
  open={open}
  TransitionComponent={Transition}
  keepMounted
  onClose={handleClose}
  aria-describedby="alert-dialog-slide-description"
>
  <DialogTitle>{`Approve Package ${data?.data?.package_title} for customer ${data?.data?.name}?`}</DialogTitle>
  <DialogActions>
    <Button onClick={handleClose} >Cancel</Button>
    <Button onClick={()=>{
      // delete_payment(); call api for approve
      handleClose();
    }} variant='contained'>Approve</Button>
  </DialogActions>
</Dialog></div>
  )
}

export default Approve_payment
