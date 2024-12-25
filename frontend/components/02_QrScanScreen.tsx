import { useZxing } from "react-zxing";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { employeeCodeAtom, UserInfos, userInfosAtom } from "../src/atoms";
import { Box, Typography } from "@mui/material";
import { AppToolBar } from "../src/AppToolBar.tsx";

export function QrScanScreen() {
  const navigate = useNavigate();
  const [, setEmployeeCode] = useAtom(employeeCodeAtom);
  const [, setUserInfos] = useAtom(userInfosAtom);

  const { ref } = useZxing({
    onDecodeResult(result) {
      const employee_code = result.getText();
      setEmployeeCode(employee_code); //従業員コードを設定

      async function getUserInfo() {
        const URL = process.env.VITE_URL;
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        console.log(formattedDate);

        const resultUserInfo = await fetch(
          URL + "/getUserInfo/" + employee_code + "/" + formattedDate,
        );
        const userInfos = await resultUserInfo.json();
        setUserInfos(userInfos.data[0] as UserInfos);

        //⭐️useInfosのデータが更新されていないため、元のデータで判定
        if (!userInfos.data.name) {
          // navigate("/time-select");
        } else {
          alert("ユーザ情報が存在しませんでした。");
        }
      }

      if (employee_code.length === 7) {
        getUserInfo();
      } else {
        navigate("/");
      }
    },
  });

  //暫定　「仮）QR読込」ボタン用処理
  const handleTentative = () => {
    async function getUserInfo() {
      setEmployeeCode("0000001"); //従業員コードを設定
      const URL = process.env.VITE_URL;
      const resultUserInfo = await fetch(URL + "/getUserInfo/0000001/20241201");
      const userInfos = await resultUserInfo.json();
      setUserInfos(userInfos.data[0] as UserInfos);
    }
    getUserInfo();
    navigate("/time-select");
  };

  return (
    <>
      <button onClick={handleTentative}>動作確認用）QR読込と同等ボタン</button>
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
