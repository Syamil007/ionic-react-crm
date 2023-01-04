import React, { useEffect, useState } from 'react'
import { DataGrid,MuiEvent, GridColDef, GridRowModel, GridRowModesModel, GridToolbar,  GridRowModes ,GridValueGetterParams, GridRowParams, GridEventListener, GridRowId } from '@mui/x-data-grid';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import baseUrl from './../Urls';
import {api} from './../Urls';


function Feature() {

  const [info,set_info]=useState<any>(JSON.parse(localStorage.getItem('token') as any)); //if no token, info= null
  // const [add,set_add] = useState<any>(true);
  const [input,set_input] = useState<any>({
    id:[''],
    add:[''],
    put:[''],
  });

  const [key,set_key] = useState<any>(false);
  const [toggle,set_toggle] = useState<any>(false);

  // add record related
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {setOpen(true);
                            let temp = [...input.add];
                            temp[0] = '';
                            temp[1] = '';
                            temp[2] = '';
                            temp[3] = '';
                            set_input({...input,add:temp})}
  const handleClose = () => {
    async function call() {
      let res = await feature_api();
      console.log(res);
      // logic
      res = Object.values(res)[0];
      console.log(res);
      let row = res.map((data:any,i:number)=>{
        return { id: i,db_id: data.id, name: data.name, title: data.title, ability: data.ability_name , status: data.status=== "SA"? "status active" : data.status=== "SS"? "status suspended" : data.status=== "SX" && "status inactive", date: new Date(data.created_at), isNew: false};
      });

      console.log(row);
      set_row(row);
    }

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
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
    display:'flex',
    flexDirection:'column',
  };
  // add record related

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const [rows,set_row]=useState<any>(
    [
      // { id: 1, name: 'Snow', expiry: 'Jon'},
     
    ]
  );

   //  datagrid
  //  column
   const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100, headerAlign: 'left', },
    { field: 'db_id', headerName: 'DB Id', width: 100, headerAlign: 'left', },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
      headerAlign: 'left',
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
                let url = '/view/'+JSON.stringify({id: params.row.db_id, module:'feature'});
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
      width: 300,
      editable: true,
      headerAlign: 'left',
    },
    {
      field: 'ability',
      headerName: 'Ability',
      width: 150,
      type: 'singleSelect',
      valueOptions: ["access-filters", "access-screener-2", "access-volumes","access-volumes-2"],
      editable: true,
      headerAlign: 'left',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      type: 'singleSelect',
      valueOptions: ["status active", "status suspended", "status inactive"],
      editable: true,
      headerAlign: 'left',
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 500,
      editable: false,
      headerAlign: 'left',
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 500,
      editable: false,
      headerAlign: 'left',
      renderCell: (params) => {
       
        return (
          <div className='w-100 d-flex justify-content-center'>
            <Button
              className='border-0'
              variant="outlined"
              size="small"
              style={{ marginLeft : 0 }}
              onClick={()=>{
                console.log(rowModesModel);
                setRowModesModel({ ...rowModesModel, [params.row.id]: { mode: GridRowModes.Edit } });

               
              }}
            >
              {'Edit'}
            </Button>
            <Button
              className='border-0'
              variant="outlined"
              size="small"
              style={{ marginLeft : 0 }}
              onClick={()=>{
                console.log(params.row.id);
                handleCancelClick(params.row.id);
              }}
            >
              {'Cancel'}
            </Button>
            <Button
              className='border-0'
              variant="outlined"
              size="small"
              style={{ marginLeft : 0 }}
              onClick={()=>{
                console.log(params.row.id);
                handleSaveClick(params.row.id);
              }}
            >
              {'save'}
            </Button>
          </div>)
        
      },
    },
   
  ];
  // column

  // handle function
  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>,
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    console.log(newRow);
    //put api
    set_input({
      ...input,
      put:[newRow.name,newRow.title,newRow.ability,newRow.status],
      id:[newRow.db_id]}); //name,title,ability,status and db_id
    
    set_key(true);
    set_toggle(!toggle);
    
    const updatedRow = { ...newRow, isNew: false };
    set_row(rows.map((row:any) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  function handleCancelClick(id: GridRowId) {
    console.log(id);
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row:any) => row.id === id);
    if (editedRow!.isNew) {                                     //for new add data
      set_row(rows.filter((row:any) => row.id !== id));
    }
  }

  function handleSaveClick(id: GridRowId) {
    console.log(id);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  }
  // handle function

  // api function
  async function feature_api() {
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
      .then(result => result)
      .catch(error => console.log('error', error));

    return res;
  }

  async function update_api() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var raw = JSON.stringify({
      "name": input.put[0],
      "title": input.put[1],
      "ability_name": input.put[2],
      "status": input.put[3]==="status active"? "SA" : input.put[3]==="status suspended"? "SS" : input.put[3]==="status inactive" && "SX",
    });

    var requestOptions:any = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${baseUrl}${api.features}/${input.id[0]}`, requestOptions)
      .then(response => response.status)
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  async function create_api() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var raw = JSON.stringify({
      "name": input.add[0],
      "title": input.add[1],
      "ability_name": input.add[2],
      "status": input.add[3]
    });

    var requestOptions:any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${baseUrl}${api.features}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.id){
          handleClose();
        }
        return console.log(result)
      })
      .catch(error => console.log('error', error));
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
      let res = await feature_api();
      console.log(res);
      // logic
      res = Object.values(res)[0];
      console.log(res);
      let row = res.map((data:any,i:number)=>{
        return { id: i,db_id: data.id, name: data.name, title: data.title, ability: data.ability_name , status: data.status=== "SA"? "status active" : data.status=== "SS"? "status suspended" : data.status=== "SX" && "status inactive", date: new Date(data.created_at), isNew: false};
      });

      console.log(row);
      set_row(row);
    }
    let res = call();
    console.log(res);
  },[]);

  useEffect(()=>{
    if(key){
      console.log(input);
      update_api();
    }
  },[toggle]);

  return (
    <div className='flex-1 flex flex-col bg-slate-300'>
        <div className='flex-1 relative'>
              <div className='flex justify-center font-semibold'>
                    Feature Management
              </div>
              <div className='absolute bottom-0 left-4'>
                
                    {/* modal add record */}
                    <div>
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
                          {Array(4).fill(0).map((_,i:number)=>{
                            return (i===3? 
                              <FormControl key={i} style={{marginTop:4,marginBottom:4}} fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                  labelId="Status"
                                  id="Status"
                            
                                  label="Status"
                                  onChange={(e:any)=>{
                                    let temp = [...input.add];
                                    temp[3] = e.target.value;
                                    set_input({...input,add:temp})
                                  }}
                                >
                                  <MenuItem ></MenuItem>
                                  <MenuItem value="SA">Status Active</MenuItem>
                                  <MenuItem value="SS">Status Suspended</MenuItem>
                                  <MenuItem value="SX">Status Inactive</MenuItem>
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
                              
                              label={(i===0 && "Name") || (i===1 && "Title") || (i===2 && "Ability") || (i===3 && "Status")} style={{marginTop:4,marginBottom:4}}  variant="outlined" />
                            );
                          })}
                          <Button onClick={()=>{create_api();}} className='normal-case mr-4 relative top-5' variant="text">Save Record</Button>
                        </Box>
                      </Modal>
                    </div>
                    {/* modal add record */}
              </div>
        </div>
        <div className='h-96'>
        <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              editMode="row"
              rowsPerPageOptions={[5]}
              checkboxSelection={true}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
              components={{
                Toolbar: GridToolbar,
              }}
              rowModesModel={rowModesModel}
              onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
              onRowEditStart={handleRowEditStart}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
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

export default Feature