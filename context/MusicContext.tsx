import { createContext, useContext, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import { useSound } from "./SoundContext";

type MusicContextType = {
  play: () => void;
  stop: () => void;
};

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const { enabled } = useSound(); // reuse same mute toggle
  const musicRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sound/background-music.mp3"),
        {
          isLooping: true,
          volume: 0.25,
          shouldPlay: enabled,
        }
      );

      if (mounted) {
        musicRef.current = sound;
      }
    })();

    return () => {
      mounted = false;
      musicRef.current?.unloadAsync();
    };
  }, []);

  // React to mute / unmute
  useEffect(() => {
    if (!musicRef.current) return;

    if (enabled) {
      musicRef.current.playAsync();
    } else {
      musicRef.current.pauseAsync();
    }
  }, [enabled]);

  const play = async () => {
    await musicRef.current?.playAsync();
  };

  const stop = async () => {
    await musicRef.current?.pauseAsync();
  };

  return (
    <MusicContext.Provider value={{ play, stop }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside MusicProvider");
  return ctx;
}
