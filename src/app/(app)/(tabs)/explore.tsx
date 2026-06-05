import { useEffect, useMemo, useState } from "react";
import { Text, View, Pressable, useWindowDimensions, RefreshControl } from "react-native";
import Animated, {
  FadeIn,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import { Flame, Search, SlidersHorizontal, Sparkles, X } from "lucide-react-native";
import { useColorScheme } from "nativewind";

import { useDebounce } from "@/hooks/use-debouce";
import { useCategories } from "@/hooks/use-categories";
import { useRecommendedCourses, useTrendingCourses } from "@/hooks/use-courses";
import CourseCard from "@/components/courses/course-card";
import QuickLinks from "@/components/courses/quick-links";
import CategoryChip from "@/components/courses/category-chip";
import Badge from "@/components/ui/badge";
import Input from "@/components/ui/input";
import Button, { getButtonIconColor } from "@/components/ui/button";
import ExploreSkeleton from "@/components/courses/explore-skeleton";
import TrendingCourseCard from "@/components/courses/trending-course-card";
import { CourseDifficulty } from "@/types/course.type";

const difficultyOptions: CourseDifficulty[] = ["beginner", "intermediate", "expert"];

const ExploreScreen = () => {
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  const [search, setSearch] = useState("");

  const [categoryId, setCategoryId] = useState<string>();

  const [difficulty, setDifficulty] = useState<CourseDifficulty>();

  const debouncedSearch = useDebounce(search);

  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();

  const {
    data: trendingCoursesData,
    refetch: trendingRefetch,
    isLoading: trendingLoading,
    isRefetching: trendingRefetching,
  } = useTrendingCourses({
    limit: 10,
    search: debouncedSearch,
    categoryId,
    difficulty,
  });

  const {
    data: recommendedCoursesData,
    refetch: recommendedRefetch,
    isLoading: recommendedLoading,
    isRefetching: recommendedRefetching,
  } = useRecommendedCourses({
    limit: 10,
    search: debouncedSearch,
    categoryId,
    difficulty,
  });

  const trendingCourses = useMemo(
    () => trendingCoursesData?.result?.items ?? [],
    [trendingCoursesData]
  );

  const recommendedCourses = useMemo(
    () => recommendedCoursesData?.result?.items ?? [],
    [recommendedCoursesData]
  );

  const categories = useMemo(() => categoriesData?.categories ?? [], [categoriesData]);

  const [filtersVisible, setFiltersVisible] = useState(false);

  const translateY = useSharedValue(500);

  useEffect(() => {
    translateY.value = withSpring(filtersVisible ? 0 : 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersVisible]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const clearFilters = () => {
    setSearch("");
    setDifficulty(undefined);
    setCategoryId(undefined);
  };

  const onRefresh = async () => {
    await Promise.all([trendingRefetch(), recommendedRefetch()]);
  };

  if (categoriesLoading || trendingLoading || recommendedLoading) {
    return <ExploreSkeleton />;
  }

  return (
    <View className="flex-1">
      <FlashList
        data={recommendedCourses}
        numColumns={isTablet ? 2 : 1}
        key={isTablet ? "tablet" : "mobile"}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={trendingRefetching || recommendedRefetching}
            onRefresh={onRefresh}
          />
        }
        renderItem={({ item }) => (
          <View className={isTablet ? "px-2" : ""}>
            <CourseCard course={item} />
          </View>
        )}
        ListHeaderComponent={
          <View className="gap-6 px-4 pb-6 pt-2">
            <Animated.View entering={FadeInUp}>
              <Text className="text-3xl font-bold dark:text-white">Explore</Text>

              <Text className="mt-1 text-neutral-500">
                Discover your next learning journey
              </Text>
            </Animated.View>
            <Input
              placeholder="Search courses..."
              value={search}
              onChangeText={setSearch}
              leftIcon={<Search size={18} color={isDark ? "white" : "black"} />}
            />
            <QuickLinks exclude="explore" />
            <View>
              <Text className="mb-3 text-lg font-semibold dark:text-white">
                Categories
              </Text>
              <FlashList
                horizontal
                data={categories}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <CategoryChip
                    item={item}
                    selected={item.id === categoryId}
                    onPress={() =>
                      setCategoryId(item.id === categoryId ? undefined : item.id)
                    }
                  />
                )}
              />
            </View>
            <View>
              <View className="mb-4 flex-row items-center gap-2">
                <Flame size={18} color="#f97316" />
                <Text className="text-lg font-bold dark:text-white">
                  Trending Courses
                </Text>
              </View>
              <FlashList
                horizontal
                data={trendingCourses}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <TrendingCourseCard course={item} />}
              />
            </View>
            <View className="flex-row items-center gap-2">
              <Sparkles size={18} color="#1447e6" />
              <Text className="text-lg font-bold dark:text-white">
                Recommended For You
              </Text>
            </View>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <Animated.View entering={FadeIn} className="absolute bottom-6 right-6">
        <Button
          title="Filters"
          leftIcon={<SlidersHorizontal size={18} color={getButtonIconColor()} />}
          onPress={() => setFiltersVisible(true)}
        />
      </Animated.View>
      {filtersVisible && (
        <>
          <Pressable
            className="absolute inset-0 bg-black/40"
            onPress={() => setFiltersVisible(false)}
          />
          <Animated.View
            style={sheetStyle}
            className="absolute bottom-0 left-0 right-0 rounded-t-[32px] bg-white p-6 dark:bg-neutral-950"
          >
            <View className="mb-6 flex-row items-center justify-between">
              <Text className="text-xl font-bold dark:text-white">Filters</Text>
              <Pressable onPress={() => setFiltersVisible(false)}>
                <X size={22} color={isDark ? "white" : "black"} />
              </Pressable>
            </View>
            <Text className="mb-3 font-semibold dark:text-white">Difficulty</Text>
            <View className="mb-6 flex-row flex-wrap gap-3">
              {difficultyOptions.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => setDifficulty(difficulty === item ? undefined : item)}
                >
                  <Badge
                    label={item}
                    variant={difficulty === item ? "primary" : "secondary"}
                  />
                </Pressable>
              ))}
            </View>
            <Button title="Clear Filters" variant="outline" onPress={clearFilters} />
          </Animated.View>
        </>
      )}
    </View>
  );
};

export default ExploreScreen;
