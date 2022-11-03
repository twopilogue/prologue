import React from "react";
import {
  Box,
  Stack,
  Grid,
  FormControl,
  RadioGroup,
  useRadioGroup,
  FormControlLabel,
  FormControlLabelProps,
} from "@mui/material";
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

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

function MyFormControlLabel(props: StyledFormControlLabelProps) {
  const radioGroup = useRadioGroup();
  let checked = false;
  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }
  return <FormControlLabel checked={checked} {...props} />;
}

function GatsbyLayoutCard() {
  const layouts = [
    {
      idx: 1,
      img: gatsbyStarterMinimalBlog,
      title: "gatsby-starter-minimal-blog",
      production: "LekoArts",
      color: "#EFF0FF",
    },
    {
      idx: 2,
      img: foundation,
      title: "gatsby-starter-foundation",
      production: "stackrole",
      color: "#FFF2F8",
    },
    {
      idx: 3,
      img: gatsbyStarterBlog,
      title: "Gatsby-Starter-Blog",
      production: "gatsbyjs",
      color: "#F1F1F1",
    },
    {
      idx: 4,
      img: serialProgrammer,
      title: "Serial Programmer",
      production: "sharadcodes",
      color: "#B6B6B6",
    },
    {
      idx: 5,
      img: gatsbyNetlifycmsStarterTemplate,
      title: "gatsby-netlifycms-starter-template",
      production: "simarmannsingh",
      color: "#F1F8FF",
    },
    {
      idx: 6,
      img: gatsbyStarterNetlifyCms,
      title: "gatsby-starter-netlify-cms",
      production: "netlify-templates",
      color: "#FFF6F3",
    },
    {
      idx: 7,
      img: gatsbyAdvancedBlogSystem,
      title: "Gatsby Advanced Blog System",
      production: "danilowoz",
      color: "#F3F5D9",
    },
    {
      idx: 8,
      img: gatsbyStarterGlass,
      title: "Gatsby Starter Glass",
      production: "yinkakun",
      color: "#FFFDFD",
    },
  ];
  const [radioValue, setRadioValue] = React.useState("1");

  const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
    console.log(radioValue);
  };

  return (
    <FormControl>
      <RadioGroup value={radioValue} onChange={radioChange}>
        <Grid
          container
          spacing={{ xs: 2, md: 2.5 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {layouts.map((layout) => (
            <Grid item xs={2} sm={4} md={3} key={layout.idx}>
              <MyFormControlLabel
                value={layout.idx}
                checked={false}
                label={""}
                control={
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
                }
              />
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
}

export default GatsbyLayoutCard;
