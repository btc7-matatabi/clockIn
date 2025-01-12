// import { useZxing } from "react-zxing";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { employeeCodeAtom, UserInfos, userInfosAtom } from "../src/atoms";
import { Box, Typography } from "@mui/material";
import { AppToolBar } from "../src/AppToolBar.tsx";
// import {useEffect} from "react";
import {useEffect, useRef} from "react";
import jsQR from "jsqr";


export function QrScanScreen() {
  const navigate = useNavigate();
  const [, setEmployeeCode] = useAtom(employeeCodeAtom);
  const [, setUserInfos] = useAtom(userInfosAtom);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // const inputRef = useRef<HTMLInputElement>(null);  //暫定

    // const { ref } = useZxing({
    //     onDecodeResult(result) {
    //         const getData = result.getText();
    //         setEmployeeCode(getData); //従業員コードを設定
    //
    //         if (getData) {
    //             getUserInfo(getData);
    //         } else {
    //             navigate("/");
    //         }
    //     },
    // });
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
          const currentVideoRef = videoRef.current
          if (currentVideoRef && currentVideoRef.srcObject) {
              const stream = currentVideoRef.srcObject as MediaStream
              const tracks = stream.getTracks()
              tracks.forEach((track) => track.stop())
          }
        navigate("/time-select");
      } else {
        alert("ユーザ情報が存在しませんでした。");
      }
    // } catch (error) {
    //   console.error("Error in get user info:", error);
    //   alert("ユーザ情報の取得中にエラーが発生しました。");
    // }
  }
    useEffect(() => {
        const constraints = {
            video: {
                facingMode: 'user',
                width: { ideal: 640 },
                height: { ideal: 480 },
            },
        }

        // デバイスのカメラにアクセスする
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                // デバイスのカメラにアクセスすることに成功したら、video要素にストリームをセットする
                if (videoRef.current) {
                    const videoElement = videoRef.current;
                    videoElement.srcObject = stream

                    //readyState >= 3 は、ビデオが再生可能な状態
                    if (videoElement.paused && videoElement.readyState >= 3) {
                        videoElement.play().catch((error) => {
                            console.error('Error while trying to play the video:', error);
                        });
                    }
                    scanQrCode()
                }
            })
            .catch((err) => console.error('Error accessing media devices:', err))

        const currentVideoRef = videoRef.current
        // コンポーネントがアンマウントされたら、カメラのストリームを停止する
        return () => {
            if (currentVideoRef && currentVideoRef.srcObject) {
                const stream = currentVideoRef.srcObject as MediaStream
                const tracks = stream.getTracks()
                tracks.forEach((track) => track.stop())
            }
        }
    }, [])

    const scanQrCode = () => {
        const canvas = canvasRef.current
        const video = videoRef.current
        if (canvas && video) {
            canvas.width = 640;
            canvas.height = 480;
            const ctx = canvas.getContext('2d')
            if (ctx) {
                // カメラの映像をcanvasに描画する
                console.log("size", canvas.width,canvas.height,video.videoWidth)
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
                // QRコードをスキャンする
                const qrCodeData = jsQR(imageData.data, imageData.width, imageData.height)
                console.log("qrCodeData.data",qrCodeData?.data)
                if (qrCodeData) {
                    if(qrCodeData.data){
                        setEmployeeCode(qrCodeData.data)
                        console.log("qrCodeData.data",qrCodeData.data)
                        getUserInfo(qrCodeData.data)
                        // return
                    }
                }
                setTimeout(scanQrCode, 2000)
                // requestAnimationFrame(scanQrCode);
            }
        }
    }
  //reacr-zxing の場合
  //   const stopVideoStream = () => {
  //       const videoElement = ref.current;
  //       if (videoElement && videoElement.srcObject) {
  //           const stream = videoElement.srcObject as MediaStream;
  //           const tracks = stream.getTracks();
  //           tracks.forEach((track) => track.stop()); // 各トラックを停止
  //           videoElement.srcObject = null; // srcObjectをnullにすることでリソースを解放
  //       }
  //   };
  //
  //   // QRコードを読み取った後にビデオを停止
  //   useEffect(() => {
  //       // コンポーネントがアンマウントされる時やQRを読み取った後にビデオを停止
  //       return () => {
  //           stopVideoStream(); // コンポーネントアンマウント時にビデオストリームを停止
  //       };
  //   }, []);
    // カメラを起動する
    //     const getDevices = async () => {
    //         /*
    //        enumerateDevices()メソッドを使ってメディア入出力機器の一覧を取得する前に
    //        ここでgetUserMedia()メソッドを使って、メディア入力を使用する許可をユーザーに求める
    //        */
    //         await navigator.mediaDevices.getUserMedia({ video: true });
    //
    //         try {
    //             const mediaDevices = await navigator.mediaDevices.enumerateDevices();
    //             const videoDevices = mediaDevices.filter(device => device.kind === 'videoinput');
    //             console.log("Video Devices:", videoDevices);
    //             setDevices(videoDevices);
    //             if (videoDevices.length > 0) {
    //                 setSelectedDeviceId(videoDevices[0].deviceId);
    //             }
    //         } catch (error) {
    //             console.error('Error getting devices:', error);
    //         }
    //     };
    // useEffect(() => {
    //     getDevices();
    // }, []);





  // 暫定「仮）QR読込」ボタン用処理
  // const handleButtonClick = () => {
  //     const userId = inputRef.current?.value;
  //     console.log("userId",userId)
  //   if(userId){
  //     getUserInfo(userId);
  //     navigate("/time-select");
  //   }
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
            {/*暫定*/}
          <Typography
            variant="h5"
            sx={{
              marginTop: "10px",
              fontWeight: 600,
              flexGrow: 1,
              textAlign: "center",
                height:"40px"
            }}
          >
            QRコードを読み込ませてください
          </Typography>

          {/*<video*/}
          {/*    ref={videoRef}*/}
          {/*    style={{*/}
          {/*    width: "100%",*/}
          {/*    height: "100%",*/}
          {/*    objectFit: "cover",*/}
          {/*    margin: 0,*/}
          {/*  }}*/}
          {/*  autoPlay*/}
          {/*  muted*/}
          {/*  playsInline*/}
          {/*/>*/}
            {/* 画面サイズに合わせてカメラ映像を表示 */}
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                <video
                    ref={videoRef}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        margin: 0,
                    }}
                    autoPlay
                    muted
                    playsInline
                />
                {/* QRコードのスキャン用canvas（非表示） */}
                <canvas
                    ref={canvasRef}
                    style={{
                        // position: 'absolute',
                        width: 300,
                        height: 300,
                        display: 'none', // キャンバスは非表示
                    }}
                />
            </Box>

            {/*<Box*/}
            {/*    sx={{*/}
            {/*        display: "flex",*/}
            {/*        flexDirection: "column",*/}
            {/*        alignItems: "center",*/}
            {/*        // justifyContent: "center",*/}
            {/*        gap: "20px", // 要素間にスペースを入れる*/}
            {/*        textAlign: "center",*/}
            {/*        flexGrow: 1, // 親のflexbox内で中央に配置*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Typography*/}
            {/*        variant="h2"*/}
            {/*        sx={{*/}
            {/*            marginTop: "100px",*/}
            {/*            fontWeight: 600,*/}
            {/*            // flexGrow: 1,*/}
            {/*            textAlign: "center",*/}

            {/*        }}*/}
            {/*    >*/}
            {/*        従業員コード*/}
            {/*    </Typography>*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            id="userId"*/}
            {/*            name="userId"*/}
            {/*            // placeholder="ユーザーID"*/}
            {/*            ref={inputRef}*/}
            {/*            style={{*/}
            {/*                padding: "10px",*/}
            {/*                fontSize: "32px",*/}
            {/*                borderRadius: "5px",*/}
            {/*                width: "500px",*/}
            {/*                height:"100px",*/}
            {/*                margin:"50px",*/}
            {/*            }}*/}
            {/*        />*/}
            {/*        <button type="submit"*/}
            {/*                className="login-button"*/}
            {/*                onClick={handleButtonClick}*/}
            {/*                style={{*/}
            {/*                    margin:"50px",*/}
            {/*                padding: "10px 20px",*/}
            {/*                fontSize: "48px",*/}
            {/*                backgroundColor: "#909294",*/}
            {/*                color: "white",*/}
            {/*                borderRadius: "5px",*/}
            {/*                border: "none",*/}
            {/*                cursor: "pointer",*/}
            {/*                // width: "80%", // ボタン幅を調整*/}
            {/*                width: "500px", // 最大幅を指定*/}
            {/*                    height:"100px"*/}
            {/*            }}>*/}
            {/*            ログイン*/}
            {/*        </button>*/}
            {/*</Box>*/}


        </Box>
      </Box>
    </>
);
}
