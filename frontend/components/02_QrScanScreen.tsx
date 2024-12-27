import { useZxing } from "react-zxing";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { employeeCodeAtom, UserInfos, userInfosAtom } from "../src/atoms";
import { Box, Typography } from "@mui/material";
import { AppToolBar } from "../src/AppToolBar.tsx";
import {useEffect} from "react";

export function QrScanScreen() {
  const navigate = useNavigate();
  const [, setEmployeeCode] = useAtom(employeeCodeAtom);
  const [, setUserInfos] = useAtom(userInfosAtom);

  async function getUserInfo(empCd: string) {
    const URL = process.env.VITE_URL;
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    try {
      const apiUrl = `${URL}/users/${empCd}/${formattedDate}`;
      const resultUserInfo = await fetch(apiUrl);

      if (!resultUserInfo.ok) {
        throw new Error(`HTTP error! Status: ${resultUserInfo.status}`);
      }

      const datas: UserInfos = await resultUserInfo.json();
      setUserInfos(datas);

      if (datas) {
        navigate("/time-select");
      } else {
        alert("ユーザ情報が存在しませんでした。");
      }
    } catch (error) {
      console.error("Error in get user info:", error);
      alert("ユーザ情報の取得中にエラーが発生しました。");
    }
  }

  const { ref } = useZxing({
    onDecodeResult(result) {
      const getData = result.getText();
      setEmployeeCode(getData); //従業員コードを設定

      if (getData) {
        getUserInfo(getData);
      } else {
        navigate("/");
      }
    },
  });

    const stopVideoStream = () => {
        const videoElement = ref.current;
        if (videoElement && videoElement.srcObject) {
            const stream = videoElement.srcObject as MediaStream;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop()); // 各トラックを停止
            videoElement.srcObject = null; // srcObjectをnullにすることでリソースを解放
        }
    };

    // QRコードを読み取った後にビデオを停止
    useEffect(() => {
        // コンポーネントがアンマウントされる時やQRを読み取った後にビデオを停止
        return () => {
            stopVideoStream(); // コンポーネントアンマウント時にビデオストリームを停止
        };
    }, []);
  // //暫定　「仮）QR読込」ボタン用処理
  // const handleTentative = () => {
  //   getUserInfo("0000001");
  //   navigate("/time-select");
  // };

  return (
    <>
      {/*<button onClick={handleTentative}>動作確認用）QR読込と同等ボタン</button>*/}
      <Box>
        <AppToolBar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginTop: "10px",
              fontWeight: 600,
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            QRコードを読み込ませてください
          </Typography>

          <video
            ref={ref}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              margin: 0,
            }}
          />
        </Box>
      </Box>
    </>
  );
}
