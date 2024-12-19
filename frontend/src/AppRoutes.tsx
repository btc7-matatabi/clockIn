import { Route, Routes } from 'react-router-dom';
import { InitialScreen } from '../components/InitialScreen';
import { QrScanScreen } from '../components/QrScanScreen';
import { SelectClockinTypeScreen } from '../components/SelectClockinTypeScreen';
import { TimeSelectScreen } from '../components/TimeSelectScreen';
import { EndDisplayScreen } from '../components/EndDisplayScreen';

function AppRoutes() {
    return (
            <Routes>
                <Route path="/" element={<InitialScreen />} />
                <Route path="/qr-scan" element={<QrScanScreen />} />
                <Route path="/select-cloclin-type" element={<SelectClockinTypeScreen/>} />
                <Route path="/time-select" element={<TimeSelectScreen/>} />
                <Route path="/end-display" element={<EndDisplayScreen/>} />
            </Routes>
    );
}

export default AppRoutes;
