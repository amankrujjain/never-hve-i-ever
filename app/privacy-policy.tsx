import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppHeader } from "../components/AppHeader";
import { AppMenu } from "../components/AppMenu";
import { useState } from "react";

export default function PrivacyPolicyScreen() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <LinearGradient colors={["#020617", "#030712"]} style={styles.container}>
      <AppHeader />
      <AppMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Privacy Policy</Text>

        <Text style={styles.text}>
          This Privacy Policy explains how{" "}
          <Text style={styles.bold}>Never Have I Ever</Text>{" "}
          handles user information.
        </Text>

        <Text style={styles.heading}>Information Collection</Text>
        <Text style={styles.text}>
          This app does not collect, store, or share any personal
          information. No user accounts or personal data are
          required to use the app.
        </Text>

        <Text style={styles.heading}>Usage Data</Text>
        <Text style={styles.text}>
          The app does not track user activity, gameplay behavior,
          or usage patterns. All gameplay happens locally on your
          device.
        </Text>

        <Text style={styles.heading}>Third-Party Services</Text>
        <Text style={styles.text}>
          This app does not use third-party analytics, advertising,
          or tracking services.
        </Text>

        <Text style={styles.heading}>Age Restriction</Text>
        <Text style={styles.text}>
          This app is intended for users aged 18 and above and
          contains mature content designed for adults.
        </Text>

        <Text style={styles.heading}>Data Security</Text>
        <Text style={styles.text}>
          Since no personal data is collected, there is no risk of
          personal data exposure through the app.
        </Text>

        <Text style={styles.heading}>Changes to This Policy</Text>
        <Text style={styles.text}>
          This policy may be updated in the future. Any changes
          will be reflected within the app.
        </Text>

        <Text style={styles.footer}>
          Last updated: {new Date().getFullYear()}
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
  heading: {
    fontSize: 17,
    fontWeight: "700",
    color: "#e5e7eb",
    marginTop: 20,
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    color: "#cbd5f5",
    lineHeight: 24,
    marginBottom: 12,
  },
  bold: {
    fontWeight: "700",
    color: "#ffffff",
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
  },
});
