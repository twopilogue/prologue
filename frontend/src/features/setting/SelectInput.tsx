import React, { Dispatch, SetStateAction, useState } from "react";
import { styled } from "@mui/material/styles";
import palette from "../../styles/colorPalette";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { linkConfig } from "./myinfo/MyBlogInfoInput";

interface Props {
  link: linkConfig;
  setLink: Dispatch<SetStateAction<linkConfig>>;
}

const SelectInput = ({ link, setLink }: Props) => {
  const handleChange = (e: SelectChangeEvent) => {
    setLink({
      site: e.target.value,
      url: "",
    });
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <Select
          displayEmpty
          size="small"
          id="demo-select-small"
          onChange={handleChange}
          placeholder="사이트를 선택"
          value={link.site}
        >
          <MenuItem disabled value="">
            <em>사이트 선택</em>
          </MenuItem>
          <MenuItem value={"github"}>Github</MenuItem>
          <MenuItem value={"email"}>Email</MenuItem>
          <MenuItem value={"instagram"}>Instagram</MenuItem>
          <MenuItem value={"twitter"}>Twitter</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectInput;
