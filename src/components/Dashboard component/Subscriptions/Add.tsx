import { Button, Modal, Box, Typography, useFormControl, TextField, InputLabel, MenuItem, Select, FormControl, Stack, Alert, Portal, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import baseUrl, { api } from '../../Urls';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

function Create_subs({module,row}:any) {
  
  const [info,set_info]=useState<any>(JSON.parse(localStorage.getItem('token') as any)); //if no token, info= null

  const [key, set_key] = useState<any>(false); //false for initial useeffect call only, then never set it to false again
  const [toggle, set_toggle] = useState<any>(false);

  //useform
  const [input_subs, set_input_subs] = useState<any>({
    create: {},
    create_respon: "",
    create_snackbar: false,
  });

  
  const [fields, set_fields] = useState<any>(module==="customer"? 
  {
    package_id: {
      name: "package_id",
      select: true,
      selection: "",
    },
    tenure_id: {
      name: "tenure_id",
      select: true,
      selection: "",
    },
    subscribed_price: {
      name: "subscribed_price",
      select: false,
      selection: "",
    },
    rebate: {
      name: "rebate",
      select: false,
      selection: "",
    },
    start_date: {
      name: "start_date",
      select: 'date',
      selection: "",
    },
    billing_interval: {
      name: "billing_interval",
      select: true,
      selection: [{
        value:"F",
        name:"Billing Interval Full"
      },
      {
        value:"Y",
        name:"Billing Interval Year"
      },
      {
        value:"I",
        name:"Billing Interval Interim"
      },
      {
        value:"Q",
        name:"Billing Interval Quarter"
      },
      {
        value:"M",
        name:"Billing Interval Month"
      },
      ],
    },
    
  }

  :

  {
    renew: {
      name: "renew",
      select: true,
      selection: [ {
        value:true,
        name:"True"
      },
      {
        value:false,
        name:"False"
      },],
    },
    package_id: {
      name: "package_id",
      select: true,
      selection: "",
    },
    tenure_id: {
      name: "tenure_id",
      select: true,
      selection: "",
    },
    customer_id: {
      name: "customer_id",
      select: true,
      selection: "",
    },
    subscribed_price: {
      name: "subscribed_price",
      select: false,
      selection: "",
    },
    rebate: {
      name: "rebate",
      select: false,
      selection: "",
    },
    start_date: {
      name: "start_date",
      select: 'date',
      selection: "",
    },
    billing_interval: {
      name: "billing_interval",
      select: true,
      selection: [{
        value:"F",
        name:"Billing Interval Full"
      },
      {
        value:"Y",
        name:"Billing Interval Year"
      },
      {
        value:"I",
        name:"Billing Interval Interim"
      },
      {
        value:"Q",
        name:"Billing Interval Quarter"
      },
      {
        value:"M",
        name:"Billing Interval Month"
      },
      ],
    },
    
  });
  

  const schema = yup.object().shape(module==="customer"?
  {
    
    package_id: yup.number().typeError('Package is required').required('Package is required'),
    tenure_id: yup.number().typeError('Tenure is required').required('Tenure is required'),
    
    subscribed_price: yup.number().typeError('Price is required').required('Price is required'),
    rebate:yup.number().typeError('Rebate is required').required('Rebate is required'),
    start_date:yup.string().required('Start Date is required'),
    billing_interval:yup.string().required('Billing Interval is required'),
}
  :
  {
    renew: yup.boolean().typeError('Renew field is required').required("Renew field is required"),
    package_id: yup.number().typeError('Package is required').required('Package is required'),
    tenure_id: yup.number().typeError('Tenure is required').required('Tenure is required'),
    customer_id:yup.number().typeError('Customer is required').required('Customer is required'),
    subscribed_price: yup.number().typeError('Price is required').required('Price is required'),
    rebate:yup.number().typeError('Rebate is required').required('Rebate is required'),
    start_date:yup.string().required('Start Date is required'),
    billing_interval:yup.string().required('Billing Interval is required'),
});

  const {register,reset,watch, handleSubmit,control, formState:{errors}} = useForm({
    resolver: yupResolver(schema),
     
  });

  function onSubmit(data: any) {
    console.log({...data,start_date:dayjs(data.start_date).format('YYYY-MM-DD')});

    set_input_subs({...input_subs,create:{...data,start_date:dayjs(data.start_date).format('YYYY-MM-DD')}});

    set_key("create_subs");
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
    height: 600,
    bgcolor: "background.paper",
    //  border: '2px solid #000',
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
  };
  // modal state

  //api function
  //get selection 
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
      .then(result => result.data)
      .catch(error => console.log('error', error));
      return res;
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
        

        return result.data;
      })
      .catch(error => console.log('error', error));
    return res;
  }
  async function customer_api() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var requestOptions:any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let res = await fetch(`${baseUrl}${api.customer}`, requestOptions)
      .then(response => response.json())
      .then(result => (result.data))
      .catch(error => console.log('error', error));
    return res;
  }
  //create
  function sub_create() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${info.token}`);

    var raw = JSON.stringify({
      renew: module==="customer"? false : input_subs.create.renew,
      package_id: input_subs.create.package_id,
      tenure_id: input_subs.create.tenure_id,
      customer_id: module==="customer"? row[0][1] : input_subs.create.customer_id,
      subscribed_price: input_subs.create.subscribed_price,
      rebate: input_subs.create.rebate,
      start_date:input_subs.create.start_date,
      billing_interval: input_subs.create.billing_interval,
    });

    var requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}${api.subscription}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        
        if(result?.id){
          set_input_subs({...input_subs,create_respon:result,create_snackbar:true});
          setOpen(false);

          return console.log(result);
        }
        else{
          set_input_subs({...input_subs,create_respon:result,create_snackbar:true});
          console.log("api error");
          return console.log(result);
        }
      })
      .catch((error) => console.log("error", error));
  }
  //api function

  //get selection
  useEffect(()=>{

    async function get() {
      let packages = await package_api();
      let tenure = await tenure_api_get();
      let customer = await customer_api();

      set_fields({...fields,
                  package_id:{...fields.package_id,selection:packages},
                  tenure_id:{...fields.tenure_id,selection:tenure},
                  customer_id:{...fields.customer_id,selection:customer},
                });

    }

    get();

  },[]);
  //default value
  useEffect(() => {
    let defaultValues = {
      start_date:  dayjs(),
      package_id:'',
      tenure_id:'',
      customer_id:'',
      billing_interval:''
    };
    reset({ ...defaultValues });
  
  }, []);
  //create subs
  useEffect(()=>{
    if(key==="create_subs"){
      sub_create();
    }
  },[toggle]); 
  
  return (
    <div className='mt-4'>
       <Portal>
        <Snackbar
          open={input_subs.create_snackbar}
          autoHideDuration={6000}
          onClose={() => {
            set_input_subs({
              ...input_subs,
              create_snackbar: false,
            });
          }}
        >
          <Alert
            onClose={() => {
              set_input_subs({
                ...input_subs,
                create_snackbar: false,
              });
            }}
            severity={input_subs.create_respon.message ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {input_subs?.create_respon?.message
              ? input_subs.create_respon.message
              : "Succesfully create Subscription!"}
          </Alert>
        </Snackbar>
      </Portal>
    <Button className='normal-case' 
    onClick={handleOpen}
    variant="contained"
    >Create Subscription</Button>
    {open && <Modal
      open={open}
      onClose={handleClose}
      keepMounted={false}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className='bg-black'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Subscription
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                    {/* {Object.keys(field).map((obj:any,i:number)=>{
                      
                        return (obj==='renew' || 
                                obj=== 'package_id' || 
                                obj==='tenure_id' ||
                                obj==='customer_id' ||
                                obj==='billing_interval'?

                                <React.Fragment key={i}>
                                <FormControl size='small' key={obj} fullWidth>
                                          <InputLabel style={{textTransform:'capitalize'}} id="demo-simple-select-label">{`${obj.replace('_',' ')}`}</InputLabel>
                                          <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label={`${obj.replace('_',' ')}`}
                                            value={watch(obj) || ''}
                                            {...register(obj)}
                                            
                                          >
                                            <MenuItem value=''>{'Select field'}</MenuItem>
                                            {obj==='renew'? 

                                            Array(2).fill(0).map((_,renew:number)=>(
                                              <MenuItem key={renew+20} value={renew===0? 'true' : 'false'}>{renew===0? 'True' : 'False'}</MenuItem>
                                            ))
                                            
                                            :
                                            obj==='package_id'?
                                            Array.isArray(input_subs?.package_id) &&
                                            input_subs.package_id.map((pack:any,pack_i:number)=>(
                                              <MenuItem key={pack.title+`${pack_i}`} value={pack.id}>{pack.title}</MenuItem>
                                            ))
                                            :
                                            obj==='tenure_id'?
                                            Array.isArray(input_subs?.tenure_id) &&
                                            input_subs.tenure_id.map((tenure:any,tenur_i:number)=>(
                                              <MenuItem key={tenure.duration+`${tenur_i}`} value={tenure.id}>{`${tenure.duration[1]} ${tenure.duration[2]==='D'? 'Day' : tenure.duration[2]==='W'? "Week" : tenure.duration[2]==='M'? 'Month' : tenure.duration[2]==='Y'? "Year" : '' }${tenure.duration[1]>1? 's' : ''}`}</MenuItem>
                                            ))
                                            :
                                            obj==='customer_id'?
                                            Array.isArray(input_subs?.customer_id) &&
                                            input_subs.customer_id.map((cust:any,cust_i:number)=>(
                                              <MenuItem key={cust.name+`${cust_i}`} value={cust.id}>{cust.name}</MenuItem>
                                            ))
                                            :

                                            Array(5).fill(0).map((_,bill:number)=>(
                                              <MenuItem key={`${bill}bill`} value={ bill===0? 'F' :
                                                                bill===1? 'Y' :
                                                                bill===2? 'I' :
                                                                bill===3? 'Q' :
                                                                 'M' }>{bill===0? 'Billing Interval Full' :
                                                                        bill===1? 'Billing Interval Year' :
                                                                        bill===2? 'Billing Interval Interim' :
                                                                        bill===3? 'Billing Interval Quarter' :
                                                                        'Billing Interval Month'}</MenuItem>
                                            ))
                                           
                                            }
                                          </Select>
                                </FormControl>
                                <p style={{height:32,color:'red'}}>{String(errors[obj]?.message? errors[obj]?.message : '' )}</p>
                                </React.Fragment>
                                :
                                obj==='start_date'?
                                
                                <React.Fragment key={i}>
                                <Controller
                                key={obj}
                                control={control}
                                name="start_date"
                                render={({ field: { onChange, onBlur, value, ref } }) => 
                                {
                                return (
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <Stack spacing={3}>
                                        <DesktopDatePicker
                                          
                                          label={`S${obj.replace('_',' ').slice(1,obj.replace('_',' ').length)}`}
                                          inputFormat="MM/DD/YYYY"
                                          onChange={(value)=>{onChange(value);console.log(value);}} 
                                          value={value || ''}
                                          renderInput={(params) => <TextField size='small' {...params} 
                                          />}
                                        />
                                      </Stack>
                                    </LocalizationProvider>
                              
                                )}}
                              />
                              <p style={{height:32,color:'red'}}>{String(errors[obj]?.message? errors[obj]?.message : '' )}</p>
                              </React.Fragment>
                               
                                :
                                <React.Fragment key={i}>
                                <TextField style={{textTransform:'capitalize'}} size='small' label={`${obj.replace('_',' ')}`} type='number' placeholder={`${obj.replace('_',' ')}`} {...register(obj)} variant="outlined" />
                                <p style={{height:32,color:'red'}}>{String(errors[obj]?.message? errors[obj]?.message : '' )}</p>
                                </React.Fragment>
                      );
                    })} */}

                    {Object.keys(fields).map((obj:any,i:number)=>{
                      return (
                       

                        fields[obj].select===false?

                        <React.Fragment key={obj}>
                          <TextField
                            style={{textTransform:'capitalize'}}
                            type={"text"}
                            label={obj.replaceAll('_',' ')}
                            variant="outlined"
                            size="small"
                            {...register(obj)}
                          />
                          <p style={{ height: 32, color: "red" }}>
                            {String(errors[obj]?.message ? errors[obj]?.message : "")}
                          </p>
                        </React.Fragment>
                        :
                        fields[obj].select==='date'?
                        
                        <React.Fragment key={obj}>
                        <Controller
                        control={control}
                        name={obj}
                        render={({ field: { onChange, onBlur, value, ref } }) => 
                        {
                        return (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <Stack spacing={3}>
                                <DesktopDatePicker
                                  label={obj.replace('_',' ')}
                                  inputFormat="MM/DD/YYYY"
                                  onChange={(value)=>{onChange(value);console.log(value);}} 
                                  value={value || ''}
                                  renderInput={(params) => <TextField size='small' style={{textTransform:'capitalize'}} {...params} 
                                  />}
                                />
                              </Stack>
                            </LocalizationProvider>
                      
                        )}}
                      />
                      <p style={{height:32,color:'red'}}>{String(errors[obj]?.message? errors[obj]?.message : '' )}</p>
                      </React.Fragment>
                        :
                        fields[obj].select===true?

                        <React.Fragment key={obj}>
                        <FormControl size='small' fullWidth>
                                  <InputLabel style={{textTransform:'capitalize'}} id="demo-simple-select-label">{`${obj.replace('_',' ')}`}</InputLabel>
                                  <Select
                                    label={`${obj.replace('_',' ')}`}
                                    value={watch(obj)}
                                    {...register(obj)}
                                  >
                                    <MenuItem value=''>{'Select field'}</MenuItem>
                                    {fields[obj].selection!==undefined && fields[obj].selection.map((item:any,row:number)=>{
                                      return (obj==="renew"?
                                      <MenuItem key={item.name} value={item.value}>{item.name}</MenuItem>
                                      :
                                      obj==="package_id"?
                                      <MenuItem key={item.name} value={item.id}>{item.name}</MenuItem>
                                      :
                                      obj==="tenure_id"?
                                      <MenuItem key={item.duration} value={item.id}>{`${item.duration[1]} ${item.duration[2]==='D'? "Day" : item.duration[2]==='W'? "Week" : item.duration[2]==='M'? "Month" : item.duration[2]==='Y'? "Year" : ""}${Number(item.duration[1])>=2? "s" : ""}`}</MenuItem>
                                      :
                                      obj==="customer_id"?
                                      <MenuItem key={item.name} value={item.id}>{item.name}</MenuItem>
                                      :
                                      obj==="billing_interval"?
                                      <MenuItem key={item.name} value={item.value}>{item.name}</MenuItem>
                                      :
                                      ""
                                      );
                                    })}
                                  </Select>
                        </FormControl>
                        <p style={{height:32,color:'red'}}>{String(errors[obj]?.message? errors[obj]?.message : '' )}</p>
                        </React.Fragment>

                        :

                        ""
                      );

                    })}
                    
                    <TextField size='small' type='submit'/>
                    
            </form>
        
      </Box>
    </Modal>}
  </div>
  )
}

export default Create_subs