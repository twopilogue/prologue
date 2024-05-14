import { ReactElement } from "react";
import palette from "styles/colorPalette";
import Button from "@mui/material/Button";

interface Props {
  label: string | JSX.Element;
  color?: "blue" | "sky" | "gray";
  width?: string;
  icon?: ReactElement;
  disabled?: boolean;
  onClick?: () => void | undefined;
}

const getBackgroundColor = (color: string) => {
  if (color === "blue") return palette.blue_5;
  return color === "sky" ? palette.sky_1 : palette.gray;
};

const getColor = (color: string) => {
  if (color === "blue") return palette.white;
  return palette.black;
};

export const ButtonStyled = ({ label, color, width, icon, ...rest }: Props) => {
  const style = {
    background: getBackgroundColor(color),
    color: getColor(color),
    borderRadius: "10px",
    padding: "0.5rem 1.4rem",
    fontFamily: "Pretendard-Regular",
    fontWeight: "400",
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
