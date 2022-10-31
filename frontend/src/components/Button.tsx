import React from "react";
import palette from "./styles/colorPalette";
import Button from "@mui/material/Button";

interface Props {
  label: string;
  color?: "blue" | "sky";
  width?: string;
  icon?: React.ReactElement;
  disabled?: boolean;
  onClick?: () => void | undefined;
}

export const ButtonStyled = ({ label, color, width, icon, ...rest }: Props) => {
  const style = {
    background: color === "blue" ? palette.blue_5 : palette.sky_1,
    color: color === "blue" ? palette.white : palette.black,
    borderRadius: "10px",
    padding: "0.5rem 1.5rem",
    width: width,
  };
  return (
    <Button style={style} startIcon={icon} {...rest}>
      {label}
    </Button>
  );
};

ButtonStyled.defaultProps = {
  label: "BUTTON",
  color: "blue",
  width: "",
  icon: "",
  disabled: false,
  onClick: undefined,
};

export default ButtonStyled;
