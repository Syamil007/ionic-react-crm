import { Button, Modal, Box, Typography, FormControl, InputLabel, Select, MenuItem, TextField, SelectChangeEvent, Checkbox, ListItemText, OutlinedInput, FilledInput, InputAdornment, IconButton, FormControlLabel } from '@mui/material';
import React from 'react'
import AddShoppingCartIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

function Add({handleOpen,open,handleClose,style,input,set_input,set_key,set_toggle,toggle}:any) {

  return (
    <div>
    <Button className='normal-case' onClick={handleOpen}>Add Record</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className='bg-black hide-scroll'>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Record
        </Typography>
        {/* input */}
        {Object.keys(input?.add).map((key:any,i:number)=>{
          return (
            key==='tenures'
            ?

            input.add_tenure.map((ten:any,tenure_i:number)=>(
              <div key={"tenure"+tenure_i} style={{display:"grid", gridTemplate: '100% / 45% 45% 10%'}}>
                  <FormControl 
                  size='small' 
                  key={key} 
                  style={{
                        marginTop:4,
                        marginBottom:4, 
                        gridArea:'1/1/2/2',
                        position:'relative',
                        top: '10px'
                      
                      }}>
                    <InputLabel id={key} style={{textTransform:'capitalize'}}>{key}</InputLabel>
                    <Select
                      labelId={key}
                      id={key}
            
                      label={key}
                      onChange={(e:any)=>{
                          let temp;
                        if(key==='tenures'){
                          let temp2 = input.add.tenures;
                          temp2[tenure_i] = {...input.add.tenures[tenure_i],id: e.target.value}
                          temp = {...input.add, [key]: [{id: e.target.value, price:"Rm10"}]};
                          set_input({...input,add: {...input.add, tenures: temp2}});
                        }
                        if(key==='features'){
                          temp = {...input.add, [key]: [{id: e.target.value,}]};
                          set_input({...input,add:temp});
                        }
                      
                        
                      }}
                    >
                      <MenuItem >{' '}</MenuItem>
                      {key==='tenures'? 

                        Array.isArray(input?.tenure_list) && 
                        input?.tenure_list.map((tenure:any,i:number)=>
                        (
                        <MenuItem key={tenure.duration} value={tenure.id}>{`${tenure.duration[1]} ${tenure.duration[2]==='D'? 'Day' : tenure.duration[2]==='W'? "Week" : tenure.duration[2]==='M'? 'Month' : tenure.duration[2]==='Y'? "Year" : '' }${tenure.duration[1]>1? 's' : ''}`}</MenuItem>
                        ))

                        :
                        
                        Array.isArray(input?.feature_list) && 
                        input?.feature_list.map((feature:any,i:number)=>
                        (
                        <MenuItem key={feature.name} value={feature.id}>{feature.title}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                  <FormControl size='small' sx={{ margin: 1,gridArea:'1/2/2/3'}} variant="filled">
                      <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
                      <FilledInput
                        id="filled-adornment-amount"
                        onChange={(e)=>{
                                 
                                  if(key==='tenures'){
                                    let temp2 = input.add.tenures;
                                    temp2[tenure_i] = {...input.add.tenures[tenure_i],price: e.target.value};
                                    
                                    set_input({...input,add: {...input.add, tenures: temp2}});
                                  }
                        }}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      />
                  </FormControl>
                  {tenure_i===0 && <IconButton color="primary" 
                              style={{height:'50px',
                                      width:'50px',
                                      position:'relative',
                                      top: '50%',
                                      left:'50%',
                                      transform: 'translate(-50%, -50%)',}} 
                              aria-label="add to shopping cart"
                              onClick={()=>{
                                let temp = [...input.add_tenure,tenure_i];
                                set_input({...input,add_tenure:temp});
                              }}>
                              <AddShoppingCartIcon  />
                  </IconButton>}
                  {tenure_i===1 && <IconButton color="primary" 
                              style={{height:'50px',
                                      width:'50px',
                                      position:'relative',
                                      top: '50%',
                                      left:'50%',
                                      transform: 'translate(-50%, -50%)',}} 
                              aria-label="add to shopping cart"
                              onClick={()=>{
                                let temp = [...input.add_tenure];
                                let temp2 = [...input.add.tenures];
                                temp2.splice(temp2.length-1,1);
                                temp.splice(temp.length-1,1);
                                set_input({...input,add_tenure:temp,add: {...input.add,tenures: temp2}});
                              }}>
                              <DeleteIcon style={{color:'red'}} />
                  </IconButton>}
              </div>
            ))
            

            :

            key==='features'?
            
            input.add_feature.map((feature:any,feature_i:number)=>(
              <div key={"feature"+feature_i} style={{display:"grid", gridTemplate: '100% / 90% 10%'}}>
              <FormControl 
              size='small' 
              key={`${i}${feature_i}`} 
              style={{
                    marginTop:4,
                    marginBottom:4, 
                    gridArea:'1/1/2/2',
                    position:'relative',
                    top: '10px'
                  
                  }}>
                <InputLabel id={`${i}${feature_i}`} style={{textTransform:'capitalize'}}>{key}</InputLabel>
                <Select
                  labelId={`${i}${feature_i}`}
                  id={`${i}${feature_i}`}
        
                  label={key}
                  onChange={(e:any)=>{
                      let temp;
                    if(key==='features'){
                      temp = input.add.features;
                      temp[feature_i]={id:e.target.value};
                      set_input({...input,add:{...input.add,features: temp}});
                    }
                  
                    
                  }}
                >
                  <MenuItem >{' '}</MenuItem>
                  {
                    Array.isArray(input?.feature_list) && 
                    input?.feature_list.map((feature:any,i:number)=>
                    (
                    <MenuItem key={feature.name} value={feature.id}>{feature.title}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              <IconButton color="primary" 
                          style={{height:'50px',
                                  width:'50px',
                                  position:'relative',
                                  top: '70%',
                                  left:'50%',
                                  transform: 'translate(-50%, -50%)',}} 
                          aria-label="add to shopping cart"
                          onClick={()=>{
                            let temp = [...input.add_feature,feature_i];
                            set_input({...input,add_feature:temp});
                          }}>
                          <AddShoppingCartIcon  />
              </IconButton>
              </div>
            ))
            
            :

            key==='self_subscribe' ||
            key==='staff_subscribe'?

            <FormControlLabel
            
            style={{textTransform:'capitalize'}}
            key={key} 
            control={<Checkbox onClick={(e:any)=>{
                            console.log(e.target.checked);
                            set_input({...input,add:{...input.add,[key]:e.target.checked}});

                    }} />} 
            label={key.replace('_',' ')} />
            
            :
            
            key==='status'?

            <FormControl 
              size='small' 
              key={key} 
              style={{
            
                    marginTop:0,
                    marginBottom:4, 
                    gridArea:'1/1/2/2',
                    position:'relative',
                    top: '10px'
                  
                  }}>
                <InputLabel id={key}  style={{textTransform:'capitalize'}}>{key}</InputLabel>
                <Select
                  labelId={key} 
                  id={key} 
        
                  label={key}
                  onChange={(e:any)=>{
                      console.log(e.target.value);
                      set_input({...input,add:{...input.add,status: e.target.value}});
                    
                  }}
                >
                  <MenuItem >{' '}</MenuItem>
                  <MenuItem  value='SA'>{'Status Active'}</MenuItem>
                  <MenuItem  value='SS'>{'Status Suspended'}</MenuItem>
                  <MenuItem  value='SX'>{'Status Inactive'}</MenuItem>
                  
                </Select>
              </FormControl>
            
            :

            <TextField  key={key}
                        size='small'
                        onChange={(e)=>{

                          let temp = {...input.add, [key]: e.target.value};
                  
                          set_input({...input,add:temp});
                        }} 
            
                        label={key} 
                        style={{marginTop:4,marginBottom:4,textTransform:'capitalize'}}  
                        variant="outlined" />
          );
        })}
        <Button 
        onClick={()=>{
          set_key("create_package");
          set_toggle(!toggle);
         
          }} 
        style={{textTransform:'capitalize'}}
        className='normal-case mr-4 relative top-5 capitalize' 
        variant="text">Save Record</Button>
        
      </Box>
    </Modal>
  </div>
  )
}

export default Add