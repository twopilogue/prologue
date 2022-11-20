import React from "react";
import Chip from "@mui/material/Chip";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { styled } from "@mui/material";

const randomBrightColor = () => {
  const randomNum = Math.floor(Math.random() * 5);

  const arrR = [184, 115, 57, 208, 122];
  const arrG = [138, 119, 61, 173, 150];
  const arrB = [247, 204, 150, 255, 230];
  const colorR = arrR[randomNum];
  const colorG = arrG[randomNum];
  const colorB = arrB[randomNum];

  return "rgb" + "(" + 115 + "," + 119 + "," + 204 + ")";
};

const ChipStyled = styled(Chip)(() => ({
  // backgroundColor: palette.blue_5,
  backgroundColor: randomBrightColor(),
  fontFamily: "Pretendard-Regular",
  fontWeight: "400",
  color: "white",
  "& .MuiChip-deleteIcon": {
    color: "white",
    "&:hover": {
      color: "#c5cae9",
    },
  },
}));

interface Props {
  label: string;
  onDelete?: () => void | undefined;
}

const Tag = ({ label, onDelete }: Props) => {
  return <ChipStyled deleteIcon={<HighlightOffIcon />} label={label} onDelete={onDelete} />;
};

Tag.defaultProps = {
  label: "chip",
  onDelete: () => console.log("tag 삭제 함수 넣어주세요"),
};

export default Tag;
