import { createContext, useContext, useState } from "react";

type SoundContextType = {
  enabled: boolean;
  toggle: () => void;
};

const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);

  const toggle = () => setEnabled((s) => !s);

  return (
    <SoundContext.Provider value={{ enabled, toggle }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be inside SoundProvider");
  return ctx;
}
