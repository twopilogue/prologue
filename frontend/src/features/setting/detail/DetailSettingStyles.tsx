import { useAppSelector } from "app/hooks";
import React from "react";
import { colorsConfig, selectColors } from "slices/settingSlice";
import DetailSetting from "./DetailSetting";

export const DetailSettingStyles = (styles: colorsConfig) => {
  const result = `
  .category {
    background-color: ${styles.category.background};
  }

  .category a {
    color: ${styles.category.text};
  }

  .profile {
    background-color: ${styles.profile.background};
    color: ${styles.profile.text};
  } 

  .title {
    background-color: ${styles.title.background};
  }

  .title h3 {
    color: ${styles.title.text};
  }
  
  .title h3 {
    color: ${styles.title.text};
  }
  
  .post-list-container {
    background-color: ${styles.contents.background};
    color: ${styles.contents.text};
  }
  
  .post-list-item h2 {
    color: ${styles.contents.text};
  }

  .page-container {
    background-color: ${styles.page.background};
  
    /* justify-content: flex-start; */
    justify-content: ${styles.page.sort};
    /* justify-content: center; */
  }

  .page a {
    color: ${styles.page.text};
  }
  
  `;

  return result;
};
