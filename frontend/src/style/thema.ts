import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Noto Sans JP", sans-serif',
  },
  palette: {
    primary: {
      main: "#D4B28B", // 落ち着いた薄い茶色
    },
    secondary: {
      main: "#B08A5D", // もう少し濃い茶色
    },
    background: {
      default: "#f5f5f5", // 背景色（薄いグレーやベージュ）
    },
    text: {
      primary: "#333333", // テキストカラー（ダークグレー）
    },
  },
});

export default theme;
