import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Book, Bookmark, Compass, GraduationCap } from "lucide-react-native";
import { useColorScheme } from "nativewind";

import Card from "../ui/card";

interface QuickLinkProps {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
}

const QuickLink = ({ title, icon, onPress }: QuickLinkProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center rounded-2xl bg-neutral-100 p-4 dark:bg-neutral-700"
    >
      {icon}
      <Text className="mt-2 text-center text-sm font-medium dark:text-white">
        {title}
      </Text>
    </Pressable>
  );
};

interface QuickLinksProps {
  exclude: "courses" | "explore" | "my" | "bookmark";
}

const QuickLinks = memo(({ exclude }: QuickLinksProps) => {
  const { colorScheme } = useColorScheme();

  const color = colorScheme === "dark" ? "white" : "black";

  return (
    <Card>
      <Text className="mb-4 text-base font-semibold dark:text-white">Quick Access</Text>
      <View className="flex-row gap-3">
        {exclude !== "courses" && (
          <QuickLink
            title="Courses"
            icon={<Book size={22} color={color} />}
            onPress={() => router.push("/home")}
          />
        )}
        {exclude !== "explore" && (
          <QuickLink
            title="Explore"
            icon={<Compass size={22} color={color} />}
            onPress={() => router.push("/explore")}
          />
        )}
        {exclude !== "my" && (
          <QuickLink
            title="My Courses"
            icon={<GraduationCap size={22} color={color} />}
            onPress={() => router.push("/my-courses")}
          />
        )}
        {exclude !== "bookmark" && (
          <QuickLink
            title="Bookmarks"
            icon={<Bookmark size={22} color={color} />}
            onPress={() => router.push("/bookmarks")}
          />
        )}
      </View>
    </Card>
  );
});

QuickLinks.displayName = "QuickLinks";

export default QuickLinks;
