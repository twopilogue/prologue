import Text from "components/Text";
import { Box, Stack } from "@mui/material";
import Button from "components/Button";
import styles from "features/blog/Blog.module.css";

interface Props {
  title: string;
  image: string;
  text: string[];
  onClick: () => void;
}

function BlogReset(value: Props) {
  return (
    <Box className={styles.BlogResetBox}>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={3}>
        <div className={styles.BlogResetBoxTitle}>
          <Text value={value.title} type="textTitle" bold />
        </div>
        <div className={styles.BlogResetImgDiv}>
          <img src={value.image} alt={value.title} loading="lazy" />
        </div>
        <Stack direction="column" spacing={3} sx={{ py: 1 }}>
          {value.text.map((value, index) => (
            <Text key={index} value={value} />
          ))}
        </Stack>
        <Button label="선택" onClick={value.onClick} />
      </Stack>
    </Box>
  );
}

export default BlogReset;
