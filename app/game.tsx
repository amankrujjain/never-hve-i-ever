import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";

import { SoundPressable } from "../components/SoundPressable";
import { AppHeader } from "../components/AppHeader";
import { useGame } from "../context/GameContext";
import { QUESTIONS } from "../data/questions";
import { useAndroidBack } from "../hooks/useAndroidBack";
import { AppMenu } from "../components/AppMenu";

/* ===================== UTILS ===================== */

function shuffle<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

/* ===================== SCREEN ===================== */

export default function GameScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();
  const { state } = useGame();

  const [questions, setQuestions] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔥 Animation values
  const opacity = useState(new Animated.Value(1))[0];
  const translateY = useState(new Animated.Value(0))[0];

  /* ---------- Load questions ---------- */
  useEffect(() => {
    if (category === "custom") {
      setQuestions(shuffle(state.customQuestions || []));
      setIndex(0);
    } else if (category && QUESTIONS[category]) {
      setQuestions(shuffle(QUESTIONS[category]));
      setIndex(0);
    } else {
      setQuestions([]);
    }
  }, [category, state.customQuestions]);

  /* ---------- Android back ---------- */
useAndroidBack(() => {
  if (router.canGoBack()) {
    router.back();
    return true; // we handled it
  }

  return false; // let Android handle (exit app)
});


  /* ---------- Next / Restart ---------- */
  const nextQuestion = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Fade out + move up
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -12,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Change question AFTER animation
      if (index + 1 >= questions.length) {
        setQuestions(shuffle(questions));
        setIndex(0);
      } else {
        setIndex(index + 1);
      }

      // Reset position for incoming question
      translateY.setValue(12);

      // Fade in + move to center
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  /* ---------- Empty state ---------- */
  if (!questions.length) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>No questions found</Text>
      </View>
    );
  }

  /* ===================== UI ===================== */

  return (
<LinearGradient
  colors={["#fdbd11", "#fdbd11"]}
  style={styles.container}
>
  <AppHeader onMenuPress={() => setMenuOpen(true)} />

  <View style={styles.content}>
    {/* Speech Bubble Logo */}
    <View style={styles.logoWrapper}>
      <View style={styles.logoBubble}>
        <Text style={styles.logoSmall}>NEVER</Text>
        <Text style={styles.logoMid}>HAVE I</Text>
        <Text style={styles.logoBig}>EVER</Text>
      </View>

      {/* Bubble tail */}
      <View style={styles.bubbleTail} />
    </View>

    {/* Card */}
    <View style={styles.card}>
      <Animated.View
        style={{ opacity, transform: [{ translateY }] }}
      >
        <Text style={styles.question}>
          {questions[index].toUpperCase()}
        </Text>
      </Animated.View>
    </View>

    {/* Next / Restart Button */}
    <SoundPressable
      style={styles.nextBtn}
      onPress={nextQuestion}
    >
      <Text style={styles.nextText}>
        {index + 1 === questions.length ? "RESTART" : "NEXT"}
      </Text>
    </SoundPressable>
  </View>

  <AppMenu
    visible={menuOpen}
    onClose={() => setMenuOpen(false)}
  />
</LinearGradient>

  );
}

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    paddingHorizontal: 20,
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  glowBorder: {
    borderRadius: 28,
    padding: 2.5,
    marginBottom: 28,
        shadowColor: "#000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 10
  },

  label: {
    color: "#94a3b8",
    fontSize: 13,
    letterSpacing: 1,
    marginBottom: 18,
    textAlign: "center",
  },


  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#020617",
  },

  logoWrapper: {
  alignItems: "center",
  marginBottom: 28,
  transform: [{ rotate: "-2deg" }],
},

logoBubble: {
  backgroundColor: "#fff",
  borderRadius: 40,
  borderWidth: 6,
  borderColor: "#000",
  paddingHorizontal: 28,
  paddingVertical: 16,
  alignItems: "center",
},

logoSmall: {
  fontSize: 34,
  fontWeight: "900",
  color: "#000",
  marginBottom: -4,
},

logoMid: {
  fontSize: 30,
  fontWeight: "900",
  color: "#000",
  marginBottom: -6,
},

logoBig: {
  fontSize: 44,
  fontWeight: "900",
  color: "#000",
},

bubbleTail: {
  width: 20,
  height: 20,
  backgroundColor: "#fff",
  borderRightWidth: 6,
  borderBottomWidth: 6,
  borderColor: "#000",
  transform: [{ rotate: "45deg" }],
  marginTop: -4,
},

card: {
  backgroundColor: "#fff",
  borderRadius: 26,
  minHeight: 220,
  justifyContent: "center",
  padding: 28,
  marginBottom: 24,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.25,
  shadowRadius: 6,
  elevation: 8,
},

question: {
  fontSize: 26,
  fontWeight: "900",
  color: "#1a1a1a",
  textAlign: "center",
  lineHeight: 36,
},

nextBtn: {
  backgroundColor: "#8cc63f",
  paddingVertical: 18,
  borderRadius: 18,
  shadowColor: "#6b9930",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 6,
},

nextText: {
  color: "#fff",
  fontSize: 26,
  fontWeight: "900",
  textAlign: "center",
  letterSpacing: 1,
},

});
