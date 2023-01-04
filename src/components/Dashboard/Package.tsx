import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import baseUrl, { api } from '../Urls';
import { Button, Modal, Box, Typography, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import Add from '../Dashboard component/Package/Add';

function Package() {

  const [info,set_info]=useState<any>(JSON.parse(localStorage.getItem('token') as any)); //if no token, info= null
  
  const [key,set_key] = useState<any>(false);
  const [toggle,set_toggle] = useState<any>(false);

  const [input,set_input] = useState<any>({

    id:[''],
    add:{
      name:'',
      title:'',
      self_subscribe:false,
      staff_subscribe:false,
      status:'',
      tenures:[],
      features:[],
    },

    put:[''],
    tenure_list:'',
    feature_list:'',
    add_tenure:[1],
    add_feature:[1],
  });

  // modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
                            async function call() {
                              let tenure = await tenure_api_get();
                              let feature = await feature_api_get();
                              
                              set_input({...input,tenure_list: tenure,feature_list: feature});
                            }
                            call();
                            setOpen(true);
                            }
  const handleClose = () => {
    async function call() {
      let res = await package_api();
      console.log(res);
      res = Object.values(res)[0];
      console.log(res);
      // logic
      let row = res.map((d:any,i:number)=>{
        return {  id: i+1,
                  db_id:d.id,
                  name: d.name, 
                  title: d.title,
                  description: d.description,
                  selfsubs: d.self_subscribe,
                  staffsubs: d.staff_subscribe,
                  validfrom:d.valid_from,
                  validto:d.valid_to,
                  status:d.status,
                  };
      });
      console.log(row);
      set_row(row);
    }
    
    set_input({...input,add:{...input.add,tenures:[],features:[],self_subscribe:false,staff_subscribe:false,status:'',name:'',title:''},add_tenure:[1],add_feature:[1]});

    setOpen(false);
    let res = call();
    console.log(res);

  };

   // style for modal
   const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
    display:'flex',
    flexDirection:'column',
    overflow:'scroll',
  };
  // modal state

  // datagrid 
   const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50,headerAlign: 'left',},
    { field: 'db_id', headerName: 'DB Id', width: 100, headerAlign: 'left',},
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: false,
      renderCell: (params) => {
       
        return (
          <div className='w-100 d-flex justify-content-center'>
            <Button
              className='border-0 capitalize text-black'
              variant="outlined"
              size="small"
              style={{ marginLeft : 0 }}
              onClick={()=>{
                console.log(params.row);
                let url = '/view/'+JSON.stringify({id: params.row.db_id, module:'package'});
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
      field: 'title',
      headerName: 'Title',
      width: 250,
      editable: false,
    },
    // {
    //   field: 'description',
    //   headerName: 'Description',
    //   width: 100,
    //   editable: false,
    // },
    {
      field: 'selfsubs',
      headerName: 'Self Subscribe(Yes/No)',
      width: 200,
      editable: false,
    },
    {
      field: 'staffsubs',
      headerName: 'Staff Subscribe(Yes/No)',
      width: 200,
      editable: false,
    },
    {
      field: 'validfrom',
      headerName: 'Valid From(Date)',
      width: 200,
      editable: false,
    },
    {
      field: 'validto',
      headerName: 'Valid To(Date)',
      width: 200,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      editable: false,
    },
   
  ];

  const [rows,set_row]=useState<any>(
    [
      // { id: 1, name: 'Snow', expiry: 'Jon'},
    ]
  );
  // datagrid 

  // api function
  async function package_api() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions:any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let res = await fetch(`${baseUrl}${api.packages}`, requestOptions)
      .then(response => response.json())
      .then(result => result)
      .catch(error => console.log('error', error));
      return res;
  }
  async function package_api_create() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var raw = JSON.stringify({
      "name": input.add.name,
      "title": input.add.title,
      "self_subscribe": input.add.self_subscribe,
      "staff_subscribe": input.add.staff_subscribe,
      "status": input.add.status,
      "tenures": input.add.tenures,
      "features": input.add.features,
    });

    var requestOptions:any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${baseUrl}${api.packages}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  async function tenure_api_get() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions:any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let res = await fetch(`${baseUrl}${api.tenures}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        // set_input({...input, tenure_list: result.data});

        return result.data;
      })
      .catch(error => console.log('error', error));
    return res;
  }
  async function feature_api_get() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions:any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let res = await fetch(`${baseUrl}${api.features}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        // set_input({...input, feature_list : result.data});

        return result.data;
      })
      .catch(error => console.log('error', error));
    return res;
  }
  // api function

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
      let res = await package_api();
      console.log(res);
      res = Object.values(res)[0];
      console.log(res);
      // logic
      let row = res.map((d:any,i:number)=>{
        return {  id: i+1,
                  db_id:d.id,
                  name: d.name, 
                  title: d.title,
                  description: d.description,
                  selfsubs: d.self_subscribe,
                  staffsubs: d.staff_subscribe,
                  validfrom:d.valid_from,
                  validto:d.valid_to,
                  status:d.status,
                  };
      });
      console.log(row);
      set_row(row);
    }

    let res = call();
  },[]);

  useEffect(()=>{
    if(key==='create_package'){
      console.log(input);
      package_api_create();
    }
  },[toggle]);

  return (
    <div className='flex-1 flex flex-col bg-slate-300'>
        <div className='flex-1 relative'>
              <div className='flex justify-center font-semibold'>
                    Package Management
              </div>
              <div className='absolute bottom-0 left-4'>
                    {/* modal add record */}
                    {/* <div>
                      <Button className='normal-case' onClick={handleOpen}>Add Record</Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style} className='bg-black'>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Record
                          </Typography>
                          {Array(8).fill(0).map((_,i:number)=>{
                            return (i===3 || i===4? 
                              <FormControl key={i} style={{marginTop:4,marginBottom:4}} fullWidth>
                                <InputLabel id="demo-simple-select-label">{i===3? "Self-Subscribe" : "Staff-Subscribe"}</InputLabel>
                                <Select
                                  labelId={i===3? "Self-Subscribe" : "Staff-Subscribe"}
                                  id={i===3? "Self-Subscribe" : "Staff-Subscribe"}
                            
                                  label={i===3? "Self-Subscribe" : "Staff-Subscribe"}
                                  onChange={(e:any)=>{
                                    let temp = [...input.add];
                                    temp[i] = e.target.value;
                                    set_input({...input,add:temp});

                                    set_key(true);
                                    set_toggle(!toggle);
                                  }}
                                >
                                  <MenuItem ></MenuItem>
                                  <MenuItem value='yes'>Yes</MenuItem>
                                  <MenuItem value='no'>No</MenuItem>
                                </Select>
                              </FormControl>
                              :
                              <TextField  key={i} 
                              onChange={(e)=>{
                                let temp = [...input.add];
                                if(i===0){
                                  temp[0]=e.target.value;
                                }
                                if(i===1){
                                  temp[1]=e.target.value;
                                }
                                if(i===2){
                                  temp[2]=e.target.value;
                                }
                                if(i===3){
                                  temp[3]=e.target.value;
                                }
                               
                                set_input({...input,add:temp})
                              }} 
                              
                              label={(i===0 && "Name") || (i===1 && "Title") || (i===2 && "Description")} style={{marginTop:4,marginBottom:4}}  variant="outlined" />
                            );
                          })}
                          <Button 
                          onClick={()=>{create_api();}} 
                          className='normal-case mr-4 relative top-5' variant="text">Save Record</Button>
                        </Box>
                      </Modal>
                    </div> */}

                    <Add
                    handleOpen={handleOpen}
                    open={open}
                    handleClose={handleClose}
                    style={style}
                    input={input}
                    set_input={set_input}
                    set_key={set_key}
                    set_toggle={set_toggle}
                    toggle={toggle}
       
                    />
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
              components={{
                Toolbar: GridToolbar,
              }}
              
        />
        </div>
    </div>
  )
}

export default Package