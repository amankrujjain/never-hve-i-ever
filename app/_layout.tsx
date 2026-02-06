import { Stack } from "expo-router";
import { SoundProvider } from "../context/SoundContext";
import { GameProvider } from "../context/GameContext";
import { useEffect } from "react";
import {
  Audio,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from "expo-av";
import { MusicProvider } from "../context/MusicContext";


export default function Layout() {
  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      shouldDuckAndroid: false,
      staysActiveInBackground: false,
    });
  }, []);

return (
    <SoundProvider>
      <MusicProvider>
        <GameProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
        </GameProvider>
      </MusicProvider>
    </SoundProvider>
  );
}
