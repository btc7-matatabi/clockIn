import { useZxing } from "react-zxing";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { employeeCodeAtom, UserInfos, userInfosAtom } from "../src/atoms";
import { Box, Typography } from "@mui/material";
import { AppToolBar } from "../src/AppToolBar.tsx";
// import {useEffect} from "react";
import {useEffect, useRef} from "react";

export function QrScanScreen() {
  const navigate = useNavigate();
  const [, setEmployeeCode] = useAtom(employeeCodeAtom);
  const [, setUserInfos] = useAtom(userInfosAtom);

    const inputRef = useRef<HTMLInputElement>(null);  //暫定

  async function getUserInfo(empCd: string) {
    const URL = process.env.VITE_URL;
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    // try {
      const apiUrl = `${URL}/users/${empCd}/${formattedDate}`;
      console.log("🍎apiUrl",apiUrl)
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
    // } catch (error) {
    //   console.error("Error in get user info:", error);
    //   alert("ユーザ情報の取得中にエラーが発生しました。");
    // }
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
  // 暫定「仮）QR読込」ボタン用処理
  const handleButtonClick = () => {
      const userId = inputRef.current?.value;
      console.log("userId",userId)
    if(userId){
      getUserInfo(userId);
      navigate("/time-select");
    }
  };

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
            {/*暫定*/}
          {/*<Typography*/}
          {/*  variant="h5"*/}
          {/*  sx={{*/}
          {/*    marginTop: "10px",*/}
          {/*    fontWeight: 600,*/}
          {/*    flexGrow: 1,*/}
          {/*    textAlign: "center",*/}
          {/*  }}*/}
          {/*>*/}
          {/*  QRコードを読み込ませてください*/}
          {/*</Typography>*/}


          {/*<video*/}
          {/*  ref={ref}*/}
          {/*  style={{*/}
          {/*    width: "100%",*/}
          {/*    height: "100%",*/}
          {/*    objectFit: "cover",*/}
          {/*    margin: 0,*/}
          {/*  }}*/}
          {/*/>*/}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    // justifyContent: "center",
                    gap: "20px", // 要素間にスペースを入れる
                    textAlign: "center",
                    flexGrow: 1, // 親のflexbox内で中央に配置
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        marginTop: "100px",
                        fontWeight: 600,
                        // flexGrow: 1,
                        textAlign: "center",

                    }}
                >
                    従業員コード
                </Typography>
                    <input
                        type="text"
                        id="userId"
                        name="userId"
                        // placeholder="ユーザーID"
                        ref={inputRef}
                        style={{
                            padding: "10px",
                            fontSize: "32px",
                            borderRadius: "5px",
                            width: "500px",
                            height:"100px",
                            margin:"50px",
                        }}
                    />
                    <button type="submit"
                            className="login-button"
                            onClick={handleButtonClick}
                            style={{
                                margin:"50px",
                            padding: "10px 20px",
                            fontSize: "48px",
                            backgroundColor: "#909294",
                            color: "white",
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                            // width: "80%", // ボタン幅を調整
                            width: "500px", // 最大幅を指定
                                height:"100px"
                        }}>
                        ログイン
                    </button>
            </Box>


        </Box>
      </Box>
    </>
);
}
