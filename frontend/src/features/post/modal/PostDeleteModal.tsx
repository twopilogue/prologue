import Modal from "components/Modal";
import React from "react";

const PostDeleteModal = () => {
  return (
    <div>
      <Modal text={`정말 해당 게시글을 삭제하시겠습니까?\n삭제한 게시글은 복구가 불가합니다.`} />
    </div>
  );
};

export default PostDeleteModal;
