import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppHeader } from "../components/AppHeader";
import { AppMenu } from "../components/AppMenu";
import { useState } from "react";

export default function AboutScreen() {
      const [menuOpen, setMenuOpen] = useState(false);
    
  return (
    <LinearGradient colors={["#020617", "#030712"]} style={styles.container}>
      <AppHeader />
          <AppMenu
              visible={menuOpen}
              onClose={() => setMenuOpen(false)}
          />
      <View style={styles.content}>
        <Text style={styles.title}>About</Text>

        <Text style={styles.text}>
          Never Have I Ever is a casual party game designed to bring people
          together through fun, laughter, and honest moments.
        </Text>

        <Text style={styles.text}>
          This app was built with simplicity in mind — no signups, no accounts,
          just pick a category and play.
        </Text>

        <Text style={styles.text}>
          Whether you’re playing with friends, couples, or at a party, the goal
          is the same: enjoy the moment.
        </Text>

        <Text style={styles.footer}>
          Made with ❤️ for good vibes.
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: "#cbd5f5",
    lineHeight: 24,
    marginBottom: 12,
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
  },
});
