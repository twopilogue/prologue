import { useAppSelector } from "app/hooks";
import React from "react";
import { colorsConfig, selectColors } from "slices/settingSlice";
import DetailSetting from "./DetailSetting";
// import css from "css";

export const DetailSettingStyles = (styles: colorsConfig) => {
  const result = `
  .category {
    margin-bottom: var(--spacing-4);
    margin-right: var(--spacing-4);
  
    padding: var(--spacing-4);
  
    background-color: ${styles.category.background};
    border-radius: 10px;
  }
  `;

  const removedResult = result.replaceAll(".", "");
  // const json = toJSON(removedResult);
  // console.log(json);

  return result;
};
