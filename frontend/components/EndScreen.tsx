import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clockInTimeAtom, genreOfClockInAtm } from "../src/atoms";
import { useAtom } from "jotai/index";

export function EndScreen() {
  const [clockInTime] = useAtom(clockInTimeAtom);
  const [genreOfClockIn] = useAtom(genreOfClockInAtm);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);

  return (
    <>
      <p>
        {clockInTime} {genreOfClockIn}で登録しました
      </p>
    </>
  );
}