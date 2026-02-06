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
import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";


export default function Layout() {
  useEffect(() => {
  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync("#000000");
    NavigationBar.setButtonStyleAsync("light");
  }
}, []);
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
