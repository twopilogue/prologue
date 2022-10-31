import * as React from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import palette from "./styles/colorPalette";

const SwitchButton = styled(Switch)(({ theme }) => ({
  width: 32,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(15px)",
      color: "#f3ebfb",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor:
          theme.palette.mode === "dark" ? palette.blue_3 : palette.blue_4,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

interface Props {
  label: string;
  name: string;
  checked: boolean;
  disabled?: boolean;
  onChange:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
}

SwitchWithLabel.defaultProps = {
  label: "text",
  name: "radio",
  checked: false,
  onChange: undefined,
};

function SwitchWithLabel({ label, ...rest }: Props) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <SwitchButton
        color="info"
        inputProps={{ "aria-label": "ant design" }}
        {...rest}
      />
      <Typography>{label}</Typography>
    </Stack>
  );
}

export default SwitchWithLabel;
