import { useEffect } from "react";
import { BackHandler } from "react-native";

export function useAndroidBack(onBack: () => boolean) {
  useEffect(() => {
    const sub = BackHandler.addEventListener(
      "hardwareBackPress",
      onBack
    );
    return () => sub.remove();
  }, [onBack]);
}
