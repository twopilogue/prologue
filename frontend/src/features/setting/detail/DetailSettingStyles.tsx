import React from "react";
import { colorsConfig } from "slices/settingSlice";

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
    height: ${styles.title.titleHeight};
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

  .post-list-container-title {
    border-bottom: 1px solid ${styles.contents.text};
  }
  
  .post-list-item h2 {
    color: ${styles.contents.text};
  }

  .page-container {
    background-color: ${styles.page.background};
    justify-content: ${styles.page.sort};
  }

  .page a {
    color: ${styles.page.text};
  }
  
  `;

  return result;
};
