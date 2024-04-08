import Modal from "components/Modal";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

function BlogDashboardMoveModal() {
  const navigate = useNavigate();

  confetti({
    particleCount: 300,
    startVelocity: 40,
    spread: 360,
    origin: {
      x: 0.5,
      // since they fall down, start a bit higher than random
      y: 0.45,
    },
  });

  setTimeout(() => {
    confetti.reset();
  }, 3000);

  return (
    <>
      <Modal
        buttonNum={1}
        oneButtonLabel="대시보드로 이동"
        oneButtonSet={() => navigate("/dashboard")}
        text={`🎉 개설이 완료 됐습니다 🎉`}
      />
    </>
  );
}

export default BlogDashboardMoveModal;
