import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SoundPressable } from "../components/SoundPressable";
import { useSound } from "../context/SoundContext";
import { AppHeader } from "../components/AppHeader";
import { useState } from "react";
import { AppMenu } from "@/components/AppMenu";


const CATEGORIES = [
  {
    key: "party",
    label: "🎉 Party",
    image: require("../assets/categories/party.png"),
    type: "preset",
    ratio: 1.5,
  },
  {
    key: "fun",
    label: "😂 Fun",
    image: require("../assets/categories/fun.png"),
    type: "preset",
    ratio: 1.5,
  },
  {
    key: "spicy",
    label: "🌶 Spicy",
    image: require("../assets/categories/spicy.png"),
    type: "preset",
    ratio: 1.5,
  },
  {
    key: "adult",
    label: "🧑‍🤝‍🧑 Adult",
    image: require("../assets/categories/adult.png"),
    type: "preset",
    ratio: 1.5,
  },
  {
    key: "custom",
    label: "➕ Custom",
    image: require("../assets/categories/custom.png"),
    type: "custom",
    ratio: 1.78,
  },
];


export default function CategoriesScreen() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const onPressCategory = (cat: (typeof CATEGORIES)[number]) => {
    if (cat.type === "custom") {
      router.push({ pathname: "/custom-category" });
    } else {
      router.push({
        pathname: "/game",
        params: { category: cat.key },
      });
    }
  };

  return (
    <LinearGradient
      colors={["#fdbd11", "#fdbd11"]}
      style={styles.container}
    >
      <AppHeader onMenuPress={() => setMenuOpen(true)} />
      <AppMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
      />


      {/* 🔙 Back */}
      {/* <SoundPressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>← Back</Text>
      </SoundPressable>

      {/* 🔊 Sound */}
      {/* <SoundPressable onPress={toggle} style={styles.soundBtn}>
        <Text style={styles.soundIcon}>
          {enabled ? "🔊" : "🔇"}
        </Text>
      </SoundPressable>  */}

      <Text style={styles.title}>Choose Category</Text>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.key}
        numColumns={2}
        columnWrapperStyle={{ gap: 14 }}
        contentContainerStyle={{ gap: 14, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <SoundPressable
            style={[styles.card, { aspectRatio: item.ratio }]}
            onPress={() => onPressCategory(item)}
          >
            <ImageBackground
              source={item.image}
              style={styles.image}
              imageStyle={styles.imageRadius}
            >
              {/* <Text style={styles.cardText}>{item.label}</Text> */}
            </ImageBackground>
          </SoundPressable>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    paddingHorizontal: 20,
  },
  backBtn: {
    position: "absolute",
    top: 45,
    left: 20,
  },
  backText: {
    color: "#4ade80",
    fontSize: 18,
  },
  soundBtn: {
    position: "absolute",
    top: 45,
    right: 20,
  },
  soundIcon: {
    fontSize: 22,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#080808",
    marginBottom: 28,
  },
  card: {
    flex: 1,
    borderRadius: 18,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: "100%",
  height: "100%",
    justifyContent: "flex-end",
  },
  imageRadius: {
    borderRadius: 18,
  },
  cardText: {
    color: "#080808",
    fontSize: 18,
    fontWeight: "700",
    padding: 12,
  },
});
