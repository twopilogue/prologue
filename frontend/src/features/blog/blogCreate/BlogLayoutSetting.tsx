import React, { useEffect } from "react";
import styles from "features/blog/Blog.module.css";
import Text from "components/Text";
import { Box, FormControl, Paper, RadioGroup, Stack } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import RadioButton from "./BlogRadioButton";
import Button from "components/Button";

interface Props {
  radioValue: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onClick?: () => void;
}

function BlogLayoutSetting({ radioValue, setValue, onClick }: Props) {
  useEffect(() => {
    AOS.init();
  });

  const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Paper className={styles.Box} elevation={2} sx={{ mt: 5, borderRadius: 5 }}>
      <div className={styles.BlogLayoutSettingTitle} data-aos="fade-left">
        <Text value="레이아웃 설정" type="title" bold />
      </div>

      <FormControl data-aos="fade-left" sx={{ marginBottom: "7%" }}>
        <RadioGroup value={radioValue} onChange={radioChange}>
          <Stack spacing={8}>
            <Stack spacing={0.5}>
              <RadioButton label="직접 레이아웃 세팅" value="CustomLayout" />
              <Box sx={{ pl: 2.5 }}>
                <Text value="높은 자유도로 레이아웃을 배치하고 테마를 꾸밀 수 있습니다." />
              </Box>
            </Stack>
            <Stack spacing={0.5}>
              <RadioButton label="Gatsby 제공 레이아웃" value="GatsbyLayout" />
              <Box sx={{ pl: 2.5 }}>
                <Text value="구성된 레이아웃과 테마로 게시글을 작성하고 꾸밉니다." />
              </Box>
            </Stack>
          </Stack>
        </RadioGroup>
      </FormControl>

      <Button label="Next" onClick={onClick} data-aos="fade-left" />
    </Paper>
  );
}

export default BlogLayoutSetting;
