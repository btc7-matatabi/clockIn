import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai/index";
import {
  clockInTimeAtom,
  genreOfClockInAtm,
  orverTimeAtom,
} from "../src/atoms.ts";

export function ConfirmScreen() {
  const navigate = useNavigate();
  const [overTime] = useAtom(orverTimeAtom); //残業時間
  const [clockInTime] = useAtom(clockInTimeAtom); //打刻時間
  const [genreOfClockIn] = useAtom(genreOfClockInAtm); //打刻分類（始業or終業)

  useEffect(() => {}, []);
  const handleCancel = () => {
    navigate("/time-select");
  };
  const handleSend = () => {
    async function sendRecord() {
      const URL = process.env.VITE_URL;
      const url = URL + "/attendance-time/";
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // employee_code: ,
          // start_date: ,
        }),
      };
      const res = await fetch(url, params);
      const body = await res.json();
      console.log("res:", body);
    }
    sendRecord();
    navigate("/end");
  };
  return (
    <>
      <div>
        <p>
          {clockInTime} {genreOfClockIn}
        </p>
        <p>（残業 {overTime}）</p>
        <p>送信しますか？</p>
        <button onClick={handleCancel}>キャンセル</button>
        <button onClick={handleSend}>送信</button>
      </div>
    </>
  );
}
