import { useCallback, useState } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ArrowRight } from "lucide-react-native";
import { View } from "react-native";

import { welcomeSwiperData } from "@/constants";
import { useAuthStore } from "@/store/auth-store";
import WelcomeSlide from "@/components/welcome/welcome-slide";
import Pagination from "@/components/welcome/pagination";
import Button from "@/components/ui/button";

const WelcomeScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const setHasCompletedOnboarding = useAuthStore(
    (state) => state.setHasCompletedOnboarding
  );

  const onDone = useCallback(() => {
    setHasCompletedOnboarding();
  }, [setHasCompletedOnboarding]);

  const renderItem = useCallback(
    ({ item }: { item: (typeof welcomeSwiperData)[0] }) => <WelcomeSlide item={item} />,
    []
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <AppIntroSlider
        data={welcomeSwiperData}
        renderItem={renderItem}
        onDone={onDone}
        onSlideChange={setActiveIndex}
        showDoneButton={false}
        showNextButton={false}
        dotStyle={{ display: "none" }}
        activeDotStyle={{ display: "none" }}
        renderPagination={() => (
          <>
            <Pagination activeIndex={activeIndex} total={welcomeSwiperData.length} />
            {activeIndex === welcomeSwiperData.length - 1 && (
              <View className="px-5 pb-8">
                <Button
                  title="Get Started"
                  size="lg"
                  onPress={onDone}
                  accessibilityLabel="Get Started"
                  rightIcon={<ArrowRight size={18} color="#FFFFFF" />}
                />
              </View>
            )}
          </>
        )}
      />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default WelcomeScreen;
