import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text } from "react-native";

import AnimatedTabIcon from "@/components/layout/animated-tab-icon";
import HeaderStats from "@/components/layout/header-stats";

const NotificationBadge = ({ count }: { count: number }) => {
  if (!count) return null;
  return (
    <View className="absolute -right-2 -top-1.5 z-10 h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1">
      <Text
        className="text-[10px] font-bold leading-[13px] text-white"
        numberOfLines={1}
        ellipsizeMode="clip"
      >
        {count > 10 ? "10+" : count}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const insets = useSafeAreaInsets();

  const primary = "#1447e6";

  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  const bg = isDark ? "#09090b" : "#ffffff";

  const border = isDark ? "#323234" : "#e5e7eb";

  const notificationsCount = 3;

  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: bg },
        headerTitleStyle: {
          fontWeight: "700",
          color: isDark ? "#fff" : "#111827",
        },
        headerRight: () => <HeaderStats />,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: isDark ? "#71717a" : "#9ca3af",
        tabBarStyle: {
          backgroundColor: bg,
          borderTopColor: border,
          height: 70 + insets.bottom,
          paddingTop: 8,
          paddingBottom: insets.bottom,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon focused={focused}>
              {focused ? (
                <Entypo name="home" size={size} color={primary} />
              ) : (
                <AntDesign name="home" size={size} color={color} />
              )}
            </AnimatedTabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <MaterialIcons
                name="explore"
                size={size}
                color={focused ? primary : color}
              />
            </AnimatedTabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size, focused }) => (
            <View className="h-[24px] w-[24px] items-center justify-center">
              <AnimatedTabIcon focused={focused}>
                {focused ? (
                  <Ionicons name="notifications" size={size} color={primary} />
                ) : (
                  <Ionicons name="notifications-outline" size={size} color={color} />
                )}
              </AnimatedTabIcon>
              <NotificationBadge count={notificationsCount} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon focused={focused}>
              {focused ? (
                <FontAwesome name="user" size={size} color={primary} />
              ) : (
                <FontAwesome name="user-o" size={size} color={color} />
              )}
            </AnimatedTabIcon>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
