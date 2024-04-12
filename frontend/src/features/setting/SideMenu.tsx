import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";

import { TabPanel } from "./TabMenu";
import { SyntheticEvent, useState } from "react";

interface TabConfig {
  label: string;
  Component: JSX.Element;
}

interface Props {
  tabs: TabConfig[];
}

const SideMenu = ({ tabs }: Props) => {
  const [value, setValue] = useState(0);

  const a11yProps = (index: number) => {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
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
        {tabs.map((tab: TabConfig, i: number) => (
          <Tab label={tab.label} key={i} {...a11yProps(i)} />
        ))}
      </Tabs>
      {tabs.map((tab: TabConfig, i: number) => (
        <TabPanel value={value} index={i} key={i}>
          <div style={{ margin: "50px" }}>{tab.Component}</div>
        </TabPanel>
      ))}
    </Box>
  );
};

export default SideMenu;
