import styles from "components/css/Text.module.css";
import palette, { PaletteKeyTypes } from "styles/colorPalette";

interface Props {
  value: string;
  type?: "caption" | "text" | "groupTitle" | "textTitle" | "pageTitle" | "title";
  bold?: boolean;
  color?: PaletteKeyTypes;
}

const Text = ({ value, type, bold, color }: Props) => {
  const style = {
    fontWeight: bold ? "600" : "400",
    color: palette[color],
  };
  return (
    <>
      <span className={`${styles[type]}`} style={style}>
        {value}
      </span>
    </>
  );
};

Text.defaultProps = {
  value: "내용이 들어갑니다.",
  type: "sample",
};

export default Text;
