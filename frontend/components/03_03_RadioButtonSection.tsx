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
          margin: "20px 30px 0 10px",
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
            marginRight: "30px",
          }}
        />
        <label htmlFor={radio.value} className="form-check-label">
          {radio.label}
        </label>
      </span>
    );
  });
};
