import React from "react";
import { Box, Stack, Grid } from "@mui/material";
import foundation from "assets/blog/gatsbyTheme/foundation.png";
import gatsbyAdvancedBlogSystem from "assets/blog/gatsbyTheme/gatsbyAdvancedBlogSystem.png";
import gatsbyNetlifycmsStarterTemplate from "assets/blog/gatsbyTheme/gatsbyNetlifycmsStarterTemplate.png";
import gatsbyStarterBlog from "assets/blog/gatsbyTheme/gatsbyStarterBlog.png";
import gatsbyStarterGlass from "assets/blog/gatsbyTheme/gatsbyStarterGlass.png";
import gatsbyStarterMinimalBlog from "assets/blog/gatsbyTheme/gatsbyStarterMinimalBlog.png";
import gatsbyStarterNetlifyCms from "assets/blog/gatsbyTheme/gatsbyStarterNetlifyCms.png";
import serialProgrammer from "assets/blog/gatsbyTheme/serialProgrammer.png";
import styles from "features/blog/Blog.module.css";
import Text from "components/Text";

function GatsbyLayoutCard(props: { setChoiceTheme: (arg0: string) => void }) {
  const layouts = [
    {
      idx: 1,
      repo: "gatsby-starter-minimal-blog",
      img: gatsbyStarterMinimalBlog,
      title: "gatsby-starter-minimal-blog",
      production: "LekoArts",
      color: "#EFF0FF",
    },
    {
      idx: 2,
      repo: "gatsby-starter-foundation",
      img: foundation,
      title: "gatsby-starter-foundation",
      production: "stackrole",
      color: "#FFF2F8",
    },
    {
      idx: 3,
      repo:"gatsby-starter-blog",
      img: gatsbyStarterBlog,
      title: "Gatsby-Starter-Blog",
      production: "gatsbyjs",
      color: "#F1F1F1",
    },
    {
      idx: 4,
      repo: "gatsby-theme-serial-programmer",
      img: serialProgrammer,
      title: "Serial Programmer",
      production: "sharadcodes",
      color: "#B6B6B6",
    },
    {
      idx: 5,
      repo: "gatsby-netlifycms-starter-template",
      img: gatsbyNetlifycmsStarterTemplate,
      title: "gatsby-netlifycms-starter-template",
      production: "simarmannsingh",
      color: "#F1F8FF",
    },
    {
      idx: 6,
      repo: "gatsby-starter-netlify-cms",
      img: gatsbyStarterNetlifyCms,
      title: "gatsby-starter-netlify-cms",
      production: "netlify-templates",
      color: "#FFF6F3",
    },
    {
      idx: 7,
      repo: "gatsby-advanced-blog-system",
      img: gatsbyAdvancedBlogSystem,
      title: "Gatsby Advanced Blog System",
      production: "danilowoz",
      color: "#F3F5D9",
    },
    {
      idx: 8,
      repo: "gatsby-starter-glass",
      img: gatsbyStarterGlass,
      title: "Gatsby Starter Glass",
      production: "yinkakun",
      color: "#FFFDFD",
    },
  ];
  const [radioValue, setRadioValue] = React.useState(
    "gatsby-starter-minimal-blog",
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
    props.setChoiceTheme(e.target.value);
  };

  const controlProps = (item: string) => ({
    type: "radio",
    value: item,
    className: styles.inputValue,
    checked: radioValue === item,
    onChange: handleChange,
  });

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 2.5 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ px: 15 }}
    >
      {layouts.map((layout, idx) => (
        <Grid item xs={2} sm={4} md={3} key={idx}>
          <label>
            <input
              {...controlProps(layout.repo)}
              style={{ visibility: "hidden" }}
            />
            <Box className={styles.GatsbyCardBox}>
              <img src={layout.img} alt={layout.title} />
              <Stack
                spacing={0.2}
                sx={{
                  backgroundColor: layout.color,
                }}
                className={styles.GatsbyCardText}
              >
                <Text value={layout.title} type="caption" bold />
                <Text value={layout.production} type="caption" />
              </Stack>
            </Box>
          </label>
        </Grid>
      ))}
    </Grid>
  );
}

export default GatsbyLayoutCard;
