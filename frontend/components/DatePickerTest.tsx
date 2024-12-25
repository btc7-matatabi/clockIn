import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DatePickerTest() {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <div style={{ margin: "20px" }}>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        dateFormat="yyyy/MM/dd"
        placeholderText="日付を選択"
      />
      <div>
        {startDate ? (
          <p>選択された日付: {startDate.toLocaleDateString()}</p>
        ) : (
          <p>日付が選択されていません</p>
        )}
      </div>
    </div>
  );
}
