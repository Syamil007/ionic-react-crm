import { IonTitle, IonToolbar } from '@ionic/react'
import MenuIcon from '@mui/icons-material/Menu'
import Edit from '@mui/icons-material/Edit'
import { Box, Button, Divider, Drawer, IconButton, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Billing from './Dashboard/Billing'
import Customer from './Dashboard/Customer'
import Feature from './Dashboard/Feature'
import Package from './Dashboard/Package'
import Payment from './Dashboard/Payment'
import Payment_method from './Dashboard/Payment_method'
import Sales from './Dashboard/Sales'
import Subscription from './Dashboard/Subscription'
import { useHistory, useLocation } from 'react-router'

type Anchor = 'top' | 'left' | 'bottom' | 'right';

function Header() {

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
                  <ListItemButton onClick={()=>{history.push(text.path);}} selected = { path === text.path }>
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
    <div className='tool'>
            <IonToolbar>
                        <div className='w-full h-full flex'>
                            <div>               
                                  <IconButton style={{marginLeft:'16px'}} color="primary" onClick={toggleDrawer('left', true)} >
                                              <MenuIcon />
                                  </IconButton>
                                  <Drawer
                                    anchor={'left'}
                                    open={state['left']}
                                    onClose={toggleDrawer('left', false)}
                                  >
                                    {list('left')}
                                  </Drawer>
                            </div>
                            <IonTitle>CRM</IonTitle>
                            <IconButton style={{marginRight:'16px'}} color="primary" aria-label="upload picture" component="label">
                                        <Edit />
                            </IconButton>
                        </div>
            </IonToolbar>
    </div>
  )
}

export default Header