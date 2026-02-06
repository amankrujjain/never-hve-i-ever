import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  BackHandler,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SoundPressable } from "../components/SoundPressable";
import { AppHeader } from "../components/AppHeader";
import { useEffect, useState } from "react";
import { AppMenu } from "@/components/AppMenu";
import { ExitGameModal } from "../components/ExitGameModal";

import {
  canShowRatingPrompt,
  recordRatingPromptShown,
} from "../services/rating-service";

const CATEGORIES = [
  {
    key: "party",
    image: require("../assets/categories/party.webp"),
    type: "preset",
    ratio: 1.5,
  },
  {
    key: "fun",
    image: require("../assets/categories/fun.webp"),
    type: "preset",
    ratio: 1.5,
  },
  {
    key: "spicy",
    image: require("../assets/categories/spicy.webp"),
    type: "preset",
    ratio: 1.5,
  },
  {
    key: "adult",
    image: require("../assets/categories/adult.webp"),
    type: "preset",
    ratio: 1.5,
  },
  {
    key: "custom",
    image: require("../assets/categories/custom.webp"),
    type: "custom",
    ratio: 1.78,
  },
];

export default function CategoriesScreen() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showExit, setShowExit] = useState(false);

  /**
   * 🔙 ANDROID BACK HANDLER
   */
  useEffect(() => {
    const onBackPress = () => {
      // If modal already open → close it
      if (showExit) {
        setShowExit(false);
        return true;
      }

      canShowRatingPrompt().then((canShow) => {
        if (!canShow) {
          BackHandler.exitApp();
          return;
        }

        recordRatingPromptShown().then(() => {
          setShowExit(true);
        });
      });

      return true;
    };

    const sub = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => sub.remove();
  }, [showExit]);

  const onPressCategory = (cat: (typeof CATEGORIES)[number]) => {
    if (cat.type === "custom") {
      router.push("/custom-category");
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
      <AppHeader showBack={false} onMenuPress={() => setMenuOpen(true)} />
      <AppMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />

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
            />
          </SoundPressable>
        )}
      />

      <ExitGameModal
        visible={showExit}
        onCancel={() => setShowExit(false)}
        onExit={() => BackHandler.exitApp()}
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
  },
  imageRadius: {
    borderRadius: 18,
  },
});
