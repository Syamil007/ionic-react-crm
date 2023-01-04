import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import baseUrl, { api } from "../Urls";
import { Button } from "@mui/material";

function Billing() {

  const [key, set_key] = useState<any>(false);
  const [toggle, set_toggle] = useState<any>(false);

  const [info, set_info] = useState<any>(
    JSON.parse(localStorage.getItem("token") as any)
  ); //if no token, info= null
  
  //datagrid
  const [rows, set_row] = useState<any>([
    // { id: 1, name: 'Snow', expiry: 'Jon'},
  ]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "db_id",
      headerName: "Db Id",
      width: 90,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 100,
      editable: false,
    },
    {
      field: "name",
      headerName: "Name",
      type: "number",
      width: 100,
      editable: false,
      renderCell: (params) => {
       
        return (
          <div className='w-100 d-flex justify-content-center'>
            <Button
              className='border-0 text-black'
              variant="outlined"
              size="small"
              style={{ marginLeft : 0 }}
              onClick={()=>{
                console.log(params.row);
                let url = '/view/'+JSON.stringify({id: params.row.db_id, module:'billing'});
                console.log(url);
                // localStorage.setItem("id",`${params.row.id}`);
                window.open(url);

               
              }}
            >
              {params.row.name}
            </Button>
          </div>)
        
      },
    },
    {
      field: "phone_mobile",
      headerName: "Phone(Mobile)",
      width: 200,
      editable: false,
    },
    {
      field: "sequence",
      headerName: "Sequence",
      width: 100,
      editable: false,
    },
    {
      field: "billing_date",
      headerName: "Billing Date",
      width: 100,
      editable: false,
    },
    {
      field: "due_date",
      headerName: "Due Date ",
      width: 100,
      editable: false,
    },
    {
      field: "amount",
      headerName: "Bill Amount",
      width: 100,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: false,
    },
  ];
  //datagrid

  //api function
  function billing_get() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions:any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${baseUrl}${api.billing}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result?.data){
          set_row(result?.data.map((data:any,i:number)=>{
            return {
              id:i,
              db_id:data.id,
              email:data.email,
              name:data.name,
              phone_mobile:data.phone_mobile,
              sequence:data.sequence,
              billing_date:data.billing_date,
              due_date:data.due_date,
              amount:data.amount,
              status:data.status,
            }
          }));
        }

        return console.log(result)
      })
      .catch(error => console.log('error', error));
  }
  //api function

  useEffect(()=>{
    if(key===false){
      billing_get();
    }
  },[]);

  return (
    <div className="flex-1 flex flex-col bg-slate-300">
      <div className="flex-1 relative">
        <div className="flex justify-center font-semibold">
          Bills Management
        </div>
        <div className="absolute bottom-0 left-4">
          
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
                db_id:false
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Billing;
