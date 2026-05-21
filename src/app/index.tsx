import { useCallback, useRef, useState } from "react";
import { Image, Text, View, Animated, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { useAuthStore } from "@/store/auth-store";
import { onboardingSwiperData } from "@/constants";

import "react-native-reanimated";

interface OnboardingDataType {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  image: any;
}

interface PaginationProps {
  activeIndex: number;
  total: number;
  onDone: () => void;
  isLast: boolean;
}

const Pagination = ({ activeIndex, total, onDone, isLast }: PaginationProps) => {
  const animations = useRef(
    Array.from({ length: total }, () => new Animated.Value(0))
  ).current;

  return (
    <View className="bg-white pb-6">
      <View className="mb-6 flex-row items-center justify-center">
        {animations.map((anim, index) => {
          const isActive = index === activeIndex;

          Animated.timing(anim, {
            toValue: isActive ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
          }).start();

          const width = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [6, 20],
          });

          const backgroundColor = anim.interpolate({
            inputRange: [0, 1],
            outputRange: ["#D1D5DB", "#1447e6"],
          });

          return (
            <Animated.View
              key={index}
              style={{
                width,
                height: 6,
                borderRadius: 3,
                backgroundColor,
                marginHorizontal: 4,
              }}
            />
          );
        })}
      </View>
      <View className="gap-3 px-5">
        {isLast && (
          <View onTouchEnd={onDone}>
            <RenderButton label="Get Started" />
          </View>
        )}
      </View>
    </View>
  );
};

const RenderSlide = ({ item }: { item: OnboardingDataType }) => (
  <SafeAreaView className="flex-1 bg-white">
    <View className="flex-1 justify-between">
      <View className="flex-1 items-center justify-center px-6">
        <Image source={item.image} resizeMode="contain" className="h-[60%] w-full" />
      </View>
      <View className="rounded-t-3xl px-6 pb-10 pt-6">
        <Text className="text-center text-2xl font-bold text-gray-900">{item.title}</Text>
        <Text className="mt-3 text-center text-base leading-6 text-gray-600">
          {item.description}
        </Text>
        <Text className="mt-2 text-center text-sm font-semibold text-primary">
          {item.shortDescription}
        </Text>
      </View>
    </View>
  </SafeAreaView>
);

const RenderButton = ({ label }: { label: string }) => (
  <TouchableOpacity className="mx-5 mb-6 items-center rounded-xl bg-blue-600 py-3 shadow-md">
    <Text className="text-lg font-semibold text-white">{label}</Text>
  </TouchableOpacity>
);

export default function Onboarding() {
  const [activeIndex, setActiveIndex] = useState(0);

  const { setHasCompletedOnboarding } = useAuthStore();

  const onDoneHandler = useCallback(() => {
    setHasCompletedOnboarding();
  }, [setHasCompletedOnboarding]);

  const memoizedRenderItem = useCallback(
    ({ item }: { item: OnboardingDataType }) => <RenderSlide item={item} />,
    []
  );

  const sliderRef = useRef<AppIntroSlider>(null);

  return (
    <>
      <AppIntroSlider
        ref={sliderRef}
        data={onboardingSwiperData}
        renderItem={memoizedRenderItem}
        onDone={onDoneHandler}
        onSlideChange={(index) => setActiveIndex(index)}
        renderPagination={() => (
          <Pagination
            activeIndex={activeIndex}
            total={onboardingSwiperData.length}
            isLast={activeIndex === onboardingSwiperData.length - 1}
            onDone={onDoneHandler}
          />
        )}
      />
      <StatusBar style="inverted" />
    </>
  );
}
