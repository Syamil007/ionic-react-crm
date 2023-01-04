import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
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
import dayjs, { Dayjs } from "dayjs";

export function Payment_create({ get_payment,module}: any) {
  const [info, set_info] = useState<any>(
    JSON.parse(localStorage.getItem("token") as any)
  ); //if no token, info= null

  const [key, set_key] = useState<any>(false);
  const [toggle, set_toggle] = useState<any>(false);

  //modal state
  const [open, setOpen] = React.useState(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 600,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
  };
  //modal state

  //useform
  const schema = yup.object().shape({
    payment_method_id: yup
      .number()
      .typeError("payment method is required")
      .required("payment method is required"),
    billing_id: yup
      .number()
      .typeError("billing is required")
      .required("billing is required"),
    // date: yup.string().required("date is required"),
    amount: yup
      .number()
      .typeError("amount is required")
      .required("amount is required"),
    bank: yup.string().required("bank is required"),
    account_no: yup.string().required("account no. is required"),
    ref1: yup.string().required("ref1 is required"),
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

  const [input_payment, set_input_payment] = useState<any>({
    create: {},
    create_respon: "",
    create_snackbar: false,
  });
  const [field, set_field] = useState<any>({
    payment_method_id: {
      name: "payment_method_id",
      select: true,
      selection: "",
    },
    billing_id: {
      name: "billing_id",
      select: true,
      selection: "",
    },
    // date: {
    //   name:'date',
    //   select:false,
    //   selection:'',
    // },
    amount: {
      name: "amount",
      select: false,
      selection: "",
    },
    bank: {
      name: "bank",
      select: false,
      selection: "",
    },
    account_no: {
      name: "account_no",
      select: false,
      selection: "",
    },
    ref1: {
      name: "ref1",
      select: false,
      selection: "",
    },
  });

  function onSubmit(data: any) {
    console.log(data);

    set_input_payment({ ...input_payment, create: data });
    console.log(input_payment);

    set_key("create_payment");
    set_toggle(!toggle);
  }
  //useform

  //api function
  async function get_paymentmethod() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let res = await fetch(`${baseUrl}${api.pay_method}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        return result;
      })
      .catch((error) => console.log("error", error));

    return res;
  }
  async function get_bills() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let res = await fetch(`${baseUrl}${api.billing}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => console.log("error", error));

    return res;
  }
  function create_payment() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var raw = JSON.stringify({
      payment_method_id: input_payment.create.payment_method_id,
      billing_id: input_payment.create.billing_id,
      date: dayjs().format("YYYY-MM-DD"),
      amount: input_payment.create.amount,
      bank: input_payment.create.bank,
      account_no: input_payment.create.account_no,
      ref1: input_payment.create.ref1,
    });

    var requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}${api.payments}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.id) {
          set_input_payment({
            ...input_payment,
            create_respon: result,
            create_snackbar: true,
          });
          setOpen(false);
          
          if(module==="billing"){
            console.log('no get')
          }
          else{
            get_payment();
          }
         
        }

        return console.log(result);
      })
      .catch((error) => console.log("error", error));
  }
  //api function

  useEffect(() => {
    if (key === "create_payment") {
      create_payment();
    }
  }, [toggle]);

  return (
    <div>
      <Portal>
        <Snackbar
          open={input_payment.create_snackbar}
          autoHideDuration={6000}
          onClose={() => {
            set_input_payment({
              ...input_payment,
              create_snackbar: false,
            });
          }}
        >
          <Alert
            onClose={() => {
              set_input_payment({
                ...input_payment,
                create_snackbar: false,
              });
            }}
            severity={input_payment.create_respon.message ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {input_payment?.create_respon?.message
              ? input_payment.create_respon.message
              : "Payment have been created!"}
          </Alert>
        </Snackbar>
      </Portal>
      <Button
        className="capitalize"
        onClick={() => {
          async function call() {
            let pay_method = await get_paymentmethod();
            let bills = await get_bills();
            console.log(field);

            set_field({
              ...field,
              payment_method_id: {
                ...field.payment_method_id,
                selection: pay_method.data,
              },
              billing_id: { ...field.billing_id, selection: bills.data },
            });
          }

          call();
          setOpen(true);
        }}
        variant="contained"
      >
        Create Payment
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
        <Box className="hide-scroll" sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Payment
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {Object.keys(field).map((obj: any, i: number) => {
              return field[obj].select === false ? (
                <div key={field[obj].name}>
                  <TextField
                    label={field[obj].name.replace("_", " ")}
                    size="small"
                    {...register(field[obj].name)}
                  />
                  <p style={{ height: 32, color: "red" }}>
                    {String(errors[obj]?.message ? errors[obj]?.message : "")}
                  </p>
                </div>
              ) : field[obj].select === true ? (
                <React.Fragment key={obj}>
                  <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">
                      {field[obj].name.replaceAll("_", " ")}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={watch(field[obj].name) || ""}
                      label={field[obj].name.replaceAll("_", " ")}
                      {...register(field[obj].name)}
                    >
                      <MenuItem value="">
                        <em>Select {field[obj].name.replaceAll("_", " ")}</em>
                      </MenuItem>
                      {field[obj].name === "payment_method_id" &&
                        field[obj].selection !== "" &&
                        field[obj].selection.map((sel: any, i: number) => (
                          <MenuItem key={i} value={sel.id}>
                            {sel.title}
                          </MenuItem>
                        ))}
                      {field[obj].name === "billing_id" &&
                        field[obj].selection !== "" &&
                        field[obj].selection.map((sel: any, i: number) => (
                          <MenuItem key={i} value={sel.id}>
                            {sel.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <p style={{ height: 32, color: "red" }}>
                    {String(errors[obj]?.message ? errors[obj]?.message : "")}
                  </p>
                </React.Fragment>
              ) : (
                ""
              );
            })}

            <Button
              style={{ marginTop: "32px" }}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

function Payment() {
  const [info, set_info] = useState<any>(
    JSON.parse(localStorage.getItem("token") as any)
  ); //if no token, info= null

  const [key, set_key] = useState<any>(false);
  const [toggle, set_toggle] = useState<any>(false);

  //datagrid
  const [rows, set_row] = useState<any>([
    // { id: 1, name: 'Snow', expiry: 'Jon'},
  ]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "db_id", headerName: "Db Id", width: 50 },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      editable: false,
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      width: 200,
      editable: false,
    },
    {
      field: "name",
      headerName: "Customer Name",
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <div className="w-100 d-flex justify-content-center">
            <Button
              className="border-0 text-black"
              variant="outlined"
              size="small"
              style={{ marginLeft: 0 }}
              onClick={() => {
                console.log(params.row);
                let url =
                  "/view/" +
                  JSON.stringify({ id: params.row.db_id, module: "payment" });
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
      field: "email",
      headerName: "Email",
      width: 200,
      editable: false,
    },
    {
      field: "phone_mobile",
      headerName: "Phone (Mobile)",
      width: 200,
      editable: false,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 200,
      editable: false,
    },
    {
      field: "sequence",
      headerName: "Billing Sequence",
      width: 200,
      editable: false,
    },
    {
      field: "billing_date",
      headerName: "Billing Date",
      width: 200,
      editable: false,
    },
    {
      field: "due_date",
      headerName: "Due Date",
      width: 200,
      editable: false,
    },
    {
      field: "billing_amount",
      headerName: "Billing Amount",
      width: 200,
      editable: false,
    },
    {
      field: "package_name",
      headerName: "Package Name",
      width: 200,
      editable: false,
    },
    {
      field: "package_title",
      headerName: "Package Title",
      width: 200,
      editable: false,
    },
  ];
  //datagrid

  //api function
  function get_payment() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}${api.payments}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.data) {
          set_row(
            result?.data.map((data: any, i: number) => {
              return {
                id: i + 1,
                db_id: data.id,
                date: data.date,
                payment_method: data.payment_method,
                name: data.name,
                email: data.email,
                phone_mobile: data.phone_mobile,
                amount: data.amount,
                sequence: data.sequence,
                billing_date: data.billing_date,
                due_date: data.due_date,
                billing_amount: data.billing_amount,
                package_name: data.package_name,
                package_title: data.package_title,
              };
            })
          );
        }

        return console.log(result);
      })
      .catch((error) => console.log("error", error));
  }

  async function get_paymentmethod() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let res = await fetch(`${baseUrl}${api.pay_method}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        return result;
      })
      .catch((error) => console.log("error", error));

    return res;
  }
  async function get_bills() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let res = await fetch(`${baseUrl}${api.billing}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => console.log("error", error));

    return res;
  }
  //api function

  useEffect(() => {
    if (key === false) {
      get_payment();
    }
  }, [toggle]);

  return (
    <div className="flex-1 flex flex-col bg-slate-300">
      <div className="flex-1 relative">
        <div className="flex justify-center font-semibold">
          Payment Management
        </div>
        <div className="absolute bottom-4 left-4">
        <Payment_create get_payment={get_payment} />
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
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
                db_id: false,
              },
            },
          }}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </div>
  );
}

export default Payment;
