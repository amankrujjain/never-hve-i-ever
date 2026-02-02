import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppHeader } from "../components/AppHeader";

export default function HowToPlayScreen() {
  return (
    <LinearGradient colors={["#020617", "#030712"]} style={styles.container}>
      <AppHeader />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>How to Play</Text>

        <Text style={styles.text}>
          Never Have I Ever is a fun party game where players take turns reading
          statements.
        </Text>

        <Text style={styles.text}>
          If the statement applies to you, take a sip, do a dare, or lose a
          point — whatever your group decides.
        </Text>

        <Text style={styles.subtitle}>How it works</Text>

        <Text style={styles.text}>• Choose a category</Text>
        <Text style={styles.text}>• Read the card out loud</Text>
        <Text style={styles.text}>
          • Players who have done it react
        </Text>
        <Text style={styles.text}>• Tap Next for the next question</Text>

        <Text style={styles.subtitle}>Custom Mode</Text>

        <Text style={styles.text}>
          Create your own questions and play with friends using inside jokes or
          personal challenges.
        </Text>

        <Text style={styles.text}>
          Play responsibly and respect everyone’s comfort level.
        </Text>
      </ScrollView>
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
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#e5e7eb",
    marginTop: 20,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: "#cbd5f5",
    lineHeight: 24,
    marginBottom: 10,
  },
});
