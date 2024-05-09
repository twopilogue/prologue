import { FormControl, FormHelperText, OutlinedInput } from "@mui/material";
import { styled } from "@mui/material/styles";
import palette from "styles/colorPalette";
import { ChangeEventHandler, KeyboardEventHandler } from "react";

interface inputInfo {
  name: string;
  placeholder: string;
  type?: string;
  value?: string | number | readonly string[] | undefined;
  disabled?: boolean; // 수정 가능 여부
  multiline?: boolean; // 두 줄 이상 여부(default : falses)
  rows?: number; // 기본 보여지는 줄 수(height)
  textBool?: boolean; // helper 여부
  helperText?: string;
  size?: "medium" | "small";
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onKeyPress?: KeyboardEventHandler<HTMLInputElement> | undefined;
}

const InputStyle = styled(OutlinedInput)(() => ({
  backgroundColor: palette.gray,
  padding: "0px",
  fontSize: "0.95rem",
  fontFamily: "Pretendard-Regular",
  ".MuiOutlinedInput-input": { padding: "7px 9px" },
}));

// rest 쪽에는 onChange, type, name, value, placeholder 등의 input 에서 사용 하는 값들을 넣어줄수 있다.
const Input = ({ placeholder, textBool, helperText, rows, size, ...rest }: inputInfo) => (
  <div>
    <FormControl sx={{ width: "100%", height: "100%" }}>
      <InputStyle size={size ? size : "small"} placeholder={placeholder} {...rest} rows={rows} />
    </FormControl>
    {textBool &&
      (helperText ? (
        <FormHelperText disabled variant="filled">
          {helperText}
        </FormHelperText>
      ) : (
        <p style={{ margin: `21px` }} />
      ))}
  </div>
);

Input.defaultProps = {
  name: "input이름",
  placeholder: "input설명",
  type: "text",
};

export default Input;
