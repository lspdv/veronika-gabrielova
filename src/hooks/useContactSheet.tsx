import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ContactSheetContextValue = {
  open: boolean;
  openSheet: () => void;
  closeSheet: () => void;
};

const ContactSheetContext = createContext<ContactSheetContextValue | null>(null);

export function ContactSheetProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openSheet = useCallback(() => setOpen(true), []);
  const closeSheet = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openSheet, closeSheet }),
    [open, openSheet, closeSheet],
  );

  return (
    <ContactSheetContext.Provider value={value}>{children}</ContactSheetContext.Provider>
  );
}

export function useContactSheet() {
  const ctx = useContext(ContactSheetContext);
  if (!ctx) throw new Error("useContactSheet must be used within ContactSheetProvider");
  return ctx;
}
