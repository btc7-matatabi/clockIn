import React from "react";

export const RadioButtonSection: React.FC<{
  genreOfClockIn: string;
  handleGenreChange: (val: string) => void;
}> = ({ genreOfClockIn, handleGenreChange }) => {
  const radioButtons = [
    { label: "始業", value: "start" },
    { label: "終業", value: "end" },
  ];
  return radioButtons.map((radio) => {
    return (
      <span
        key={radio.value}
        style={{
          display: "flex",
          alignItems: "center",
            flexDirection: "row",
            margin: "20px 30px 0 10px",
            gap:"20px"
        }}
      >
        <input
          id={radio.value}
          type="radio"
          value={radio.value}
          checked={radio.value === genreOfClockIn}
          onChange={(e) => handleGenreChange(e.target.value)}
          style={{
            transform: "scale(3)",
             // marginRight: "10px",
          }}
        />
        <label htmlFor={radio.value} className="form-check-label"
               style={{
                   display: "inline-flex", // ラベルをインラインでflexにする
                   alignItems: "center",  // ラベルの縦揃え
                   whiteSpace: "nowrap", // ラベル内で文字が折り返されないようにする
                   writingMode: "horizontal-tb", // 横書きにする（縦書きを防ぐ）
               }}>
          {radio.label}
        </label>
      </span>
    );
  });
};
