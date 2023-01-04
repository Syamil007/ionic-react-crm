import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import baseUrl, { api } from "../Urls";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Portal,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { style } from "@mui/system";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

function Add_payment_method({
  setOpen,
  open,
  style,
  handleSubmit,
  onSubmit,
  register,
  reset,
  watch,
  errors,
  input_payment_method,
  set_input_payment_method,
}: any) {
  return (
    <div>
      <Portal>
        <Snackbar
          open={input_payment_method.create_snackbar}
          autoHideDuration={6000}
          onClose={() => {
            set_input_payment_method({
              ...input_payment_method,
              create_snackbar: false,
            });
          }}
        >
          <Alert
            onClose={() => {
              set_input_payment_method({
                ...input_payment_method,
                create_snackbar: false,
              });
            }}
            severity={
              input_payment_method.create_respon.message ? "error" : "success"
            }
            sx={{ width: "100%" }}
          >
            {input_payment_method?.create_respon?.message
              ? input_payment_method.create_respon.message
              : "Payment Method have been created!"}
          </Alert>
        </Snackbar>
      </Portal>

      <Button
        className="normal-case"
        onClick={() => {
          setOpen(true);
        }}
        variant="contained"
      >
        Add Record
      </Button>

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        keepMounted={false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="bg-black hide-scroll">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Record
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Name"
              id="filled-size-small1"
              value={watch("name") || ""}
              size="small"
              {...register("name")}
            />
            <p style={{ height: 32, color: "red" }}>
              {String(errors.name?.message ? errors.name?.message : "")}
            </p>
            <TextField
              label="Title"
              id="filled-size-small2"
              value={watch("title") || ""}
              size="small"
              {...register("title")}
            />
            <p style={{ height: 32, color: "red" }}>
              {String(errors.title?.message ? errors.title?.message : "")}
            </p>
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Status"
                value={watch("status") || ""}
                {...register("status")}
              >
                <MenuItem value={""}>Select Status</MenuItem>
                <MenuItem value={"SA"}>Status Active</MenuItem>
                <MenuItem value={"SX"}>Status Inactive</MenuItem>
              </Select>
            </FormControl>
            <p style={{ height: 32, color: "red" }}>
              {String(errors.status?.message ? errors.status?.message : "")}
            </p>
            <Button
              style={{ textTransform: "capitalize" }}
              type="submit"
              variant="contained"
            >
              Create Payment Method
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

function Payment_method() {
  const [info, set_info] = useState<any>(
    JSON.parse(localStorage.getItem("token") as any)
  ); //if no token, info= null

  const [key, set_key] = useState<any>(false);
  const [toggle, set_toggle] = useState<any>(false);

  //useform
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    title: yup.string().required("Title is required"),
    status: yup.string().required("Status is required"),
  });

  const {
    register,
    reset,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [input_payment_method, set_input_payment_method] = useState<any>({
    create: {},
    create_respon: "",
    create_snackbar: false,
  });

  function onSubmit(data: any) {
    console.log(data);
    console.log("abc");

    set_input_payment_method({ ...input_payment_method, create: data });
    console.log(input_payment_method);

    set_key("payment_method_create");
    set_toggle(!toggle);
  }
  //useform

  // modal state
  const [open, setOpen] = React.useState(false);

  // style for modal
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
  };
  // modal state

  //  datagrid
  const [rows, set_row] = useState<any>([
    // { id: 1, name: 'Snow', expiry: 'Jon'},
  ]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "db_id", headerName: "ID", width: 50 },
    {
      field: "name",
      headerName: "Name",
      width: 100,
      editable: false,
    },
    {
      field: "title",
      headerName: "Title",
      width: 100,
      editable: false,
      renderCell: (params) => {
        return (
          <div className="w-100 d-flex justify-content-center">
            <Button
              className="border-0 text-black capitalize"
              variant="outlined"
              size="small"
              style={{ marginLeft: 0 }}
              onClick={() => {
                console.log(params.row);
                let url =
                  "/view/" +
                  JSON.stringify({
                    id: params.row.db_id,
                    module: "payment_method",
                  });
                console.log(url);
                // localStorage.setItem("id",`${params.row.id}`);
                window.open(url);
              }}
            >
              {params.row.name}
            </Button>
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      width: 100,
      editable: false,
    },
  ];
  //  datagrid

  // api function
  function payment_method_get() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}${api.pay_method}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        set_row(
          result.data.map((data: any, i: number) => {
            return {
              id: i,
              db_id: data.id,
              name: data.name,
              title: data.title,
              status: data.status,
            };
          })
        );

        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }
  function payment_method_create() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var raw = JSON.stringify({
      name: input_payment_method.create.name,
      title: input_payment_method.create.title,
      status: input_payment_method.create.status,
    });

    var requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}${api.pay_method}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.name) {
          setOpen(false);
          payment_method_get();
          set_input_payment_method({
            ...input_payment_method,
            create_respon: result,
            create_snackbar: true,
          });

          return console.log(result);
        }
        if (result.name === undefined) {
          set_input_payment_method({
            ...input_payment_method,
            create_respon: result,
            create_snackbar: true,
          });

          return console.log(result);
        }

        return console.log(result);
      })
      .catch((error) => console.log("error", error));
  }
  // api function

  useEffect(() => {
    if (key === false) {
      payment_method_get();
    }
  }, []);

  useEffect(() => {
    if (key === "payment_method_create") {
      payment_method_create();
    }
  }, [toggle]);

  return (
    <div className="flex-1 flex flex-col bg-slate-300">
      <div className="flex-1 relative">
        <div className="flex justify-center font-semibold">
          Payment Method Management
        </div>
        <div className="absolute bottom-4 left-4">
          <Add_payment_method
            setOpen={setOpen}
            open={open}
            style={style}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            reset={reset}
            watch={watch}
            errors={errors}
            input_payment_method={input_payment_method}
            set_input_payment_method={set_input_payment_method}
          />
        </div>
      </div>
      <div className="h-96">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>
    </div>
  );
}

export default Payment_method;
