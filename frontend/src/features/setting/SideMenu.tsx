import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import React from "react";
import { TabPanel, TabPanelProps } from "./TabMenu";

const SideMenu = ({ tabs }: any) => {
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
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", width: "300px" }}
      >
        {tabs.map(({ label }: any, i: number) => (
          <Tab label={label} key={i} {...a11yProps(i)} />
        ))}
      </Tabs>
      {tabs.map(({ Component }: any, i: number) => (
        <TabPanel value={value} index={i} key={i}>
          <div style={{ margin: "50px" }}>{Component}</div>
        </TabPanel>
      ))}
    </Box>
  );
};

export default SideMenu;
