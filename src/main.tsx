import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/App";
import { ContactSheetProvider } from "@/hooks/useContactSheet";
import { I18nProvider } from "@/hooks/useI18n";
import { ModeProvider } from "@/hooks/useMode";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModeProvider>
      <I18nProvider>
        <ContactSheetProvider>
          <App />
        </ContactSheetProvider>
      </I18nProvider>
    </ModeProvider>
  </StrictMode>,
);
