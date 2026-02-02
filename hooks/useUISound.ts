import { useEffect, useRef } from "react";
import { Audio } from "expo-av";

export function useUISound(
  source: any,
  enabled: boolean,
  volume = 0.6
) {
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { sound } = await Audio.Sound.createAsync(source, {
        volume,
          shouldPlay: false,
          isLooping: false,
      });
      if (mounted) soundRef.current = sound;
    })();

    return () => {
      mounted = false;
      soundRef.current?.unloadAsync();
    };
  }, [source, volume]);

const play = async () => {
  if (!enabled || !soundRef.current) return;

  try {
    await soundRef.current.setPositionAsync(0);
    await soundRef.current.playAsync();
  } catch {}
};


  return { play };
}
