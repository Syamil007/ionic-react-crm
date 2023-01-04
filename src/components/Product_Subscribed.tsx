import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import baseUrl, { api } from "./Urls";




export default function Product_Subscribed() {

  const [id,set_id]=useState('1');

  const [info,set_info]=useState<any>(JSON.parse(localStorage.getItem('token') as any));

  const [data,set_data]=useState<any>('');

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Product Name',
      width: 200,
      editable: false,
    },
    {
      field: 'expiry',
      headerName: 'Expiry',
      width: 200,
      editable: false,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];
  
  const [rows,set_row]=useState<any>(
    [
      // { id: 1, name: 'Snow', expiry: 'Jon'},
     
    ]
  );

 

  async function subs_api() {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions:any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let res = await fetch(`${baseUrl}${api.subscription}/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        
        console.log(result)
        return result;})
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
      let res = await subs_api();
      console.log(res);

      let row = [
        { id: 1, name: res?.data?.package_title, expiry: res?.data?.end_date},
      ];
      console.log(row);
      set_row(row);

      return res;
    }

    if(info!==null){
      let res:any = call();
      console.log(res);
      
     
    }
    else{
      console.log("no token");
    }
  },[]);

  return (
    <Box sx={{ height: 352, width: '100%' }}>
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
    
  );
}
