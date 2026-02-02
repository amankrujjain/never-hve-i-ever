import {
  View,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Platform } from "react-native";

import { AppHeader } from "../components/AppHeader";
import { SoundPressable } from "../components/SoundPressable";
import { AppMenu } from "../components/AppMenu";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.screen}>
      {/* Background image */}
      <Image
        source={require("../assets/images/banner-2.png")}
        style={styles.background}
      />

      {/* Overlay UI */}
      <View style={StyleSheet.absoluteFill}>
        <AppHeader
          showBack={false}
          onMenuPress={() => setMenuOpen(true)}
        />

        {/* Play Button */}
        <View style={styles.playContainer}>
          <SoundPressable onPress={() => router.push("/categories")}>
            <Image
              source={require("../assets/images/play.png")}
              style={styles.playImage}
            />
          </SoundPressable>
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

playContainer: {
  position: "absolute",
 bottom: Platform.OS === "ios" ? 60 : 40,
  width: "100%",
  height: 260,         // 👈 reserved lane
  alignItems: "center",
  justifyContent: "center",
},

  playImage: {
width: Math.min(width * 1.1, 380),
    height: 360,              // ✅ EXPLICIT HEIGHT (Android-safe)
    resizeMode: "contain",
  },
});
