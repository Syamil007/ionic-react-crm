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
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

var countries = [
  "Malaysia",
  "Afghanistan",
  "Åland Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  `Bolivia (Plurinational State of)`,
  "Bonaire",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  `Côte d'Ivoire`,
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (Democratic People's Republic of)",
  "Korea",
  "Kuwait",
  "Kyrgyzstan",
  `Lao People's Democratic Republic`,
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",

  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia (Federated States of)",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "North Macedonia",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Réunion",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Barthélemy",
  "Saint Helena",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom of Great Britain and Northern Ireland",
  "United States of America",
  "United States Minor Outlying Islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela (Bolivarian Republic of)",
  "Viet Nam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

var countryCode = [
  "MY",
  "AF",
  "AX",
  "AL",
  "DZ",
  "AS",
  "AD",
  "AO",
  "AI",
  "AQ",
  "AG",
  "AR",
  "AM",
  "AW",
  "AU",
  "AT",
  "AZ",
  "BS",
  "BH",
  "BD",
  "BB",
  "BY",
  "BE",
  "BZ",
  "BJ",
  "BM",
  "BT",
  "BO",
  "BQ",
  "BA",
  "BW",
  "BV",
  "BR",
  "IO",
  "BN",
  "BG",
  "BF",
  "BI",
  "CV",
  "KH",
  "CM",
  "CA",
  "KY",
  "CF",
  "TD",
  "CL",
  "CN",
  "CX",
  "CC",
  "CO",
  "KM",
  "CG",
  "CD",
  "CK",
  "CR",
  "CI",
  "HR",
  "CU",
  "CW",
  "CY",
  "CZ",
  "DK",
  "DJ",
  "DM",
  "DO",
  "EC",
  "EG",
  "SV",
  "GQ",
  "ER",
  "EE",
  "SZ",
  "ET",
  "FK",
  "FO",
  "FJ",
  "FI",
  "FR",
  "GF",
  "PF",
  "TF",
  "GA",
  "GM",
  "GE",
  "DE",
  "GH",
  "GI",
  "GR",
  "GL",
  "GD",
  "GP",
  "GU",
  "GT",
  "GG",
  "GN",
  "GW",
  "GY",
  "HT",
  "HM",
  "VA",
  "HN",
  "HK",
  "HU",
  "IS",
  "IN",
  "ID",
  "IR",
  "IQ",
  "IE",
  "IM",
  "IL",
  "IT",
  "JM",
  "JP",
  "JE",
  "JO",
  "KZ",
  "KE",
  "KI",
  "KP",
  "KR",
  "KW",
  "KG",
  "LA",
  "LV",
  "LB",
  "LS",
  "LR",
  "LY",
  "LI",
  "LT",
  "LU",
  "MO",
  "MG",
  "MW",

  "MV",
  "ML",
  "MT",
  "MH",
  "MQ",
  "MR",
  "MU",
  "YT",
  "MX",
  "FM",
  "MD",
  "MC",
  "MN",
  "ME",
  "MS",
  "MA",
  "MZ",
  "MM",
  "NA",
  "NR",
  "NP",
  "NL",
  "NC",
  "NZ",
  "NI",
  "NE",
  "NG",
  "NU",
  "NF",
  "MK",
  "MP",
  "NO",
  "OM",
  "PK",
  "PW",
  "PS",
  "PA",
  "PG",
  "PY",
  "PE",
  "PH",
  "PN",
  "PL",
  "PT",
  "PR",
  "QA",
  "RE",
  "RO",
  "RU",
  "RW",
  "BL",
  "SH",
  "KN",
  "LC",
  "MF",
  "PM",
  "VC",
  "WS",
  "SM",
  "ST",
  "SA",
  "SN",
  "RS",
  "SC",
  "SL",
  "SG",
  "SX",
  "SK",
  "SI",
  "SB",
  "SO",
  "ZA",
  "GS",
  "SS",
  "ES",
  "LK",
  "SD",
  "SR",
  "SJ",
  "SE",
  "CH",
  "SY",
  "TW",
  "TJ",
  "TZ",
  "TH",
  "TL",
  "TG",
  "TK",
  "TO",
  "TT",
  "TN",
  "TR",
  "TM",
  "TC",
  "TV",
  "UG",
  "UA",
  "AE",
  "GB",
  "US",
  "UM",
  "UY",
  "UZ",
  "VU",
  "VE",
  "VN",
  "VG",
  "VI",
  "WF",
  "EH",
  "YE",
  "ZM",
  "ZW",
];

var stateMy = [
  "Selangor",
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Penang",
  "Perak",
  "Perlis",

  "Terengganu",
  "Sabah",
  "Sarawak",
  "Kuala Lumpur",
  "Labuan",
  "Putrajaya",
];

var stateMyCode = [
  "10",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",

  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
];

function Create_customer({
  customer_api,
}: any) {

  const [info, set_info] = useState<any>(
    JSON.parse(localStorage.getItem("token") as any)
  ); //if no token, info= null

  const [key, set_key] = useState<any>(false);
  const [toggle, set_toggle] = useState<any>(false);

  //useform
  const [field, set_field] = useState<any>({
    email: {
      name: "email",
      select: false,
      selection: "",
    },
    name: {
      name: "name",
      select: false,
      selection: "",
    },
    nationality: {
      name: "nationality",
      select: true,
      selection: "",
    },
    national_id: {
      name: "national_id",
      select: false,
      selection: "",
    },
    passport_no: {
      name: "passport_no",
      select: false,
      selection: "",
    },
    passport_issuer: {
      name: "passport_issuer",
      select: false,
      selection: "",
    },
    birth_date: {
      name: "birth_date",
      select: "date",
      selection: "",
    },
    gender: {
      name: "gender",
      select: true,
      selection: "",
    },
    phone_mobile: {
      name: "phone_mobile",
      select: false,
      selection: "",
    },
    phone_home: {
      name: "phone_home",
      select: false,
      selection: "",
    },
    phone_office: {
      name: "phone_office",
      select: false,
      selection: "",
    },
    address: {
      name: "address",
      select: false,
      selection: "",
    },
    postcode: {
      name: "postcode",
      select: false,
      selection: "",
    },
    city: {
      name: "city",
      select: false,
      selection: "",
    },
    state: {
      name: "state",
      select: true,
      selection: "",
    },
    country: {
      name: "country",
      select: true,
      selection: "",
    },
    status: {
      name: "status",
      select: true,
      selection: "",
    },
    risk: {
      name: "risk",
      select: false,
      selection: "",
    },
    pe: {
      name: "pe",
      select: false,
      selection: "",
    },
    referred_by: {
      name: "referred_by",
      select: false,
      selection: "",
    },
  });

  const schema = yup.object().shape({
    email: yup.string().required("email is required"),
      name: yup.string().required("name is required"),
    nationality: yup.string().required("nationality is required"),
      national_id: yup.string().required("national id is required"),
      passport_no: yup.string().required("passport no is required"),
      passport_issuer: yup.string().required("passport issuer is required"),
      birth_date: yup.string().required("birth date is required"),
      gender: yup.string().required("gender is required"),
      phone_mobile: yup.string().required("phone mobile is required"),
      phone_home: yup.string().required("phone home is required"),
      phone_office: yup.string().required("phone office is required"),
      address: yup.string().required("address is required"),
      postcode: yup.string().required("postcode is required"),
      city: yup.string().required("city is required"),
      state: yup.string().required("state is required"),
      country: yup.string().required("country is required"),
      status: yup.string().required("status is required"),
      risk: yup.number().typeError("risk is required").required("risk is required"),
      pe: yup.number().typeError("pe is required").required("pe is required"),
      referred_by: yup.number().typeError("referred by is required").required("referred by is required"),
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

  const [input_customer, set_input_customer] = useState<any>({
    create: {},
    create_respon: "",
    create_snackbar: false,
  });

  function onSubmit(data: any) {
    console.log({...data,birth_date:dayjs(data.birth_date).format('YYYY-MM-DD')});

    set_input_customer({ ...input_customer, create: {...data,birth_date:dayjs(data.birth_date).format('YYYY-MM-DD')} });
    console.log(input_customer);

    set_key("create_customer");
    set_toggle(!toggle);
  }
  //useform

  // modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    
    setOpen(false);
  
  };

  // style for modal
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 500,
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

  // mui datepicker
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(new Date("1980-1-1"))
  );

  const handleChange = (newValue: Dayjs | null, i: number) => {
    console.log(dayjs(newValue).format("YYYY-MM-DD"));

    setValue(newValue);
  };
  // mui datepicker

  //api function
  async function create_customer() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var raw = JSON.stringify(
      input_customer.create
    );

    var requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let res = await fetch(`${baseUrl}${api.customer}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result?.id){
          set_input_customer({...input_customer,create_respon:result,create_snackbar:true});
          customer_api();
          setOpen(false);

          return console.log(result);
        }
        else{
          set_input_customer({...input_customer,create_respon:result,create_snackbar:true});
          console.log("api error");
          return console.log(result);
        }
      })
      .catch((error) => console.log("error", error));
    return res;
  }
  //api function

  useEffect(()=>{
    if(key==='create_customer'){
      create_customer();
    }

  },[toggle]);

  return (
    <div>
       <Portal>
        <Snackbar
          open={input_customer.create_snackbar}
          autoHideDuration={6000}
          onClose={() => {
            set_input_customer({
              ...input_customer,
              create_snackbar: false,
            });
          }}
        >
          <Alert
            onClose={() => {
              set_input_customer({
                ...input_customer,
                create_snackbar: false,
              });
            }}
            severity={input_customer.create_respon.message ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {input_customer?.create_respon?.message
              ? input_customer.create_respon.message
              : "Customer have been created!"}
          </Alert>
        </Snackbar>
      </Portal>
      <Button className="normal-case" onClick={handleOpen}>
        Create Customer
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="bg-black">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Customer
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(field).map((obj, i: number) => {
              return field[obj].select === false ? (
                <React.Fragment key={obj}>
                <TextField
                  type={"text"}
                  label={obj.replaceAll("_"," ")}
                  variant="outlined"
                  size="small"
                  {...register(obj)}
                />
                <p style={{ height: 32, color: "red" }}>
                {String(errors[obj]?.message ? errors[obj]?.message : "")}
              </p>
              </React.Fragment>
              ) : field[obj].select === "date" ? (
                <React.Fragment key={obj}>
                  <Controller
                    control={control}
                    name={obj}
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                      return (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <Stack spacing={3}>
                            <DesktopDatePicker
                              label={obj.replaceAll("_"," ")}
                              inputFormat="MM/DD/YYYY"
                              onChange={(value) => {
                                onChange(value);
                              }} // send value to hook form
                              // onBlur={onBlur} // notify when input is touched/blur
                              value={value}
                              renderInput={(params) => (
                                <TextField size="small"  {...params} />
                              )}
                            />
                          </Stack>
                        </LocalizationProvider>
                      );
                    }}
                  />
                  <p style={{ height: 32, color: "red" }}>
                    {String(errors[obj]?.message ? errors[obj]?.message : "")}
                  </p>
                </React.Fragment>
              ) : (
                <React.Fragment key={obj}>
                <FormControl
                  key={obj}
                  size="small"
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-label">{obj}</InputLabel>
                  <Select labelId={obj} id={obj} label={obj} {...register(obj)}>
                    <MenuItem></MenuItem>
                    {obj === "nationality" || obj === "country"
                      ? countries.map((country: any, n: number) => {
                          return (
                            <MenuItem key={n} value={countryCode[n]}>
                              {country}
                            </MenuItem>
                          );
                        })
                      : obj === "gender"
                      ? Array(2)
                          .fill(0)
                          .map((_: any, n: number) => (
                            <MenuItem key={n} value={n === 0 ? "M" : "F"}>
                              {n === 0 ? "Male" : "Female"}
                            </MenuItem>
                          ))
                      : obj === "state"
                      ? stateMy.map((state: any, i: number) => (
                          <MenuItem key={i} value={stateMyCode[i]}>
                            {state}
                          </MenuItem>
                        ))
                      : obj === "status"
                      ? Array(3)
                          .fill(0)
                          .map((_: any, n: number) => (
                            <MenuItem
                              key={n}
                              value={n === 0 ? "SA" : n === 1 ? "SS" : "SX"}
                            >
                              {n === 0
                                ? "Status Active"
                                : n === 1
                                ? "Status Suspended"
                                : "Status Inactive"}
                            </MenuItem>
                          ))
                      : ""}
                  </Select>
                </FormControl>
                  <p style={{ height: 32, color: "red" }}>
                  {String(errors[obj]?.message ? errors[obj]?.message : "")}
                </p>
                </React.Fragment>
              );

            })}
            <Button
              type="submit"
              style={{ textTransform: "capitalize" }}
              className="normal-case mr-4 relative top-5"
              variant="contained"
            >
              Create
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

function Customer() {
  const [info, set_info] = useState<any>(
    JSON.parse(localStorage.getItem("token") as any)
  ); //if no token, info= null

  const [key, set_key] = useState<any>(false);
  const [toggle, set_toggle] = useState<any>(false);

  //  datagrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "db_id", headerName: "Db Id", width: 50 },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: false,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
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
                  JSON.stringify({ id: params.row.db_id, module: "customer" });
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
      field: "fbname",
      headerName: "Facebook Name",
      width: 120,
      headerAlign: "left",
      editable: false,
    },
    {
      field: "birth",
      headerName: "Birth Date",
      width: 400,
      headerAlign: "left",
      editable: false,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 70,
      editable: false,
    },
    {
      field: "phone",
      headerName: "Phone (Mobile)",
      width: 130,
      editable: false,
    },
    {
      field: "risk",
      headerName: "Risk",
      width: 50,
      editable: false,
    },
    {
      field: "pe",
      headerName: "PE",
      width: 50,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 70,
      editable: false,
    },
    {
      field: "referrer",
      headerName: "Referrer",
      width: 70,
      editable: false,
    },
    {
      field: "date",
      headerName: "Date",
      width: 70,
      editable: false,
    },
  ];
  const [rows, set_row] = useState<any>([
    // { id: 1, name: 'Snow', expiry: 'Jon'},
  ]);
  //  datagrid

  // api function
  async function customer_api() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}${api.customer}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result){
          let res = result.data.map((data: any, i: number) => {
            return {
              id: i,
              db_id: data.id,
              email: data.email,
              name: data.name,
              fbname: data.fb_name,
              // view
              fbusername: data.fb_username,
              nationality: data.nationality,
              national_id: data.national_id,
              passport_no: data.passport_no,
              passport_issuer: data.passport_issuer,
    
              birth: data.birth_date ? new Date(data.birth_date) : "",
              gender: data.gender,
              phone: data.phone_mobile,
    
              // view
              phone_home: data.phone_home,
              phone_office: data.phone_office,
              address: data.address,
              postcode: data.postcode,
              city: data.city,
              state: data.state,
              country: data.country,
    
              risk: data.risk,
              pe: data.pe,
              status: data.status,
              referrer: data.referred_by,
              date: "",
            };
          });
          set_row(res);

          return console.log(result);
        }

        return console.log(result);
      })
      .catch((error) => console.log("error", error));
    
  }
  // api function

  useEffect(() => {
    if (info !== null) {
      console.log("have token");
      console.log(info);
    } else {
      console.log("no token");
    }
  }, []);
  //get customer
  useEffect(() => {
    customer_api();
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-slate-300">
      <div className="flex-1 relative">
        <div className="flex justify-center font-semibold">
          Customer Management
        </div>
        <div className="absolute bottom-0 left-4">
          <Create_customer
            customer_api={customer_api}
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

export default Customer;
