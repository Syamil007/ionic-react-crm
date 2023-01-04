import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Add from '../Dashboard component/Subscriptions/Add';
import baseUrl, { api } from '../Urls';
import dayjs, { Dayjs } from 'dayjs';
import { Button } from '@mui/material';
import Create_subs from '../Dashboard component/Subscriptions/Add';

function Subscription() {

  const [info,set_info]=useState<any>(JSON.parse(localStorage.getItem('token') as any)); //if no token, info= null
  
  const [key,set_key] = useState<any>(false);
  const [toggle,set_toggle] = useState<any>(false);

  

  // mui datepicker
  const [values, setValue] = React.useState<Dayjs | null>(
    dayjs(new Date('1980-1-1'))
  );

  const handleChange = (newValue: Dayjs | null,i:number) => {
    console.log(dayjs(newValue).format('YYYY-MM-DD'))
    console.log('handlechange')
    setValue(newValue);
   
  };
  // mui datepicker

  //  datagrid
  const [rows,set_row]=useState<any>(
      [
        // { id: 1, name: 'Snow', expiry: 'Jon'},
        
      ]
    );
    
       const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'db_id', headerName: 'Db Id', width: 100 },
        // {
        //   field: 'date',
        //   headerName: 'Date',
        //   width: 90,
        //   editable: false,
        // },
        {
          field: 'name',
          headerName: 'Customer Name',
          width: 200,
          editable: false,
          renderCell: (params) => {
       
            return (
              <div className='w-100 d-flex justify-content-center'>
                <Button
                  className='border-0 text-black capitalize'
                  variant="outlined"
                  size="small"
                  style={{ marginLeft : 0 }}
                  onClick={()=>{
                    console.log(params.row);
                    let url = '/view/'+JSON.stringify({id: params.row.db_id, module:'subscriptions'});
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
          field: 'fb_name',
          headerName: 'Fb Name',
          type: 'number',
          width: 100,
          editable: false,
        },
        {
          field: 'fb_username',
          headerName: 'Fb Username',
          width: 200,
          editable: false,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 200,
          editable: false,
        },
        {
          field: 'phone_mobile',
          headerName: 'Phone(Mobile)',
          width: 200,
          editable: false,
        },
        {
          field: 'package_name',
          headerName: 'Package Name',
          width: 200,
          editable: false,
        },
        {
          field: 'package_title',
          headerName: 'Package Title',
          width: 100,
          editable: false,
        },
        {
          field: 'duration',
          headerName: 'Duration',
          width: 100,
          editable: false,
        },
        {
          field: 'start_date',
          headerName: 'Start Date',
          width: 100,
          editable: false,
        },
        {
          field: 'end_date',
          headerName: 'End Date',
          width: 100,
          editable: false,
        },
        {
          field: 'expired',
          headerName: 'Expired (Yes/No))',
          width: 200,
          editable: false,
        },
        {
          field: 'renewed',
          headerName: 'Renewed',
          width: 100,
          editable: false,
        },
        {
          field: 'subscribed_price',
          headerName: 'Subscribed Price',
          width: 200,
          editable: false,
        },
        {
          field: 'rebate',
          headerName: 'Rebate',
          width: 100,
          editable: false,
        },
        {
          field: 'discount',
          headerName: 'Discount',
          width: 100,
          editable: false,
        },
        {
          field: 'total_price',
          headerName: 'Total Price',
          width: 100,
          editable: false,
        },
        {
          field: 'total_payable',
          headerName: 'Total Payable',
          width: 100,
          editable: false,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 100,
          editable: false,
        },
        {
          field: 'link',
          headerName: 'Link to previous subs',
          width: 200,
          editable: false,
        },
        
       
      ];
  //  datagrid

  // api function
  async function sub_get_api() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions:any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let res = await fetch(`${baseUrl}${api.subscription}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);

        return result;
      })
      .catch(error => console.log('error', error));
    
    return res;
  }

  function sub_create() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var raw = JSON.stringify({
      // "renew": input.create.renew,
      // "package_id": input.create.package_id,
      // "tenure_id": input.create.tenure_id,
      // "customer_id": input.create.customer_id,
      // "subscribed_price": input.create.subscribed_price,
      // "rebate": input.create.rebate,
      // "start_date": dayjs(input.create.start_date).format('YYYY-MM-DD'),
      // "billing_interval": input.create.billing_interval,
    });

    var requestOptions:any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${baseUrl}${api.subscription}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  // api function
   
  useEffect(()=>{

    // function
    async function call() {
      let res = await sub_get_api();
      console.log(res);
      // logic
      res = Object.values(res)[0];
      console.log(res);
      let row = res.map((data:any,i:number)=>{
        return {  id: i,
                  db_id: data.id, 
                  name: data.name, 
                  fb_name: data.fb_name, 
                  fb_username: data.fb_username , 
                  email: data.email, 
                  phone_mobile: data.phone_mobile, 
                  package_name: data.package_name, 
                  package_title: data.package_title, 
                  duration: data.duration, 
                  start_date: data.start_date, 
                  end_date: data.end_date, 
                  expired: data.expired, 
                  renewed: data.renewed, 
                  subscribed_price: data.subscribed_price, 
                  rebate: data.rebate, 
                  discount: data.discount, 
                  total_price: data.total_price, 
                  total_payable: data.total_payable, 
                  status: data.status, 
                  link: '', 
                };
      });

      console.log(row);
      set_row(row);
    }
    // function


    // if(key==='sub_create'){
    //   console.log(input);
    //   console.log(dayjs(input.create.start_date).format('YYYY-MM-DD'));
    //   sub_create();
    // }
    if(key===false){
     
      let res = call();
      console.log(res);
    }

  },[toggle]);

      return (
        <div className='flex-1 flex flex-col bg-slate-300'>
            <div className='flex-1 relative'>
                  <div className='flex justify-center font-semibold'>
                        Subscriptions Management
                  </div>
                  <div className='absolute bottom-4 left-4'>
                        {/* modal add record */}
                        <Create_subs/>
                        
                        {/* modal add record */}
                  </div>
            </div>
            <div className='h-96'>
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
      )
}

export default Subscription