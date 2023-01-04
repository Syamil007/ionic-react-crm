import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Alert,
  Snackbar,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../components/Header";
import baseUrl, { api } from "../components/Urls";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Delete_payment from "../components/Dashboard component/Payment/Delete_payment";
import Approve_payment from "../components/Dashboard component/Payment/Approve_payment";
import Create_subs from "../components/Dashboard component/Subscriptions/Add";
import { Payment_create } from "../components/Dashboard/Payment";

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

function Subscribe({ row }: any) {
  const [info, set_info] = useState<any>(
    JSON.parse(localStorage.getItem("token") as any)
  ); //if no token, info= null

  const [data, set_data] = useState<any>({});

  const [key, set_key] = useState<any>(false); //false for initial useeffect call only, then never set it to false again
  const [toggle, set_toggle] = useState<any>(false);

  // api function
  // subscriptions api
  async function subs_get_api() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}${api.subscription}/${row[0][1]}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        set_data(result);

        return console.log(result);
      })
      .catch((error) => console.log("error", error));
  }
  // api function

  useEffect(() => {
    if (key === false) {
      if (row[1][1] === "subscriptions") {
        console.log("this is subs");
        subs_get_api();
      }
    }
  }, []);
  return (
    <div className="overflow-scroll">
      <Header />
      <div className="relative w-full">
        <div className="absolute right-4 top-4 capitalize">
          {/* modal add record */}
          <Create_subs />

          {/* modal add record */}
        </div>

        <div className="w-2/5 p-4">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableBody>
                {data?.data !== undefined &&
                  data?.data !== null &&
                  Object.keys(data?.data).map((obj: any, i: number) =>
                    obj === "createdBy" ? (
                      ""
                    ) : (
                      <TableRow
                        key={obj}
                        className="border-t-[1px] m-0"
                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell
                          className="w-1/4 capitalize font-semibold border-r-[1px] border-l-[1px]"
                          variant="head"
                        >
                          {obj}
                        </TableCell>
                        <TableCell
                          className="w-3/4 border-r-[1px] border-l-[1px]"
                          align="left"
                        >
                          <div>{data?.data[obj]}</div>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                {/* {data?.data!==undefined && data?.data!==null && Object.keys(data?.data).map((obj:any,i:number) => (
                            
                            <TableRow
                              key={obj}
                              className='border-t-[1px] m-0'
                              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell className='w-1/4 capitalize font-semibold border-r-[1px] border-l-[1px]' variant='head'>
                                          {obj}
                              </TableCell>
                              <TableCell className='w-3/4 border-r-[1px] border-l-[1px]' align="left">{(data?.data[obj]!==null && data?.data[obj].length===27 && data?.data[obj][data?.data[obj].length-1]==="Z" && data?.data[obj].slice(0,2)==="20" && `${new Date(data?.data[obj]) as any}` ) || (data?.data[obj])}</TableCell>
                            
                            </TableRow>
                          ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

function Customer({ input, set_input, row }: any) {
  const [info, set_info] = useState<any>(
    JSON.parse(localStorage.getItem("token") as any)
  ); //if no token, info= null

  const [key, set_key] = useState<any>(false); //false for initial useeffect call only, then never set it to false again
  const [toggle, set_toggle] = useState<any>(false);

  const [data, set_data] = useState<any>({});

  // mui datepicker
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  const handleChange = (newValue: Dayjs | null, i: number) => {
    console.log(dayjs(newValue).format("YYYY-MM-DD"));

    let temp = {
      ...input.put,
      birth_date: dayjs(newValue).format("YYYY-MM-DD"),
    };

    setValue(newValue);
    set_input({ ...input, put: temp });
  };
  // mui datepicker

  //api function
  // customer api
  async function customer_get() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let res = await fetch(
      `${baseUrl}${api.customer}/${row[0][1]}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        set_data(result);

        return result;
      })
      .catch((error) => console.log("error", error));
    return res;
  }
  function customer_update_api() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);
    console.log(input.put.phone_home);
    var raw = JSON.stringify({
      name: input.put.name,
      nationality: input.put.nationality,
      national_id: input.put.national_id,
      passport_no: null,
      passport_issuer: null,
      birth_date: input.put.birth,
      gender: input.put.gender,
      phone_mobile: input.put.phone,
      phone_home: input.put.phone_home,
      phone_office: input.put.phone_office,
      address: input.put.address,
      postcode: input.put.postcode,
      city: input.put.city,
      state: input.put.state,
      country: input.put.country,
      status: input.put.status,
      risk: Number(input.put.risk),
      pe: Number(input.put.pe),
    });

    var requestOptions: any = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}${api.customer}/${input.id}`, requestOptions)
      .then((response) => response.status)
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  async function customer_get_api() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let res = await fetch(
      `${baseUrl}${api.customer}/${row[0][1]}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(input);
        console.log(result);
        let temp = {
          address: result.data.address,
          birth: result.data.birth_date,
          city: result.data.city,
          country: result.data.country,
          email: result.data.email,
          gender: result.data.gender,
          name: result.data.name,
          national_id: result.data.national_id,
          nationality: result.data.nationality,
          passport_issuer: result.data.passport_issuer,
          passport_no: result.data.passport_no,
          pe: result.data.pe,
          phone: result.data.phone_mobile,
          phone_home: result.data.phone_home,
          phone_office: result.data.phone_office,
          postcode: result.data.postcode,
          referrer: result.data.referred_by,
          risk: result.data.risk,
          state: result.data.state,
          status: result.data.status,
        };
        setValue(dayjs(result.data.birth_date));
        set_input({ ...input, put: temp });

        return result;
      })
      .catch((error) => console.log("error", error));

    return res;
  }
  //api function

  useEffect(() => {
    if (key === false) {
      if (row[1][1] === "customer") {
        console.log("this is customer");
        customer_get();
      }
    }
    if (key === "customer_update") {
      customer_update_api();
    }
    if (key === "customer_get") {
      let res = customer_get_api();
      console.log(res);
    }
  }, [toggle]);

  return (
    <div className="overflow-scroll">
      <Header />
      <div className="w-full relative flex">
        {/* table div */}
        <div className="w-[500px] p-4">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableBody>
                {data?.data !== undefined &&
                  data?.data !== null &&
                  Object.keys(data?.data).map((key: any, i: number) => (
                    <TableRow
                      key={key}
                      className="border-t-[1px] m-0"
                      // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        className="w-1/4 capitalize font-semibold border-r-[1px] border-l-[1px]"
                        variant="head"
                      >
                        {key}
                      </TableCell>

                      {/* 2nd column */}
                      {input.edit === false ? (
                        <TableCell
                          className="w-3/4 border-r-[1px] border-l-[1px]"
                          align="left"
                        >
                          {data?.data[key] === null
                            ? "null"
                            : data?.data[key] === true
                            ? "true"
                            : data?.data[key]}
                        </TableCell>
                      ) : key === "email" ||
                        key === "name" ||
                        key === "national_id" ||
                        key === "passport_no" ||
                        key === "passport_issuer" ||
                        key === "phone_mobile" ||
                        key === "phone_home" ||
                        key === "phone_office" ||
                        key === "address" ||
                        key === "postcode" ||
                        key === "city" ||
                        key === "risk" ||
                        key === "pe" ||
                        key === "referred_by" ? (
                        // generate textfield
                        <TableCell
                          className="w-3/4 border-r-[1px] border-l-[1px]"
                          align="left"
                        >
                          {/* input */}
                          <TextField
                            // InputProps={{ sx: { height: 30, fontSize:20} }}
                            size="small"
                            value={input.put[key] || ""}
                            type={
                              key === "risk" ||
                              key === "pe" ||
                              key === "referred_by"
                                ? "number"
                                : "text"
                            }
                            onChange={(e) => {
                              let temp = {
                                ...input.put,
                                [key]: e.target.value,
                              };

                              set_input({ ...input, put: temp });
                            }}
                            variant="outlined"
                          />
                        </TableCell>
                      ) : key === "nationality" ||
                        key === "gender" ||
                        key === "state" ||
                        key === "country" ||
                        key === "status" ? (
                        <TableCell
                          className="w-3/4 border-r-[1px] border-l-[1px]"
                          align="left"
                        >
                          <FormControl
                            style={{ marginTop: 4, marginBottom: 4 }}
                            fullWidth
                            size="small"
                          >
                            <InputLabel id={key}>
                              {key === "nationality"
                                ? "Nationality"
                                : key === "gender"
                                ? "Gender"
                                : key === "state"
                                ? "State"
                                : key === "country"
                                ? "Country"
                                : key === "status"
                                ? "Status"
                                : ""}
                            </InputLabel>
                            <Select
                              value={input.put[key] || ""}
                              labelId={key}
                              id={key}
                              label={
                                key === "nationality"
                                  ? "Nationality"
                                  : key === "gender"
                                  ? "Gender"
                                  : key === "state"
                                  ? "State"
                                  : key === "country"
                                  ? "Country"
                                  : key === "status"
                                  ? "Status"
                                  : ""
                              }
                              onChange={(e: any) => {
                                let temp = {
                                  ...input.put,
                                  [key]: e.target.value,
                                };

                                set_input({ ...input, put: temp });
                              }}
                            >
                              <MenuItem> </MenuItem>

                              {/* list of select option */}
                              {key === "nationality" || key === "country" ? (
                                countries.map((country: any, n: number) => {
                                  return (
                                    <MenuItem key={n} value={countryCode[n]}>
                                      {country}
                                    </MenuItem>
                                  );
                                })
                              ) : key === "gender" ? (
                                Array(2)
                                  .fill(0)
                                  .map((_: any, n: number) => (
                                    <MenuItem
                                      key={n}
                                      value={n === 0 ? "M" : "F"}
                                    >
                                      {n === 0 ? "Male" : "Female"}
                                    </MenuItem>
                                  ))
                              ) : key === "state" ? (
                                stateMy.map((state: any, i: number) => (
                                  <MenuItem key={i} value={stateMyCode[i]}>
                                    {state}
                                  </MenuItem>
                                ))
                              ) : key === "status" ? (
                                Array(3)
                                  .fill(0)
                                  .map((_: any, n: number) => (
                                    <MenuItem
                                      key={n}
                                      value={
                                        n === 0 ? "SA" : n === 1 ? "SS" : "SX"
                                      }
                                    >
                                      {n === 0
                                        ? "Status Active"
                                        : n === 1
                                        ? "Status Suspended"
                                        : "Status Inactive"}
                                    </MenuItem>
                                  ))
                              ) : (
                                <MenuItem value="">Error</MenuItem>
                              )}
                            </Select>
                          </FormControl>
                        </TableCell>
                      ) : key === "birth_date" ? (
                        <TableCell
                          className="w-3/4 border-r-[1px] border-l-[1px]"
                          align="left"
                        >
                          <div
                            key={i}
                            style={{ marginTop: 4, marginBottom: 4 }}
                          >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <Stack spacing={3}>
                                <DesktopDatePicker
                                  label="Birth Date"
                                  inputFormat="MM/DD/YYYY"
                                  value={value || ""}
                                  onChange={(e: any) => {
                                    handleChange(e, i);
                                  }}
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                />
                              </Stack>
                            </LocalizationProvider>
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell
                          className="w-3/4 border-r-[1px] border-l-[1px]"
                          align="left"
                        >
                          {data?.data[key] === null
                            ? "null"
                            : data?.data[key] === true
                            ? "true"
                            : data?.data[key]}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="absolute left-[500px] top-4 flex flex-col">
          <div className="flex justify-center">Action</div>
          <Create_subs module={"customer"} row={row} />
          <Button
            onClick={() => {
              let temp = row[1][1];
              set_input({ ...input, id: temp, edit: !input.edit });

              set_key("customer_get");
              set_toggle(!toggle);
            }}
            variant="contained"
            className={`mt-4 capitalize ${input.edit && "bg-red-400"}`}
          >
            {input.edit ? "Cancel Edit" : "Edit"}
          </Button>
          <Button
            onClick={() => {
              let id = row[1][1];
              set_input({ ...input, id: id });
              console.log(id);

              set_key("customer_update");
              set_toggle(!toggle);
            }}
            hidden={input.edit ? false : true}
            variant="contained"
            className="mt-4 capitalize w-full"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}

function Payment_method({ row }: any) {
  const [info, set_info] = useState<any>(
    JSON.parse(localStorage.getItem("token") as any)
  ); //if no token, info= null

  const [data, set_data] = useState<any>({});
  const [edit, set_edit] = useState<any>(false);

  const [key, set_key] = useState<any>(false); //false for initial useeffect call only, then never set it to false again
  const [toggle, set_toggle] = useState<any>(false);

  //useform

  const schema = yup.object().shape({
    // renew: yup.boolean().typeError('Renew field is required').required("Renew field is required"),
    // package_id: yup.number().typeError('Package is required').required('Package is required'),
    // tenure_id: yup.number().typeError('Tenure is required').required('Tenure is required'),
    // customer_id:yup.number().typeError('Customer is required').required('Customer is required'),
    // subscribed_price: yup.number().typeError('Price is required').required('Price is required'),
    // rebate:yup.number().typeError('Rebate is required').required('Rebate is required'),
    // start_date:yup.string().required('Start Date is required'),
    // billing_interval:yup.string().required('Billing Interval is required'),
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

  const [input, set_input] = useState<any>({
    update: {},
    update_respon: "",
  });

  function onSubmit(data: any) {
    console.log(data);

    set_input({ ...input, update: data });

    set_key("update_pay_method");
    set_toggle(!toggle);
  }
  //useform

  // api function
  function payment_get() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}${api.pay_method}/${row[0][1]}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        set_data(result);

        return console.log(result);
      })
      .catch((error) => console.log("error", error));
  }
  function update_pay_method() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var raw = JSON.stringify({
      name: input.update.name,
      title: input.update.title,
      status: input.update.status,
    });

    var requestOptions: any = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}${api.pay_method}/${row[0][1]}`, requestOptions)
      .then((response) => response.status)
      .then((result) => {
        if (result === 204) {
          set_input({ ...input, update_respon: result });
          payment_get();
          set_edit(false);
        }

        return console.log(result);
      })
      .catch((error) => console.log("error", error));
  }
  // api function

  useEffect(() => {
    payment_get();
  }, []);

  useEffect(() => {
    if (key === "update_pay_method") {
      update_pay_method();
    }
  }, [toggle]);

  return (
    <div className="overflow-scroll">
      <Header />
      <div className="relative w-full">
        <div className="absolute right-4 top-4 capitalize flex flex-col">
          {/* modal add record */}
          {edit === false ? (
            <Button
              onClick={() => {
                set_edit(true);
                let defaultValues = {
                  name: data.data.name,
                  title: data.data.title,
                  status: data.data.status,
                };
                reset({ ...defaultValues });
              }}
              variant="contained"
            >
              Edit
            </Button>
          ) : (
            <Button
              onClick={() => {
                set_edit(false);
              }}
              variant="contained"
            >
              Cancel Edit
            </Button>
          )}

          {/* modal add record */}
        </div>

        <div className="w-2/5 p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableBody>
                  {data?.data !== undefined &&
                    data?.data !== null &&
                    Object.keys(data?.data).map((obj: any, i: number) =>
                      obj === "createdBy" ? (
                        ""
                      ) : (
                        <TableRow
                          key={obj}
                          className="border-t-[1px] m-0"
                          // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell
                            className="w-1/4 capitalize font-semibold border-r-[1px] border-l-[1px]"
                            variant="head"
                          >
                            {obj}
                          </TableCell>
                          <TableCell
                            className="w-3/4 border-r-[1px] border-l-[1px]"
                            align="left"
                          >
                            {edit ? (
                              obj === "name" || obj === "title" ? (
                                <TextField
                                  label="Size"
                                  id="outlined-size-small"
                                  defaultValue="Small"
                                  size="small"
                                  {...register(obj)}
                                />
                              ) : obj === "status" ? (
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    {obj}
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label={obj}
                                    {...register(obj)}
                                  >
                                    <MenuItem value={""}>
                                      Select Status
                                    </MenuItem>
                                    <MenuItem value={"SA"}>
                                      Status Active
                                    </MenuItem>
                                    <MenuItem value={"SX"}>
                                      Status Inactive
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              ) : (
                                <div>{data?.data[obj]}</div>
                              )
                            ) : (
                              <div>{data?.data[obj]}</div>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                </TableBody>
              </Table>
            </TableContainer>
            {edit && (
              <Button type="submit" className="mt-4" variant="contained">
                Update
              </Button>
            )}

            <Snackbar
              open={input.update_respon === 204 ? true : false}
              autoHideDuration={6000}
              onClose={() => set_input({ ...input, update_respon: "" })}
            >
              <Alert
                onClose={() => set_input({ ...input, update_respon: "" })}
                severity="success"
                sx={{ width: "100%" }}
              >
                Update success 204!
              </Alert>
            </Snackbar>
          </form>
        </div>
      </div>
    </div>
  );
}

function Billing({ row }: any) {
  const [info, set_info] = useState<any>(
    JSON.parse(localStorage.getItem("token") as any)
  ); //if no token, info= null

  const [data, set_data] = useState<any>({});

  const [key, set_key] = useState<any>(false); //false for initial useeffect call only, then never set it to false again
  const [toggle, set_toggle] = useState<any>(false);

  //component
  function Email() {
    return (
      <div className="mx-4 mt-4">
        <div className="flex justify-center">Bills Info</div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableBody>
              {data?.data !== undefined &&
                data?.data !== null &&
                Object.keys(data?.data).map((obj: any, i: number) =>
                  Array.isArray(data?.data[obj]) ? (
                    ""
                  ) : typeof data?.data[obj] === "object" ? (
                    ""
                  ) : (
                    <TableRow
                      key={obj}
                      className="border-t-[1px] m-0"
                      // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        className="w-1/4 capitalize font-semibold border-r-[1px] border-l-[1px]"
                        variant="head"
                      >
                        {obj}
                      </TableCell>
                      <TableCell
                        className="w-3/4 border-r-[1px] border-l-[1px]"
                        align="left"
                      >
                        {(data?.data[obj] !== null &&
                          data?.data[obj].length === 27 &&
                          data?.data[obj][data?.data[obj].length - 1] === "Z" &&
                          data?.data[obj].slice(0, 2) === "20" &&
                          `${new Date(data?.data[obj]) as any}`) ||
                          data?.data[obj]}
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
  function Subscription() {
    return (
      <div className="mx-4 mt-4">
        <div className="flex justify-center">Subscription Info</div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableBody>
              {data?.data !== undefined &&
                data?.data !== null &&
                Object.keys(data?.data?.subscription).map(
                  (obj: any, i: number) =>
                    obj === "start_date" ||
                    obj === "end_date" ||
                    obj === "expired" ||
                    obj === "renewed" ||
                    obj === "subscribed_price" ||
                    obj === "rebate" ||
                    obj === "discount" ||
                    obj === "total_price" ||
                    obj === "total_payable" ||
                    obj === "status" ? (
                      <TableRow
                        key={obj}
                        className="border-t-[1px] m-0"
                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell
                          className="w-1/4 capitalize font-semibold border-r-[1px] border-l-[1px]"
                          variant="head"
                        >
                          {obj}
                        </TableCell>
                        <TableCell
                          className="w-3/4 border-r-[1px] border-l-[1px]"
                          align="left"
                        >
                          {(data?.data?.subscription[obj] !== undefined &&
                            data?.data?.subscription[obj] !== null &&
                            data?.data?.subscription[obj].length === 27 &&
                            data?.data?.subscription[obj][
                              data?.data?.subscription[obj].length - 1
                            ] === "Z" &&
                            data?.data?.subscription[obj].slice(0, 2) ===
                              "20" &&
                            `${
                              new Date(data?.data?.subscription[obj]) as any
                            }`) ||
                            data?.data?.subscription[obj]}
                        </TableCell>
                      </TableRow>
                    ) : (
                      ""
                    )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
  function Package() {
    return (
      <div className="mx-4 mt-4">
        <div className="flex justify-center">Package Info</div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableBody>
              {data?.data?.subscription?.package !== undefined &&
                data?.data?.subscription?.package !== null &&
                Object.keys(data?.data?.subscription?.package).map(
                  (obj: any, i: number) =>
                    obj === "name" ||
                    obj === "title" ||
                    obj === "valid_from" ? (
                      <TableRow
                        key={obj}
                        className="border-t-[1px] m-0"
                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell
                          className="w-1/4 capitalize font-semibold border-r-[1px] border-l-[1px]"
                          variant="head"
                        >
                          {obj}
                        </TableCell>
                        <TableCell
                          className="w-3/4 border-r-[1px] border-l-[1px]"
                          align="left"
                        >
                          {(data?.data?.subscription?.package[obj] !==
                            undefined &&
                            data?.data?.subscription?.package[obj] !== null &&
                            data?.data?.subscription?.package[obj].length ===
                              27 &&
                            data?.data?.subscription?.package[obj][
                              data?.data?.subscription?.package[obj].length - 1
                            ] === "Z" &&
                            data?.data?.subscription?.package[obj].slice(
                              0,
                              2
                            ) === "20" &&
                            `${
                              new Date(
                                data?.data?.subscription?.package[obj]
                              ) as any
                            }`) ||
                            data?.data?.subscription?.package[obj]}
                        </TableCell>
                      </TableRow>
                    ) : (
                      ""
                    )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
  //component

  //api function
  function get_billing() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}${api.billing}/${row[0][1]}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          set_data(result);
        }

        return console.log(result);
      })
      .catch((error) => console.log("error", error));
  }
  //api function

  useEffect(() => {
    if (key === false) {
      get_billing();
    }
  }, []);

  return (
    <div className="overflow-scroll">
      <Header />
      <div className="w-full flex">
        <div className="w-4/5 p-4 flex flex-col">
          <Email />
          <Subscription />
          <Package />
        </div>
        <div className="w-1/5 flex flex-col justify-start">
            <div className="mt-8 mb-4">Action</div>
            <Payment_create 
            module={"billing"}/>
            <Button className="w-32 mt-4 capitalize" variant="contained">Action</Button>
            
        </div>
      </div>
    </div>
  );
}

function Payment({ row }: any) {
  const [info, set_info] = useState<any>(
    JSON.parse(localStorage.getItem("token") as any)
  ); //if no token, info= null

  const [data, set_data] = useState<any>({});

  const [key, set_key] = useState<any>(false); //false for initial useeffect call only, then never set it to false again
  const [toggle, set_toggle] = useState<any>(false);

  const [input_payment, set_input_payment] = useState<any>({
    delete: {},
    delete_respon: "",
    delete_snackbar: false,

    approve: {},
    approve_respon: "",
    approve_snackbar: false,
  });

  //component
  function Payment_view() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableBody>
            {data?.data !== undefined &&
              data?.data !== null &&
              Object.keys(data?.data).map((obj: any, i: number) =>
                typeof data?.data[obj] === "object" ? (
                  ""
                ) : (
                  <TableRow
                    key={i}
                    className="border-t-[1px] m-0"
                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      className="w-1/4 capitalize font-semibold border-r-[1px] border-l-[1px]"
                      variant="head"
                    >
                      {obj}
                    </TableCell>
                    <TableCell
                      className="w-3/4 border-r-[1px] border-l-[1px]"
                      align="left"
                    >
                      {(data?.data[obj] !== undefined &&
                        data?.data[obj] !== null &&
                        data?.data[obj].length === 27 &&
                        data?.data[obj][data?.data[obj].length - 1] === "Z" &&
                        data?.data[obj].slice(0, 2) === "20" &&
                        `${new Date(data?.data[obj]) as any}`) ||
                        data?.data[obj]}
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  //component

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

    fetch(`${baseUrl}${api.payments}/${row[0][1]}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.data) {
          set_data(result);
        }

        return console.log(result);
      })
      .catch((error) => console.log("error", error));
  }
  //api function

  useEffect(() => {
    if (key === false) {
      get_payment();
    }
  }, [toggle]);

  return (
    <div className="overflow-scroll">
      <Header />
      <div className="w-2/5 p-4 flex ">
        <Payment_view />
        <div className="flex flex-col ml-4 items-center">
          <div className="flex justify-center">Action</div>
          <Delete_payment
            data={data}
            row={row}
            input_payment={input_payment}
            set_input_payment={set_input_payment}
            get_payment={get_payment}
          />
          <Approve_payment
            data={data}
            row={row}
            input_payment={input_payment}
            set_input_payment={set_input_payment}
          />
        </div>
      </div>
    </div>
  );
}

function View() {
  const [info, set_info] = useState<any>(
    JSON.parse(localStorage.getItem("token") as any)
  ); //if no token, info= null

  const [data, set_data] = useState<any>({});
  const [input, set_input] = useState<any>({
    id: [""],
    add: [""],
    put: {},
    edit: false,
  });

  const [key, set_key] = useState<any>(false); //false for initial useeffect call only, then never set it to false again
  const [toggle, set_toggle] = useState<any>(false);

  // checking view module
  let { ref } = useParams<any>();
  let row: any = Object.entries(JSON.parse(ref));

  let feature = row.filter(
    (col: any) => col[0] === "module" && col[1] === "feature"
  );
  let packages = row.filter(
    (col: any) => col[0] === "module" && col[1] === "package"
  );
  let customer = row.filter(
    (col: any) => col[0] === "module" && col[1] === "customer"
  );
  let subscriptions = row.filter(
    (col: any) => col[0] === "module" && col[1] === "subscriptions"
  );
  let payment_method = row.filter(
    (col: any) => col[0] === "module" && col[1] === "payment_method"
  );
  let billing = row.filter(
    (col: any) => col[0] === "module" && col[1] === "billing"
  );
  let payment = row.filter(
    (col: any) => col[0] === "module" && col[1] === "payment"
  );

  console.log(row);
  console.log(customer);
  // checking view module

  // api function
  // feature api
  async function feature_get() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let res = await fetch(
      `${baseUrl}${api.features}/${row[0][1]}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        set_data(result);

        return result;
      })
      .catch((error) => console.log("error", error));
    return res;
  }
  // package api
  async function package_get() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let res = await fetch(
      `${baseUrl}${api.packages}/${row[0][1]}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        set_data(result);

        return result;
      })
      .catch((error) => console.log("error", error));
    return res;
  }
  // api function

  useEffect(() => {
    if (key === false) {
      if (row[1][1] === "feature") {
        feature_get();
      }
      if (row[1][1] === "package") {
        console.log("this is package");
        package_get();
      }
    }
  }, [toggle]);

  console.log(subscriptions);
  if (feature.length === 1) {
    // console.log(data.data);
    return (
      <div className="overflow-scroll">
        <Header />
        <div className="w-2/5 p-4">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableBody>
                {data?.data !== undefined &&
                  data?.data !== null &&
                  Object.keys(data?.data).map((obj: any, i: number) => (
                    <TableRow
                      key={obj}
                      className="border-t-[1px] m-0"
                      // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        className="w-1/4 capitalize font-semibold border-r-[1px] border-l-[1px]"
                        variant="head"
                      >
                        {obj}
                      </TableCell>
                      <TableCell
                        className="w-3/4 border-r-[1px] border-l-[1px]"
                        align="left"
                      >
                        {(data?.data[obj] !== null &&
                          data?.data[obj].length === 27 &&
                          data?.data[obj][data?.data[obj].length - 1] === "Z" &&
                          data?.data[obj].slice(0, 2) === "20" &&
                          `${new Date(data?.data[obj]) as any}`) ||
                          data?.data[obj]}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  } else if (packages.length === 1) {
    // if(data?.data){
    //   console.log(Object.keys(data?.data));
    //   console.log(typeof null);
    // }

    return (
      <div className="overflow-scroll">
        <Header />
        <div className="w-2/5 p-4">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableBody>
                {data?.data !== undefined &&
                  data?.data !== null &&
                  Object.keys(data?.data).map((key: any, i: number) =>
                    Array.isArray(data?.data[key]) ? (
                      ""
                    ) : (
                      <TableRow
                        key={key}
                        className="border-t-[1px] m-0"
                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell
                          className="w-1/4 capitalize font-semibold border-r-[1px] border-l-[1px]"
                          variant="head"
                        >
                          {key}
                        </TableCell>
                        <TableCell
                          className="w-3/4 border-r-[1px] border-l-[1px]"
                          align="left"
                        >
                          {data?.data[key] === null
                            ? ""
                            : data?.data[key] === true
                            ? "true"
                            : data?.data[key]}
                        </TableCell>
                      </TableRow>
                    )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  } else if (customer.length === 1) {
    return <Customer input={input} set_input={set_input} row={row} />;
  } else if (subscriptions.length === 1) {
    // console.log(Object.keys(data?.data));
    return <Subscribe row={row} />;
  } else if (payment_method.length === 1) {
    // console.log(Object.keys(data?.data));
    return <Payment_method row={row} />;
  } else if (billing.length === 1) {
    // console.log(Object.keys(data?.data));
    return <Billing row={row} />;
  } else if (payment.length === 1) {
    // console.log(Object.keys(data?.data));
    return <Payment row={row} />;
  }

  return <div className="text-red-600 flex justify-center">Error</div>;
}

export default View;
