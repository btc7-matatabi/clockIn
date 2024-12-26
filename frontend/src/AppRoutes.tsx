import { Route, Routes } from "react-router-dom";
import { InitialScreen } from "../components/01_InitialScreen.tsx";
import { QrScanScreen } from "../components/02_QrScanScreen.tsx";
import { TimeSelectScreen } from "../components/03_TimeSelectScreen.tsx";
import { EndScreen } from "../components/05_EndScreen.tsx";
import { ConfirmScreen } from "../components/04_Confirm.tsx";
import { Provider } from "jotai";

function AppRoutes() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<InitialScreen />} />
        <Route path="/qr-scan" element={<QrScanScreen />} />
        <Route path="/time-select" element={<TimeSelectScreen />} />
        <Route path="/confirm" element={<ConfirmScreen />} />
        <Route path="/end" element={<EndScreen />} />
      </Routes>
    </Provider>
  );
}

export default AppRoutes;
