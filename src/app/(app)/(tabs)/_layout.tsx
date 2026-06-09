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

import { useNotifications } from "@/hooks/use-notifications";
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
        {count > 99 ? "99+" : count}
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

  const { data } = useNotifications();

  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: bg },
        headerStatusBarHeight: insets.top,
        headerTitleStyle: {
          fontWeight: "800",
          fontSize: 22,
          color: isDark ? "#fff" : "#111827",
        },
        headerRight: () => <HeaderStats />,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: isDark ? "#71717a" : "#9ca3af",
        tabBarStyle: {
          backgroundColor: bg,
          borderTopColor: border,
          height: 55 + (insets.bottom > 0 ? insets.bottom : 0),
          paddingTop: 0,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 0,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
          marginBottom: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
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
              <NotificationBadge count={data?.pages?.[0]?.result?.unreadCount ?? 0} />
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
