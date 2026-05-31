import { memo } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { Image } from "expo-image";

interface Props {
  item: {
    id: number;
    title: string;
    description: string;
    shortDescription: string;
    image: any;
  };
}

const WelcomeSlide = memo(({ item }: Props) => {
  const { width, height } = useWindowDimensions();

  const imageHeight = Math.min(height * 0.45, 420);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        <Image
          source={item.image}
          style={{
            width: width * 0.8,
            height: imageHeight,
          }}
          contentFit="contain"
          transition={300}
        />
      </View>

      <View className="px-6 pb-12">
        <Text className="text-center text-3xl font-bold text-neutral-900">
          {item.title}
        </Text>

        <Text className="mt-4 text-center text-base leading-7 text-neutral-500">
          {item.description}
        </Text>

        <Text className="mt-3 text-center text-sm font-semibold text-primary">
          {item.shortDescription}
        </Text>
      </View>
    </View>
  );
});

WelcomeSlide.displayName = "WelcomeSlide";

export default WelcomeSlide;
