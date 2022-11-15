import React from "react";
import { Box, Stack, Grid, IconButton, Tooltip } from "@mui/material";
import foundation from "assets/blog/gatsbyTheme/foundation.png";
import gatsbyAdvancedBlogSystem from "assets/blog/gatsbyTheme/gatsbyAdvancedBlogSystem.png";
import gatsbyNetlifycmsStarterTemplate from "assets/blog/gatsbyTheme/gatsbyNetlifycmsStarterTemplate.png";
import gatsbyStarterGlass from "assets/blog/gatsbyTheme/gatsbyStarterGlass.png";
import gatsbyStarterNetlifyCms from "assets/blog/gatsbyTheme/gatsbyStarterNetlifyCms.png";
import serialProgrammer from "assets/blog/gatsbyTheme/serialProgrammer.png";
import styles from "features/blog/Blog.module.css";
import Text from "components/Text";
import TvIcon from "@mui/icons-material/Tv";

function GatsbyLayoutCard(props: { setChoiceTheme: (arg0: string) => void }) {
  const layouts = [
    {
      idx: 1,
      repo: "gatsby-starter-foundation",
      img: foundation,
      title: "gatsby-starter-foundation",
      production: "stackrole",
      color: "#FFF2F8",
      preview: "https://foundation.stackrole.com/",
    },
    {
      idx: 2,
      repo: "gatsby-theme-serial-programmer",
      img: serialProgrammer,
      title: "Serial Programmer",
      production: "sharadcodes",
      color: "#B6B6B6",
      preview: "https://gatsby-theme-serial-programmer.vercel.app/",
    },
    {
      idx: 3,
      repo: "gatsby-netlifycms-starter-template",
      img: gatsbyNetlifycmsStarterTemplate,
      title: "gatsby-netlifycms-starter-template",
      production: "simarmannsingh",
      color: "#F1F8FF",
      preview: "https://gatsby-netlifycms-modern-template.netlify.app/",
    },
    {
      idx: 4,
      repo: "gatsby-starter-netlify-cms",
      img: gatsbyStarterNetlifyCms,
      title: "gatsby-starter-netlify-cms",
      production: "netlify-templates",
      color: "#FFF6F3",
      preview: "https://gatsby-netlify-cms.netlify.app/",
    },
    {
      idx: 5,
      repo: "gatsby-advanced-blog-system",
      img: gatsbyAdvancedBlogSystem,
      title: "Gatsby Advanced Blog System",
      production: "danilowoz",
      color: "#F3F5D9",
      preview: "https://gatsby-advanced-blog-system-danilowoz.vercel.app/blog",
    },
    {
      idx: 6,
      repo: "gatsby-starter-glass",
      img: gatsbyStarterGlass,
      title: "Gatsby Starter Glass",
      production: "yinkakun",
      color: "#FFFDFD",
      preview: "https://gatsbyglass.netlify.app/",
    },
  ];
  const [radioValue, setRadioValue] = React.useState("gatsby-starter-minimal-blog");

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
    <Grid container spacing={{ xs: 2, md: 2.5 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ px: 15 }}>
      {layouts.map((layout, idx) => (
        <Grid item xs={2} sm={4} md={4} key={idx}>
          <label>
            <input {...controlProps(layout.repo)} style={{ visibility: "hidden" }} />
            <Box className={styles.GatsbyCardBox}>
              <img src={layout.img} alt={layout.title} />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  backgroundColor: layout.color,
                }}
                className={styles.GatsbyCardText}
              >
                <Stack spacing={0.2}>
                  <Text value={layout.title} type="caption" bold />
                  <Text value={layout.production} type="caption" />
                </Stack>
                <Tooltip title="preview" arrow>
                  <IconButton onClick={() => window.open(layout.preview, "_blank")}>
                    <TvIcon fontSize="small" sx={{ color: "#424242" }} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          </label>
        </Grid>
      ))}
    </Grid>
  );
}

export default GatsbyLayoutCard;
