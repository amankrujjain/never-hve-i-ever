import AsyncStorage from "@react-native-async-storage/async-storage";

const MAX_PROMPTS = 3;
const PROMPT_INTERVAL = 72 * 60 * 60 * 1000; // 72 hours

const KEYS = {
  HAS_RATED: "has_rated",
  PROMPT_COUNT: "rating_prompt_count",
  LAST_PROMPT_TIME: "last_rating_prompt_time",
};

/**
 * Check if we are allowed to show rating modal
 */
export async function canShowRatingPrompt(): Promise<boolean> {
  const hasRated = await AsyncStorage.getItem(KEYS.HAS_RATED);
  if (hasRated === "true") return false;

  const count = Number(
    (await AsyncStorage.getItem(KEYS.PROMPT_COUNT)) ?? 0
  );
  if (count >= MAX_PROMPTS) return false;

  const lastTime = Number(
    (await AsyncStorage.getItem(KEYS.LAST_PROMPT_TIME)) ?? 0
  );

  const now = Date.now();
  if (now - lastTime < PROMPT_INTERVAL) return false;

  return true;
}

/**
 * Record that rating modal was shown
 */
export async function recordRatingPromptShown() {
  const count = Number(
    (await AsyncStorage.getItem(KEYS.PROMPT_COUNT)) ?? 0
  );

  await AsyncStorage.multiSet([
    [KEYS.PROMPT_COUNT, String(count + 1)],
    [KEYS.LAST_PROMPT_TIME, String(Date.now())],
  ]);
}

/**
 * Call this when user gives 4★ or 5★
 */
export async function markUserAsRated() {
  await AsyncStorage.setItem(KEYS.HAS_RATED, "true");
}
