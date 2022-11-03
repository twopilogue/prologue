import React from "react";
import { styled } from "@mui/material/styles";
import palette from "../../styles/colorPalette";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem } from "@mui/material";

const SelectInput = () => {
  const [site, setSite] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setSite(event.target.value);
  };
  return (
    <div>
      <FormControl sx={{ width: "100%", height: "100%" }}>
        <Select
          size="small"
          id="demo-select-small"
          onChange={handleChange}
          placeholder="사이트를 선택"
          value={site}
        >
          <MenuItem disabled value="">
            <em>사이트를 선택하세요.</em>
          </MenuItem>
          <MenuItem value={"github"}>Github</MenuItem>
          <MenuItem value={"instagram"}>Instagram</MenuItem>
          <MenuItem value={"twitter"}>Twitter</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectInput;
