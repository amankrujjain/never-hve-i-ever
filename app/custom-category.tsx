import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SoundPressable } from "../components/SoundPressable";
import { useGame } from "../context/GameContext";
import { AppHeader } from "../components/AppHeader";
import { AppMenu } from "../components/AppMenu";

export default function CustomCategoryScreen() {
  const router = useRouter();
  const { actions } = useGame();

  const [input, setInput] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);


  const addQuestion = () => {
    if (!input.trim()) return;
    setQuestions((q) => [...q, input.trim()]);
    setInput("");
  };

  const saveEdit = () => {
    if (editingIndex === null || !input.trim()) return;
    setQuestions((q) =>
      q.map((item, i) => (i === editingIndex ? input.trim() : item))
    );
    setEditingIndex(null);
    setInput("");
  };

  const saveAndPlay = () => {
    actions.setCustomQuestions(questions);
    router.push({
      pathname: "/game",
      params: { category: "custom" },
    });
  };

  return (
    <LinearGradient colors={["#fdbd11", "#fdbd11"]} style={styles.container}>
      {/* ✅ Global Header */}
      <AppHeader onMenuPress={() => setMenuOpen(true)} />

      <AppMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <Text style={styles.title}>Custom Questions</Text>

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Never have I ever..."
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />

        <SoundPressable
          style={styles.addBtn}
          onPress={editingIndex === null ? addQuestion : saveEdit}
        >
          <Text style={styles.addText}>
            {editingIndex === null ? "Add" : "Save"}
          </Text>
        </SoundPressable>
      </View>

      <FlatList
        data={questions}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ marginTop: 20 }}
        renderItem={({ item, index }) => (
          <SoundPressable
            style={styles.questionCard}
            onPress={() => {
              setEditingIndex(index);
              setInput(item);
            }}
          >
            <Text style={styles.questionText}>{item}</Text>
          </SoundPressable>
        )}
      />
      <View style={styles.bottomArea}>
        <SoundPressable
          style={[
            styles.playBtn,
            questions.length === 0 && { opacity: 0.4 },
          ]}
          disabled={questions.length === 0}
          onPress={saveAndPlay}
        >
          <Text style={styles.playText}>Save & Play</Text>
        </SoundPressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120, // space for AppHeader
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: "#050505",
    fontWeight: "600",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#1e293b",
    color: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  addBtn: {
    backgroundColor: "#8cc63f",
    paddingHorizontal: 18,
    borderRadius: 12,
    justifyContent: "center",
    shadowColor: "#6b9930",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 6,
  },
  addText: {
    fontWeight: "600",
  },
  bottomArea: {
  paddingBottom: 50,
},
  questionCard: {
    backgroundColor: "#1e293b",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  questionText: {
    color: "#fff",
  },
  playBtn: {
    backgroundColor: "#8cc63f",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 20,
    shadowColor: "#6b9930",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 6,
  },
  playText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});
