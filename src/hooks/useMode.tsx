import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Mode = "studio" | "dev";

const STORAGE_KEY = "vg.mode";

type ModeContextValue = {
  mode: Mode;
  isDev: boolean;
  setMode: (mode: Mode) => void;
  toggle: () => void;
  /** increments on every switch — used to re-trigger the flash overlay */
  switchCount: number;
};

const ModeContext = createContext<ModeContextValue | null>(null);

function detectMode(): Mode {
  if (typeof window === "undefined") return "studio";
  const params = new URLSearchParams(window.location.search);
  if (params.get("dev") === "1" || window.location.hash === "#dev") return "dev";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dev" || stored === "studio") return stored;
  } catch {
    /* private mode */
  }
  return "studio";
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>(detectMode);
  const [switchCount, setSwitchCount] = useState(0);

  const setMode = useCallback((next: Mode) => {
    setModeState((prev) => {
      if (prev !== next) setSwitchCount((c) => c + 1);
      return next;
    });
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode */
    }
  }, []);

  const toggle = useCallback(() => {
    setMode(mode === "dev" ? "studio" : "dev");
  }, [mode, setMode]);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.content = mode === "dev" ? "#0b1d3a" : "#fbf7f0";
    const url = new URL(window.location.href);
    if (mode === "dev") url.searchParams.set("dev", "1");
    else url.searchParams.delete("dev");
    window.history.replaceState(null, "", url);
  }, [mode]);

  const value = useMemo(
    () => ({ mode, isDev: mode === "dev", setMode, toggle, switchCount }),
    [mode, setMode, toggle, switchCount],
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}
