import React from "react";
import Box from "@mui/material/Box";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Product_Subscribed from "../components/Product_Subscribed";
import Payment_detail from "../components/Payment_detail";
import Outstanding_payment from "../components/Outstanding_payment";
import Training_attendend from "../components/Training_attendend";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { Avatar, IconButton } from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import Header from "../components/Header";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography component={"span"} variant={"body2"}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Customer_profile() {
  // tab information

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log(value);

  return (
    <div className="flex flex-col h-full w-full overflow-auto">
      <Header />
      <div className="flex w-full h-5/6 bg-white">
        <div className="border-2 flex-[2_0_0%] border-inherit  rounded-lg flex flex-col items-center text-black">
          <Avatar
            style={{ width: "100px", height: "100px", marginTop: "8px" }}
            alt="Travis Howard"
            src="/static/images/avatar/2.jpg"
          />
          <div>name</div>
          <div>customer</div>
          <div className="absolute left-46 top-56 ">labels</div>
        </div>
        <div className="border-2 flex-[3_0_0%] border-inherit overflow-auto rounded-lg text-black">
          <div className="pl-2 pt-1">
            <div>Name</div>
            <div className="font-semibold ">Teh Boon Hong</div>
          </div>
          <div className="pl-2 pt-1 ">
            <div>Facebook Name</div>
            <div className="font-semibold">Teh Boon </div>
          </div>
          <div className="pl-2 pt-1">
            <div>Email</div>
            <div className="font-semibold">teh@gmail.com</div>
          </div>
          <div className="pl-2 pt-1">
            <div>Contact Number</div>
            <div className="font-semibold">019-7656789</div>
          </div>
          <div className="pl-2 pt-1">
            <div>Location</div>
            <div className="font-semibold">Selangor, Malaysia</div>
          </div>
        </div>
        <div className="border-2 flex-[3_0_0%] border-inherit rounded-lg text-black">
          <div className="pl-2 pt-1">
            <div>Joined Date</div>
            <div className="font-semibold">20/08/21 </div>
          </div>
          <div className="pl-2 pt-1">
            <div>Rejoined Period</div>
            <div className="font-semibold">2 Years </div>
          </div>
          <div className="pl-2 pt-1">
            <div>Rejoined Status</div>
            <div className="font-semibold">3</div>
          </div>
        </div>
      </div>
      <div className="flex w-full h-3/5 bg-white">
        <div className="border-2 border-inherit bg-white h-full w-1/4 rounded-lg"></div>
        <div className="border-2 bg-white border-inherit h-full w-3/4 flex flex-col justify-end rounded-lg">
          <div id="nav" className="border-2 border-inherit w-full rounded-lg">
            <Tabs
              className="w-full h-full"
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                className={value == 0 ? "select" : ""}
                style={{ textTransform: "none" }}
                label="Product Subscribe"
                {...a11yProps(0)}
              />
              <Tab
                className={value == 1 ? "select" : ""}
                style={{ textTransform: "none" }}
                label="Payment Details"
                {...a11yProps(1)}
              />
              <Tab
                className={value == 2 ? "select" : ""}
                style={{ textTransform: "none" }}
                label="Outstanding Payment"
                {...a11yProps(2)}
              />
              <Tab
                className={value == 3 ? "select" : ""}
                style={{ textTransform: "none" }}
                label="Training Attendend"
                {...a11yProps(3)}
              />
            </Tabs>
          </div>
          <div className="border-2 border-inherit h-5/6 w-full overflow-scroll rounded-lg">
            <TabPanel value={value} index={0}>
              <Product_Subscribed />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Payment_detail />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Outstanding_payment />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Training_attendend />
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer_profile;
