import { Route, Routes } from "react-router-dom";
import { InitialScreen } from "../components/InitialScreen";
import { QrScanScreen } from "../components/QrScanScreen";
import { TimeSelectScreen } from "../components/TimeSelectScreen";
import { EndScreen } from "../components/EndScreen.tsx";
import { ConfirmScreen } from "../components/Confirm.tsx";
import { Provider } from "jotai";
import { TimePickerTest } from "../components/TimePickerTest.tsx";

function AppRoutes() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<InitialScreen />} />
        <Route path="/qr-scan" element={<QrScanScreen />} />
        <Route path="/time-select" element={<TimeSelectScreen />} />
        <Route path="/confirm" element={<ConfirmScreen />} />
        <Route path="/end" element={<EndScreen />} />
        <Route path="/test" element={<TimePickerTest />} />
      </Routes>
    </Provider>
  );
}

export default AppRoutes;
