import { Pressable, PressableProps } from "react-native";
import { useUISound } from "../hooks/useUISound";
import { useSound } from "../context/SoundContext";

export function SoundPressable({
  onPress,
  ...props
}: PressableProps) {
  const { enabled } = useSound();
  const { play } = useUISound(
    require("../assets/sound/button-click-289742.mp3"),
    enabled
  );

  return (
    <Pressable
      {...props}
      onPress={async (e) => {
        await play();
        onPress?.(e);
      }}
    />
  );
}
