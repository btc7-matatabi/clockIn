import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./AppRoutes.tsx";
import { BrowserRouter } from "react-router-dom";
// import theme from "./style/thema.ts";
// import { ThemeProvider } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/*<ThemeProvider theme={theme}>*/}
      <AppRoutes />
      {/*</ThemeProvider>*/}
    </BrowserRouter>
  </StrictMode>,
);
