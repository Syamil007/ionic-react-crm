import React, { useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Button, Portal, Snackbar } from "@mui/material";
import baseUrl, { api } from "../../Urls";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Delete_payment({
  data,
  row,
  input_payment,
  set_input_payment,
  get_payment,
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
  function delete_payment() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions: any = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}${api.payments}/${row[0][1]}`, requestOptions)
      .then((response) => {
        if (response.status === 204) {
          return response.status;
        } else {
          return response.json();
        }
      })
      .then((result) => {
        if (result === 204) {
          set_input_payment({
            ...input_payment,
            delete_respon: result,
            delete_snackbar: true,
          });
          get_payment();
          return result;
        } else {
          set_input_payment({
            ...input_payment,
            delete_respon: result,
            delete_snackbar: true,
          });
          console.log(result);

          return result;
        }
      })
      .catch((error) => console.log("error", error));
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
      <Button
        className="bg-red-500 capitalize mt-6"
        variant="contained"
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Delete Package ${data?.data?.package_title} for customer ${data?.data?.name}?`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              delete_payment();
              handleClose();
            }}
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Delete_payment;
