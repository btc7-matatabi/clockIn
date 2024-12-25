import { useState } from "react";
import TimePicker from "react-time-picker";
// import "react-time-picker/dist/TimePicker.css";

export function TimePickerTest() {
  const [value, setValue] = useState<string>("10:00");
  const handleChange = (newTime: string) => {
    setValue(newTime);
  };

  return (
    <div>
      <button onClick={() => alert("Selected time: " + value)}>
        時間を選択
      </button>
      <TimePicker
        onChange={handleChange}
        value={value}
        disableClock
        clearIcon={null}
      />
      <p>選択された時間: {value}</p>
    </div>
  );
}
