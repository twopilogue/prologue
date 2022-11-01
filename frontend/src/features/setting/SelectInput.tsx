import React from "react";
import { styled } from "@mui/material/styles";
import palette from "../../components/styles/colorPalette";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem } from "@mui/material";

const SelectInput = () => {
  const [age, setAge] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <Select id="demo-select-small" value={age} onChange={handleChange}>
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
