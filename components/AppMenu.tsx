import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import { SoundPressable } from "./SoundPressable";
import { useRouter } from "expo-router";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function AppMenu({ visible, onClose }: Props) {
  const router = useRouter();

  return (
    <Modal transparent animationType="slide" visible={visible}>
      {/* Overlay (tap outside to close) */}
      <Pressable style={styles.overlay} onPress={onClose}>
        {/* Sheet (prevent closing when tapping inside) */}
        <Pressable style={styles.sheet} onPress={() => {}}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Menu</Text>

            {/* Close icon */}
            <SoundPressable onPress={onClose} style={styles.closeIcon}>
              <Text style={styles.closeIconText}>✕</Text>
            </SoundPressable>
          </View>

          <SoundPressable
            style={styles.item}
            onPress={() => {
              onClose();
              router.push("/how-to-play");
            }}
          >
            <Text style={styles.itemText}>📖 How to Play</Text>
          </SoundPressable>

          <SoundPressable
            style={styles.item}
            onPress={() => {
              onClose();
              router.push("/about");
            }}
          >
            <Text style={styles.itemText}>ℹ️ About</Text>
          </SoundPressable>
          <SoundPressable
            style={styles.item}
            onPress={() => {
              onClose();
              router.push("/privacy-policy");
            }}
          >
            <Text style={styles.itemText}>📃 Privacy Policy</Text>
          </SoundPressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    backgroundColor: "#020617",
    padding: 20,
    paddingBottom: Platform.OS === "android" ? 32 : 20, // ✅ avoids nav bar
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  closeIcon: {
    padding: 6,
  },
  closeIconText: {
    fontSize: 22,
    color: "#cbd5f5",
  },
  item: {
    paddingVertical: 12,
  },
  itemText: {
    fontSize: 18,
    color: "#cbd5f5",
  },
});
