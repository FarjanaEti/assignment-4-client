export type MealBehaviorItem = {
  id: string;
  title: string;
  category?: string;
  cuisine?: string;
  dietType?: string;
  price?: number;
  image?: string;
  rating?: number;
  description?: string;
  updatedAt: number;
};

export type BehaviorState = {
  viewed: MealBehaviorItem[];
  cart: MealBehaviorItem[];
  wishlist: MealBehaviorItem[];
  ordered: MealBehaviorItem[];
  updatedAt: number;
};

export type RecommendationResult = MealBehaviorItem & {
  reason: string;
  score: number;
};

const STORAGE_KEY = "foodhub-behavior";
const MAX_TRACKED = 40;

const normalizeText = (value: string | undefined) => (value || "").toLowerCase();

const createMealSummary = (meal: any): MealBehaviorItem => ({
  id: meal.id ?? meal._id ?? "",
  title: meal.title ?? meal.name ?? "Unknown meal",
  category: meal.category?.name ?? meal.category ?? meal.categoryName ?? "",
  cuisine: meal.cuisine ?? meal.cuisineName ?? "",
  dietType: meal.dietType ?? meal.type ?? meal.foodType ?? "",
  price: meal.price ?? meal.cost ?? 0,
  image: meal.image ?? meal.photo ?? "",
  rating: meal.rating ?? meal.rate ?? undefined,
  description: meal.description ?? meal.summary ?? "",
  updatedAt: Date.now(),
});

const uniqueById = (items: MealBehaviorItem[]) => {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

export const getBehaviorState = (): BehaviorState => {
  if (typeof window === "undefined") {
    return {
      viewed: [],
      cart: [],
      wishlist: [],
      ordered: [],
      updatedAt: Date.now(),
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        viewed: [],
        cart: [],
        wishlist: [],
        ordered: [],
        updatedAt: Date.now(),
      };
    }
    const parsed = JSON.parse(raw) as BehaviorState;
    return {
      ...parsed,
      viewed: parsed.viewed || [],
      cart: parsed.cart || [],
      wishlist: parsed.wishlist || [],
      ordered: parsed.ordered || [],
      updatedAt: parsed.updatedAt || Date.now(),
    };
  } catch {
    return {
      viewed: [],
      cart: [],
      wishlist: [],
      ordered: [],
      updatedAt: Date.now(),
    };
  }
};

const saveBehaviorState = (state: BehaviorState) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event("foodhub-behavior-updated"));
};

const addItemToList = (list: MealBehaviorItem[], item: MealBehaviorItem) => {
  const filtered = list.filter((entry) => entry.id !== item.id);
  return uniqueById([item, ...filtered]).slice(0, MAX_TRACKED);
};

const removeItemFromList = (list: MealBehaviorItem[], item: MealBehaviorItem) => {
  return list.filter((entry) => entry.id !== item.id);
};

export function trackMealEvent(type: "viewed" | "cart" | "wishlist" | "wishlist_remove" | "ordered", meal: any) {
  if (typeof window === "undefined") return;
  const summary = createMealSummary(meal);
  const current = getBehaviorState();
  let next: BehaviorState = { ...current, updatedAt: Date.now() };

  if (type === "viewed") {
    next.viewed = addItemToList(current.viewed, summary);
  }

  if (type === "cart") {
    next.cart = addItemToList(current.cart, summary);
  }

  if (type === "wishlist") {
    next.wishlist = addItemToList(current.wishlist, summary);
  }

  if (type === "wishlist_remove") {
    next.wishlist = removeItemFromList(current.wishlist, summary);
  }

  if (type === "ordered") {
    next.ordered = addItemToList(current.ordered, summary);
  }

  saveBehaviorState(next);
}

const splitWords = (text: string) =>
  text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2);

const buildPreferenceSignature = (items: MealBehaviorItem[]) => {
  const categoryCount: Record<string, number> = {};
  const keywordCount: Record<string, number> = {};
  const dietCount: Record<string, number> = {};

  items.forEach((item) => {
    const category = normalizeText(item.category);
    if (category) categoryCount[category] = (categoryCount[category] || 0) + 1;

    const diet = normalizeText(item.dietType);
    if (diet) dietCount[diet] = (dietCount[diet] || 0) + 1;

    const words = [item.title, item.description, item.category, item.cuisine, item.dietType]
      .filter(Boolean)
      .join(" ");
    splitWords(words).forEach((word) => {
      keywordCount[word] = (keywordCount[word] || 0) + 1;
    });
  });

  return { categoryCount, keywordCount, dietCount };
};

const pickTopKeys = (map: Record<string, number>, count: number) =>
  Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([key]) => key);

const safeMealId = (meal: any) => meal.id ?? meal._id ?? "";

const mealMatchesKeyword = (meal: MealBehaviorItem, keyword: string) => {
  const text = [meal.title, meal.category, meal.cuisine, meal.dietType, meal.description]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return text.includes(keyword.toLowerCase());
};

const mealIsHealthy = (meal: MealBehaviorItem) => {
  const healthyWords = ["healthy", "salad", "vegan", "veg", "protein", "grain", "green", "bowl", "clean"];
  const text = [meal.title, meal.description, meal.category, meal.dietType, meal.cuisine]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return healthyWords.some((word) => text.includes(word));
};

const mealIsBurgerLike = (meal: MealBehaviorItem) => {
  const burgerWords = ["burger", "sandwich", "patty", "bun", "cheese", "fries", "fast food"];
  const text = [meal.title, meal.description, meal.category, meal.cuisine].filter(Boolean).join(" ").toLowerCase();
  return burgerWords.some((word) => text.includes(word));
};

const extractMealsFromOrders = (orders: any[]) =>
  orders.flatMap((order) => {
    if (!Array.isArray(order.items)) return [];
    return order.items.map((item: any) => {
      const meal = item.meal ?? item;
      return createMealSummary(meal);
    });
  });

export function buildRecommendations(
  behavior: BehaviorState,
  orders: any[] = [],
  candidates: any[] = [],
  limit = 6
): RecommendationResult[] {
  const orderHistoryMeals = extractMealsFromOrders(orders);
  const engagedMeals = [...behavior.ordered, ...behavior.cart, ...behavior.wishlist, ...behavior.viewed, ...orderHistoryMeals];
  const orderedIds = new Set(orderHistoryMeals.map((item) => item.id));
  const orderedRecentIds = new Set(behavior.ordered.map((item) => item.id));
  const activityMeals = engagedMeals.length ? engagedMeals : [];

  const { categoryCount, keywordCount, dietCount } = buildPreferenceSignature(activityMeals);
  const topCategories = pickTopKeys(categoryCount, 3);
  const topKeywords = pickTopKeys(keywordCount, 6);
  const topDiets = pickTopKeys(dietCount, 2);

  const interestInBurger = topKeywords.some((word) => word.includes("burger")) || activityMeals.some(mealIsBurgerLike);
  const interestHealthy = topDiets.some((diet) => ["veg", "vegan", "healthy", "plant"].includes(diet)) || activityMeals.some(mealIsHealthy);

  const normalizedCandidates = candidates
    .map((meal: any) => createMealSummary(meal))
    .filter((meal) => meal.id && !orderedRecentIds.has(meal.id))
    .filter((meal, index, self) => self.findIndex((it) => it.id === meal.id) === index);

  const scored = normalizedCandidates
    .map((meal) => {
      const category = normalizeText(meal.category);
      const diet = normalizeText(meal.dietType);
      const mealText = [meal.title, meal.description, meal.category, meal.cuisine, meal.dietType].join(" ").toLowerCase();

      let score = 0;
      let reason = "Popular right now";

      if (topCategories.some((top) => category === top)) {
        score += 40;
        reason = "Popular in your favorite category";
      }

      const keywordMatches = topKeywords.filter((keyword) => mealMatchesKeyword(meal, keyword));
      if (keywordMatches.length) {
        score += Math.min(keywordMatches.length * 12, 36);
        reason = "Because you viewed similar meals";
      }

      if (topDiets.some((d) => d && diet.includes(d))) {
        score += 26;
        reason = "Based on your healthy choices";
      }

      if (interestInBurger && mealIsBurgerLike(meal)) {
        score += 28;
        reason = "Because you like fast-food favorites";
      }

      if (interestHealthy && mealIsHealthy(meal)) {
        score += 28;
        reason = "Recommended for your healthy food habits";
      }

      if (behavior.wishlist.some((item) => item.id === meal.id)) {
        score += 20;
        reason = "Similar to your wishlist picks";
      }

      if (behavior.cart.some((item) => item.id === meal.id)) {
        score += 20;
        reason = "Based on items recently added to your cart";
      }

      if (behavior.viewed.some((item) => item.id === meal.id)) {
        score += 16;
        reason = "Because you viewed something similar";
      }

      const ratingScore = Math.min((meal.rating ?? 4) * 8, 32);
      score += ratingScore;

      return { ...meal, score, reason };
    })
    .sort((a, b) => b.score - a.score)
    .filter((meal) => !orderedIds.has(meal.id));

  return scored.slice(0, limit);
}
