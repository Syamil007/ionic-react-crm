import { IonButton } from '@ionic/react'
import React from 'react'
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Product_Subscribed from './Product_Subscribed';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box  sx={{height:'100%',width:'100%'}}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}



function Main_bot_route() {

  const commonStyles = {
    bgcolor: 'background.paper',
    border: 1,
    m: 1,
    borderColor: 'text.primary',
    
  };

  const theme = useTheme();
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box className='router'>
      {/* <AppBar position="static" style={{display:'flex', backgroundColor:'transparent' }}> */}
        <Tabs
          style={{backgroundColor:''}}
          value={value as any}
          onChange={handleChange}
          indicatorColor="secondary"
          TabIndicatorProps={{
            style: {
              backgroundColor: "transparent"
            }
          }}
          textColor="inherit"
          variant="standard"
          aria-label="full width tabs example"
        >
          
              <Tab className={value===0? "select" : ""} sx={{ ...commonStyles,borderBottom: 0, m: 0, mr: "4px",ml:'4px', color: '#000000',width:'120px',height:'50px',textTransform:'none'}}  label="Product Subscribed" {...a11yProps(0)} />
              <Tab className={value===1? "select" : ""} sx={{ ...commonStyles,borderBottom: 0, m: 0, mr: "4px", color: '#000000',width:'120px',height:'50px',textTransform:'none'}} label="Payment Details" {...a11yProps(1)} />
              <Tab className={value===2? "select" : ""} sx={{ ...commonStyles,borderBottom: 0, m: 0, mr: "4px", color: '#000000',width:'120px',height:'50px',textTransform:'none'}} label="Outstanding Payment" {...a11yProps(2)} />
              <Tab className={value===3? "select" : ""} sx={{ ...commonStyles,borderBottom: 0, m: 0, mr: "4px", color: '#000000',width:'120px',height:'50px',textTransform:'none'}} label="Training Attended" {...a11yProps(3)} />
   
        </Tabs>
      {/* </AppBar> */}
        <div style={{height:'100%'}}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Product_Subscribed/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Box className='content'>2</Box>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Box className='content'>3</Box>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Box className='content'>4</Box>
        </TabPanel>
        </div>
    </Box>

  )
}

export default Main_bot_route