import * as React from "react";
import clsx from "clsx";
import { styled } from "@mui/system";
import { useSwitch, UseSwitchParameters } from "@mui/base/SwitchUnstyled";
import palette from "./styles/colorPalette";

const grey = {
  400: "#BFC7CF",
  500: "#AAB4BE",
  600: "#6F7E8C",
};

const BasicSwitchRoot = styled("span")(
  ({ theme }) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin: 10px;
  background: ${theme.palette.mode === "dark" ? grey[600] : grey[400]};
  border-radius: 10px;
  cursor: pointer;

  &.Switch-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.Switch-checked {
    background: ${palette.blue_3};
  }
  `,
);

const BasicSwitchInput = styled("input")`
  cursor: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
`;

const BasicSwitchThumb = styled("span")`
  display: block;
  width: 14px;
  height: 14px;
  top: 3px;
  left: 3px;
  border-radius: 16px;
  background-color: #fff;
  position: relative;
  transition: all 100ms;

  &.Switch-focusVisible {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.Switch-checked {
    left: 22px;
    top: 3px;
    background-color: ${palette.purple_1};
  }
`;

function BasicSwitch(props: UseSwitchParameters) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    "Switch-checked": checked,
    "Switch-disabled": disabled,
    "Switch-focusVisible": focusVisible,
  };

  return (
    <BasicSwitchRoot className={clsx(stateClasses)}>
      <BasicSwitchThumb className={clsx(stateClasses)} />
      <BasicSwitchInput {...getInputProps()} aria-label="Demo switch" />
    </BasicSwitchRoot>
  );
}

interface Props {
  label: string;
  location?: "left" | "center" | "right";
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const UseSwitchesBasic = ({ label, location, onClick }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: location,
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <span onClick={onClick}>
        <BasicSwitch />
      </span>
      <span style={{ paddingBottom: "6px" }}>{label}</span>
    </div>
  );
};

UseSwitchesBasic.defaultProps = {
  label: "스위치명",
  location: "left",
  onClick: undefined,
};

export default UseSwitchesBasic;
