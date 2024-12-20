import { useZxing } from "react-zxing";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { employeeCodeAtom, UserInfos, userInfosAtom } from "../src/atoms";

export function QrScanScreen() {
  const navigate = useNavigate();
  const [, setEmployeeCode] = useAtom(employeeCodeAtom);
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const { ref } = useZxing({
    onDecodeResult(result) {
      const employee_code = result.getText();
      setEmployeeCode(employee_code);
      if (employee_code.length === 7) {
        async function getUserInfo() {
          const URL = process.env.VITE_URL;
          console.log(URL + "/getUserInfo/" + employee_code);
          const resultUserInfo = await fetch(
            URL + "/getUserInfo/" + employee_code,
          );
          const userInfos = await resultUserInfo.json();
          console.log("🍎", userInfos.data);
          setUserInfos(userInfos.data[0] as UserInfos);
          //ユーザが存在していたら次の画面に遷移
          if (!userInfos.data.name) {
            navigate("/time-select");
          } else {
            alert("ユーザ情報が存在しませんでした。");
          }
        }
        getUserInfo();
      } else {
        navigate("/");
      }
    },
  });
  const handleClose = () => {
    navigate("/");
  };

  const handleTemtative = () => {
    navigate("/time-select");
  };
  return (
    <>
      <div>
        <p>QRコードを読み込ませてください</p>
        <button onClick={handleClose}>✖️</button>
        <button onClick={handleTemtative}>仮）QR読込</button>
      </div>
      <video ref={ref} />
    </>
  );
}
