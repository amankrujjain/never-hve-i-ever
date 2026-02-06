import {
  View,
  Text,
  StyleSheet,
  Modal,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { SoundPressable } from "./SoundPressable";

interface ExitGameModalProps {
  visible: boolean;
  onCancel: () => void;
  onExit: () => void;
  onRated?: () => void; // 👈 parent decides what to do
}

export function ExitGameModal({
  visible,
  onCancel,
  onExit,
  onRated,
}: ExitGameModalProps) {
  const [rating, setRating] = useState(0);

  const handleExit = () => {
    if (rating >= 4) {
      onRated?.(); // just notify
    }
    onExit();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <LinearGradient
          colors={["#020617", "#030712"]}
          style={styles.card}
        >
          <Text style={styles.title}>Exit Game?</Text>

          <Text style={styles.subtitle}>
            Enjoying the game? Rate us ⭐
          </Text>

          {/* ⭐ Rating stars */}
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <SoundPressable
                key={star}
                onPress={() => setRating(star)}
                hitSlop={10}
              >
                <Text
                  style={[
                    styles.star,
                    star <= rating && styles.starActive,
                  ]}
                >
                  ★
                </Text>
              </SoundPressable>
            ))}
          </View>

          {/* Buttons */}
          <View style={styles.actions}>
            <SoundPressable
              style={[styles.button, styles.cancelBtn]}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </SoundPressable>

            <SoundPressable
              style={[styles.button, styles.exitBtn]}
              onPress={handleExit}
            >
              <Text style={styles.exitText}>Exit</Text>
            </SoundPressable>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 22,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#cbd5f5",
    textAlign: "center",
    marginBottom: 14,
  },
  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  star: {
    fontSize: 36,
    color: "#475569",
  },
  starActive: {
    color: "#facc15",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: Platform.OS === "ios" ? 14 : 12,
    borderRadius: 14,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#1e293b",
  },
  exitBtn: {
    backgroundColor: "#dc2626",
  },
  cancelText: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "600",
  },
  exitText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
