import { Button } from '@mui/material'
import React, { useState } from 'react'
import baseUrl, { api } from '../../Urls';

function Update_pay_method({row}:any) {

  const [info,set_info]=useState<any>(JSON.parse(localStorage.getItem('token') as any)); //if no token, info= null

  return (
    <Button variant='contained'>Add</Button>
  )
}

export default Update_pay_method