import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Mode = "studio" | "dev";

const STORAGE_KEY = "vg.mode";
const TRANSITION_MS = 2400;
const APPLY_AT_MS = 1100;

type ModeContextValue = {
  mode: Mode;
  isDev: boolean;
  setMode: (mode: Mode) => void;
  toggle: () => void;
  /** target mode while the loading overlay is up; null when idle */
  transitioningTo: Mode | null;
  /** increments on every switch  -  remounts the overlay */
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

function preferReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>(detectMode);
  const [switchCount, setSwitchCount] = useState(0);
  const [transitioningTo, setTransitioningTo] = useState<Mode | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const applyMode = useCallback((next: Mode) => {
    setModeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode */
    }
  }, []);

  const setMode = useCallback(
    (next: Mode) => {
      if (next === mode || transitioningTo) return;

      if (preferReducedMotion()) {
        applyMode(next);
        setSwitchCount((c) => c + 1);
        return;
      }

      clearTimers();
      setTransitioningTo(next);
      setSwitchCount((c) => c + 1);

      timers.current.push(
        window.setTimeout(() => {
          applyMode(next);
        }, APPLY_AT_MS),
      );
      timers.current.push(
        window.setTimeout(() => {
          setTransitioningTo(null);
          timers.current = [];
        }, TRANSITION_MS),
      );
    },
    [mode, transitioningTo, applyMode, clearTimers],
  );

  const toggle = useCallback(() => {
    setMode(mode === "dev" ? "studio" : "dev");
  }, [mode, setMode]);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.content = mode === "dev" ? "#0b1d3a" : "#f7f3ec";
    const url = new URL(window.location.href);
    if (mode === "dev") url.searchParams.set("dev", "1");
    else url.searchParams.delete("dev");
    window.history.replaceState(null, "", url);
  }, [mode]);

  const value = useMemo(
    () => ({ mode, isDev: mode === "dev", setMode, toggle, transitioningTo, switchCount }),
    [mode, setMode, toggle, transitioningTo, switchCount],
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}
