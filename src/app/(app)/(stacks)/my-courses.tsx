import { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View, Pressable, useWindowDimensions, RefreshControl } from "react-native";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import { Search, SlidersHorizontal, X } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useDebounce } from "@/hooks/use-debounce";
import { useCategories } from "@/hooks/use-categories";
import { useMyCourses } from "@/hooks/use-courses";
import CourseCard from "@/components/courses/course-card";
import QuickLinks from "@/components/courses/quick-links";
import CategoryChip from "@/components/courses/category-chip";
import HomeSkeleton from "@/components/courses/home-skeleton";
import EmptyState from "@/components/courses/empty-state";
import CourseCardSkeleton from "@/components/courses/course-card-skeleton";
import Badge from "@/components/ui/badge";
import Input from "@/components/ui/input";
import Button, { getButtonIconColor } from "@/components/ui/button";
import { CourseDifficulty } from "@/types/course.type";

const difficultyOptions: CourseDifficulty[] = ["beginner", "intermediate", "expert"];

const MyCoursesScreen = () => {
  const { width } = useWindowDimensions();

  const insets = useSafeAreaInsets();

  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  const isTablet = width >= 768;

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string>();
  const [difficulty, setDifficulty] = useState<CourseDifficulty>();

  const debouncedSearch = useDebounce(search);

  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();

  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMyCourses({
    limit: 10,
    search: debouncedSearch,
    categoryId,
    difficulty,
  });

  const categories = useMemo(() => categoriesData?.categories ?? [], [categoriesData]);

  const courses = useMemo(
    () => data?.pages.flatMap((page) => page.result.items) ?? [],
    [data]
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const [filtersVisible, setFiltersVisible] = useState(false);

  const sheetTranslate = useSharedValue(500);

  useEffect(() => {
    sheetTranslate.value = withSpring(filtersVisible ? 0 : 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersVisible]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: sheetTranslate.value,
      },
    ],
  }));

  const clearFilters = () => {
    setCategoryId(undefined);
    setDifficulty(undefined);
    setSearch("");
  };

  const renderCourse = useCallback(
    ({ item }: any) => (
      <View className={isTablet ? "px-2" : ""}>
        <CourseCard course={item} />
      </View>
    ),
    [isTablet]
  );

  const renderHeader = useMemo(
    () => (
      <View className="mt-5 gap-6 px-4 pb-4 pt-2">
        <Input
          placeholder="Search courses..."
          value={search}
          onChangeText={setSearch}
          leftIcon={<Search size={18} color={isDark ? "white" : "black"} />}
        />
        <QuickLinks exclude="my" />
        <View>
          <Text className="mb-3 text-lg font-semibold dark:text-white">Categories</Text>
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
        <Text className="text-lg font-semibold dark:text-white">
          Courses ({courses.length})
        </Text>
      </View>
    ),
    [categories, categoryId, courses.length, isDark, search]
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;

    return (
      <View className="px-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </View>
    );
  };

  if (isLoading || categoriesLoading) {
    return <HomeSkeleton />;
  }

  return (
    <View className="flex-1">
      <FlashList
        data={courses}
        renderItem={renderCourse}
        numColumns={isTablet ? 2 : 1}
        key={isTablet ? "tablet" : "mobile"}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={<EmptyState onReset={clearFilters} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        contentContainerStyle={{
          paddingHorizontal: isTablet ? 8 : 0,
          paddingBottom: 120,
        }}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      />
      <Animated.View
        entering={FadeIn}
        className="absolute bottom-6 right-6"
        style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 0 }}
      >
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
            <View style={{ height: insets.bottom > 0 ? insets.bottom : 0 }} />
          </Animated.View>
        </>
      )}
    </View>
  );
};

export default MyCoursesScreen;
