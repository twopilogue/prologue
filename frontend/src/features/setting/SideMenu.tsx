import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MyBlogInfoInput from "./MyBlogInfoInput";
import MyInfoInput from "./MyInfoInput";
import { TabPanel } from "./TabMenu";

const SideMenu = () => {
  const [value, setValue] = React.useState(0);

  const a11yProps = (index: number) => {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="레이아웃 선택" {...a11yProps(0)} />
        <Tab label="세부 레이아웃 설정" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <MyInfoInput />
        <MyBlogInfoInput />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Box>
  );
};

export default SideMenu;
