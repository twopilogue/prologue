import React, { useEffect } from "react";
import styles from "./Blog.module.css";
import Text from "components/Text";
import { Box, FormControl, RadioGroup, Stack } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import RadioButton from "./BlogRadioButton";

interface Props {
  onClick?: () => void;
}

function BlogLayoutSetting({ onClick }: Props) {
  useEffect(() => {
    AOS.init();
  });

  const [radioValue, setRadioValue] = React.useState("CustomLayout");
  const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
  };

  return (
    <div className={styles.Box}>
      <div className={styles.BlogLayoutSettingTitle} data-aos="fade-left">
        <Text value="레이아웃 설정" type="titleBold" />
      </div>

      <FormControl data-aos="fade-left">
        <RadioGroup value={radioValue} onChange={radioChange}>
          <Stack spacing={8}>
            <Stack spacing={0.5}>
              <RadioButton label="직접 레이아웃 세팅" value="CustomLayout" />
              <Box sx={{ pl: 2.5 }}>
                <Text value="원하는 레이아웃을 선택하고 테마를 꾸밀 수 있습니다." />
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
    </div>
  );
}

export default BlogLayoutSetting;
