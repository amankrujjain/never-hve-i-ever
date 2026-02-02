import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { SoundPressable } from "./SoundPressable";
import { useSound } from "../context/SoundContext";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  showBack?: boolean;
  showMenu?: boolean;
  onMenuPress?: () => void;
};

export function AppHeader({
  showBack = true,
  showMenu = true,
  onMenuPress,
}: Props) {
  const router = useRouter();
  const { enabled, toggle } = useSound();

  return (
    <View style={styles.container}>
      {/* Back */}
      {showBack ? (
        <SoundPressable
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/"); // fallback safety
            }
          }}
          style={styles.iconBtn}
        >
          <Ionicons
            name="arrow-back"
            size={26}
            color="#080808"
          />
        </SoundPressable>
      ) : (
        <View style={styles.placeholder} />
      )}

      {/* Right Actions */}
      <View style={styles.right}>
        <SoundPressable style={styles.iconBtn} onPress={toggle}>
          <Ionicons
            name={enabled ? "volume-high" : "volume-mute"}
            size={26}
            color="#080808"
          />
        </SoundPressable>

        {showMenu && (
          <SoundPressable
            style={styles.iconBtn}
            onPress={onMenuPress}
          >
            <Ionicons
              name="menu"
              size={26}
              color="#080808"
            />
          </SoundPressable>
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 45,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 50,
  },
  right: {
    flexDirection: "row",
    gap: 12,
  },
  iconBtn: {
    padding: 6, // 👈 increases touch area
    borderRadius: 20,
  backgroundColor: "rgba(255, 255, 255, 0.99)",
  },
  backIcon: {
    width: 48,
    height: 28,
    tintColor: "#050505", // remove if image already white
  },
  icon: {
    fontSize: 22,
    color: "#030303",
  },
  placeholder: {
    width: 32,
    height: 32,
  },
});

