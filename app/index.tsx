import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { AppHeader } from "../components/AppHeader";
import { AppMenu } from "../components/AppMenu";

const { width } = Dimensions.get("window");

// 🔒 persists for the entire app session
let hasBooted = false;

export default function HomeScreen() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  /**
   * 🚫 HARD GUARD
   * If app already booted, never show Home again
   */
  useEffect(() => {
    if (hasBooted) {
      router.replace("/categories");
    }
  }, []);

  /**
   * ⏳ Loader (runs ONCE)
   */
  useEffect(() => {
    if (hasBooted) return;

    let value = 0;

    const interval = setInterval(() => {
      value += 5;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
        hasBooted = true;

        setTimeout(() => {
          router.replace("/categories");
        }, 300); // smooth transition
      }
    }, 100); // ~2 seconds total

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.screen}>
      {/* Background */}
      <Image
        source={require("../assets/images/banner-2.webp")}
        style={styles.background}
      />

      {/* Overlay UI */}
      <View style={StyleSheet.absoluteFill}>
        <AppHeader
          showBack={false}
          onMenuPress={() => setMenuOpen(true)}
        />

        {/* Loader */}
        <View style={styles.loaderContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>

          <Text style={styles.progressText}>
            {progress}%
          </Text>
        </View>
      </View>

      <AppMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000",
  },

  background: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  loaderContainer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 80 : 60,
    width: "100%",
    alignItems: "center",
  },

  progressBar: {
    width: width * 0.8,
    height: 14,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#22c55e",
    borderRadius: 20,
  },

  progressText: {
    marginTop: 10,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
