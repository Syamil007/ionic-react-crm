import React, { useEffect, useState } from 'react'
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import baseUrl, { api } from './Urls';



function Payment_detail() {

    const [info,set_info]=useState<any>(JSON.parse(localStorage.getItem('token') as any));

    const [rows,set_row]=useState<any>(
      [
        // { id: 1, name: 'Snow', expiry: 'Jon'},
       
      ]
    );


    // date picker 
    const [value, setValue] = React.useState<Dayjs | null>(
      dayjs('2014-08-18T21:11:54'),
    );
  
    const handleChange = (newValue: Dayjs | null) => {
      setValue(newValue);
    };
     // date picker 

    //  datagrid
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
          field: 'date',
          headerName: 'Date',
          width: 90,
          editable: false,
        },
        {
          field: 'bank',
          headerName: 'Bank',
          width: 70,
          editable: false,
        },
        {
          field: 'amount',
          headerName: 'Amount(RM)',
          type: 'number',
          width: 100,
          editable: false,
        },
        {
          field: 'package',
          headerName: 'Package',
          width: 250,
          editable: false,
        },
        {
          field: 'channel',
          headerName: 'Channel',
          width: 70,
          editable: false,
        },
       
      ];
    
    async function payment_api() {
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${info.token}`);

      var requestOptions:any = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let res = await fetch(`${baseUrl}${api.payments}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          return result;
        })
        .catch(error => console.log('error', error));
      return res;
    }  

    useEffect(()=>{
      if(info!==null){
        console.log('have token');
        console.log(info);
      }
      else{
        console.log("no token");
      }
    },[]);

    useEffect(()=>{
      async function call() {
        let res = await payment_api();
        
        let row = res.data.map((data:any,i:number)=>{

          return { id: i+1, date: `${data.date.slice(2,4)}/${data.date.slice(5,7)}/${data.date.slice(8,10)}`, bank: data.bank, amount: data.amount , package: data.package_title , channel: "full"}
        });
        console.log(row);
        
        set_row(row);

        // [
        //   { id: 1, date: 'Snow', bank: 'Jon', amount: 35 , package: "s1" , channel: "full"},
        // ];
        console.log(res);
      }
      if(info!==null){
        let res = call();
        console.log(res);
      }

    },[]);
      
  return (
      <Box sx={{ height: 352, width: '100%' }}>
            <div className='flex '>
                  <div className='w-48 py-4 px-4'>
                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
                          <Stack spacing={3}>
                            <DesktopDatePicker
                              label="Date desktop"
                              inputFormat="MM/DD/YYYY"
                              value={value}
                              onChange={handleChange}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </Stack>
                        </LocalizationProvider>
                  </div>
            </div>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
              
            />
      </Box>
  )
}

export default Payment_detail