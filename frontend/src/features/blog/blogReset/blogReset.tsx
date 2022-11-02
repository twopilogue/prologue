import React from "react";
import Text from "components/Text";
import { Box, Stack } from "@mui/material";
import Button from "components/Button";
import styles from "features/blog/Blog.module.css";
import resetImg from "assets/blog/RepositoryReset.png";
import ManageImg from "assets/blog/ManageOnly.png";
import Modal from "components/Modal";

function BlogReset() {
  const [repositoryModalOpen, setRepositoryModalOpen] = React.useState(false);
  const [ManageModalOpen, setManageModalOpen] = React.useState(false);

  const showRepositoryModal = () => {
    setRepositoryModalOpen(true);
  };

  const showManageModal = () => {
    setManageModalOpen(true);
  };

  return (
    <Box sx={{ mx: 10 }}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ my: 7.5 }}
      >
        <Text
          value="github.io가 이미 존재합니다"
          type="pageTitle"
          bold
          color="red"
        />
        <Text
          value="사이트에서 지원하는 깃허브 블로그가 아닙니다. 다음 중 선택하세요."
          type="groupTitle"
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={8}
      >
        <Box className={styles.BlogResetBox}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Text value="Repository 초기화" type="pageTitle" bold />
            <div className={styles.BlogResetImgDiv}>
              <img src={resetImg} alt="Repository 초기화" loading="lazy" />
            </div>
            <Stack direction="column" spacing={3} sx={{ py: 1 }}>
              <Text value="• 사용자 Repository에 있는 github.io를 삭제하고 새로 생성합니다." />
              <Text value="• 사이트에서 제공하는 레이아웃으로 블로그를 디자인 할 수 있습니다." />
              <Text value="• 블로그 게시글을 간편하게 작성하고 관리할 수 있습니다. " />
            </Stack>
            <Button label="선택" onClick={showRepositoryModal} />
            {repositoryModalOpen && (
              <Modal
                buttonNum={2}
                oneButtonSet={() => setManageModalOpen(false)}
                text={`Repository 초기화를 선택했습니다\ngithub.io 데이터들이 모두 삭제됩니다`}
              />
            )}
          </Stack>
        </Box>
        <div className={styles.line} />
        <Box className={styles.BlogResetBox}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Text value="게시글만 관리" type="pageTitle" bold />
            <div className={styles.BlogResetImgDiv}>
              <img src={ManageImg} alt="Repository 초기화" loading="lazy" />
            </div>
            <Stack direction="column" spacing={3} sx={{ py: 1 }}>
              <Text value="• 기존에 존재하는 github.io를 분석하여 게시글을 관리 할 수 있도록 지원합니다." />
              <Text value="• 대시보드와 게시글 목록보기를 지원합니다." />
              <Text value="• 레이아웃 수정 및 게시글 작성 지원은 불가 합니다." />
            </Stack>
            <Button label="선택" onClick={showManageModal} />
            {ManageModalOpen && (
              <Modal
                buttonNum={2}
                oneButtonSet={() => setRepositoryModalOpen(false)}
                text={`게시글만 관리를 선택했습니다\n게시글 탐색이 안 될 경우 지원이 불가합니다`}
              />
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default BlogReset;
