import { Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import Header from '../components/Header';
import MenuIcon from '@mui/icons-material/Menu'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {  Route, Router, useHistory,useLocation, Link } from 'react-router-dom';
import Feature from '../components/Dashboard/Feature';
import Package from '../components/Dashboard/Package';
import Customer from '../components/Dashboard/Customer';
import Subscription from '../components/Dashboard/Subscription';
import Payment_method from '../components/Dashboard/Payment_method';
import Billing from '../components/Dashboard/Billing';
import Payment from '../components/Dashboard/Payment';
import Sales from '../components/Dashboard/Sales';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

function Dashboard() {

  let history = useHistory();
  const location = useLocation();
  const path = location.pathname;

  const [state, setState] = React.useState({
    left: false,
  });

  const dashboard = [
    {
      text:'Feature',
      path:"/dashboard/feature",
      comp: (<Feature/>),
    },
    {
      text:'Package',
      path:"/dashboard/package",
      comp: (<Package/>),
    },
    {
      text:'Customer',
      path:"/dashboard/customer",
      comp: (<Customer/>),
    },
    {
      text:'Subscription',
      path:"/dashboard/subscription",
      comp: (<Subscription/>),
    },
    {
      text:'Payment Method',
      path:"/dashboard/payment_method",
      comp: (<Payment_method/>),
    },
    {
      text:'Billing',
      path:"/dashboard/billing",
      comp: (<Billing/>),
    },
    {
      text:'Payment',
      path:"/dashboard/payment",
      comp: (<Payment/>),
    },
    {
      text:'Sales',
      path:"/dashboard/sales",
      comp: (<Sales/>),
    },
  ];

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
        <List style={{ backgroundColor: ''}}>
          {dashboard.map((text, index) => (
            <ListItem 
                key={text.text} 
                disablePadding
                component={Link as any}
                to = {text.path}
                button
                selected = { path === text.path }>
                  <ListItemButton selected = { path === text.path }>
                              <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                              </ListItemIcon>
                              <ListItemText primary={text.text} />
                  </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
    </Box>
  );

  return (
    <div className='flex flex-col h-full w-full overflow-scroll hide-scroll'>
        <Header/>
        <div className='relative flex-1 bg-slate-500 flex'>

              <Button style={{position:'absolute',right:'16px', top:'16px'}} onClick={()=>{console.log('crm')}} variant="contained">CRM</Button>
              <IconButton style={{zIndex: '100',position: 'absolute', left:'16px', top:'-48px'}} color="primary" onClick={toggleDrawer('left', true)} >
                          <MenuIcon />
              </IconButton>
              <Drawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
              >
                {list('left')}
              </Drawer>

              {/* route */}
              {dashboard.map((comp:any,i:number)=>{
                return (
                  <Route key={comp.text} path={comp.path}>
                    {comp.comp}
                  </Route>
                );
              })
              }
        </div>
        
    </div>
  )
}

export default Dashboard