import React from "react";
import colorPalette, { PaletteKeyTypes } from "./styles/colorPalette";

interface Props {
  name?: string;
  color?: PaletteKeyTypes;
  italic?: boolean;
  underline?: boolean;
  bold?: boolean;
  fontSize?: string;
}

const Text = ({
  name,
  color,
  italic,
  underline,
  bold,
  fontSize,
  ...props
}: Props) => {
  const style = {
    color: color,
    fontStyle: italic ? "italic" : "normal",
    textDecoration: underline ? "underline" : "none",
    fontWeight: bold ? "bold" : "none",
    fontSize: fontSize,
  };
  return (
    <span style={style} {...props}>
      {name}
    </span>
  );
};

Text.defaultProps = {
  name: "Text",
  color: colorPalette.black,
  italic: false,
  underline: false,
  bold: false,
  fontSize: "18px",
};

export default Text;
