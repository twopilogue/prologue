import React from "react";
import styles from "features/blog/Blog.module.css";
import Text from "components/Text";
import Button from "components/Button";
import { Paper, Stack } from "@mui/material";

interface Props {
  onClick: () => void;
}

function BlogCreateBox({ onClick }: Props) {
  return (
    <Paper className={styles.Box} elevation={2} sx={{ mt: 5, borderRadius: 5 }}>
      <div className={styles.BlogCreateTitle}>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={0.5}>
          <Text value="GitHub 블로그 생성" type="title" bold />
          <Text value="깃허브 블로그가 이미 존재한다면 생성이 불가능합니다." type="groupTitle" />
        </Stack>
      </div>
      <Button label="Github blog Create" width="50%" onClick={onClick} />
    </Paper>
  );
}

export default BlogCreateBox;

