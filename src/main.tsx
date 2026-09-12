import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/App";
import { I18nProvider } from "@/hooks/useI18n";
import { ModeProvider } from "@/hooks/useMode";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModeProvider>
      <I18nProvider>
        <App />
      </I18nProvider>
    </ModeProvider>
  </StrictMode>,
);
