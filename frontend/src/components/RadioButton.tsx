import * as React from "react";
import { styled } from "@mui/material/styles";
import { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import palette from "./styles/colorPalette";

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(() => ({
  ".MuiFormControlLabel-label": {
    lineHeight: 1.0,
  },
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();
  let checked = false;
  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

const RaidoButton = styled(Radio)(() => ({
  padding: 3,
  "&.Mui-checked": { color: palette.blue_5 },
}));

interface Props {
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
}

export default function UseRadioGroup({ label, value, ...rest }: Props) {
  return (
    <MyFormControlLabel
      value={value}
      label={label}
      control={<RaidoButton {...rest} />}
    />
  );
}
