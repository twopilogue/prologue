import React from "react";
import { Box, Stack } from "@mui/material";
import Text from "components/Text";
import Grid from "@mui/material/Grid";
import GatsbyLayoutCard from "features/blog/GatsbyLayoutCard";
import resetImg from "assets/blog/blogChoice/RepositoryReset.png";

const LayoutChoicePage = () => {
  const layouts = [
    {
      img: resetImg,
      title: "gatsby-starter-minimal-blog",
      Production: "LekoArts",
    },
    {
      img: resetImg,
      title: "gatsby-starter-foundation",
      production: "stackrole",
    },
    {
      img: resetImg,
      title: "Gatsby-Starter-Blog",
      production: "gatsbyjs",
    },
    {
      img: resetImg,
      title: "Serial Programmer",
      production: "sharadcodes",
    },
    {
      img: resetImg,
      title: "gatsby-netlifycms-starter-template",
      production: "simarmannsingh",
    },
    {
      img: resetImg,
      title: "Camera",
      production: "30%",
    },
    {
      img: resetImg,
      title: "Breakfast",
      production: "40%",
    },
    {
      img: resetImg,
      title: "Burgers",
      production: "30%",
    },
  ];
  return (
    <Box sx={{ mx: 10 }}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ my: 7.5 }}
      >
        <Text value="Gatsby 테마 선택" type="pageTitle" bold />
        <Text
          value="이미 구성된 레이아웃과 테마로 게시글을 작성하고 꾸밉니다."
          type="groupTitle"
        />
      </Stack>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
        >
          {layouts.map((layout, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <GatsbyLayoutCard />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default LayoutChoicePage;
