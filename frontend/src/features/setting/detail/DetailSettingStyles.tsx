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

  .category a {
    color: ${styles.category.text}
  }

  .profile {
    padding-top: var(--spacing-4);
    margin-bottom: var(--spacing-4);
    margin-right: var(--spacing-4);
    background-color: ${styles.profile.background};
    color: ${styles.profile.text}
    border-radius: 10px;
  } 

  .title {
    background-color: ${styles.title.background};
  }
  
  .post-list-container {
    background-color: ${styles.contents.background};
    color: ${styles.contents.text};
  }
  
  .post-list-item h2 {
    font-size: var(--fontSize-4);
    color: var(--color-primary);
    margin-bottom: var(--spacing-2);
    margin-top: var(--spacing-0);
    color: ${styles.contents.text};
  }
  
  `;

  return result;
};
