import { useZxing } from "react-zxing";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { employeeCodeAtom, UserInfos, userInfosAtom } from "../src/atoms";
import { Box, Typography } from "@mui/material";
import { AppToolBar } from "../src/AppToolBar.tsx";

export function QrScanScreen() {
  const navigate = useNavigate();
  const [, setEmployeeCode] = useAtom(employeeCodeAtom);
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);

  const { ref } = useZxing({
    onDecodeResult(result) {
      const employee_code = result.getText();
      setEmployeeCode(employee_code); //従業員コードを設定

      async function getUserInfo() {
        const URL = process.env.VITE_URL;
        console.log(URL + "/getUserInfo/" + employee_code);
        const resultUserInfo = await fetch(
          URL + "/getUserInfo/" + employee_code,
        );
        const userInfos = await resultUserInfo.json();
        setUserInfos(userInfos.data[0] as UserInfos);

        //⭐️useInfosのデータが更新されていないため、元のデータで判定
        if (!userInfos.data.name) {
          navigate("/time-select");
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
  const handleTemtative = () => {
    async function getUserInfo() {
      const URL = process.env.VITE_URL;
      const resultUserInfo = await fetch(URL + "/getUserInfo/0000001");
      const userInfos = await resultUserInfo.json();
      setUserInfos(userInfos.data[0] as UserInfos);
    }
    getUserInfo();
    navigate("/time-select");
  };

  return (
    <>
      <button onClick={handleTemtative}>動作確認用）QR読込と同等ボタン</button>

      <Box>
        <AppToolBar />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
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
          </Box>

          <video
            ref={ref}
            style={{
              width: "100%",
              borderRadius: "0 0 20px 20px",
            }}
          />
        </Box>
      </Box>
    </>
  );
}
