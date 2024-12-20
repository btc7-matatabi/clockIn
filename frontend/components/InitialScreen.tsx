import { useNavigate } from "react-router-dom";

export function InitialScreen() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/qr-scan");
  };

  return (
    <>
      <div
        onClick={handleClick}
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        QR読み込み <br />
        画面をタップしてください
      </div>
    </>
  );
}
