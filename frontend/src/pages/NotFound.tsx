import React from "react";
import { ButtonBase, Link, Stack } from "@mui/material";
import Text from "components/Text";

function NotFound() {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
      <Text value="잘못된 요청 경로입니다" type="pageTitle" bold />
      <Link href="/" color="inherit" underline="none">
        <ButtonBase>
          <Text value="홈으로 가기" type="groupTitle" />
        </ButtonBase>
      </Link>
    </Stack>
  );
}

export default NotFound;
