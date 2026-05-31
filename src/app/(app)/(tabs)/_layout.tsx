import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#1D4ED8" },
        headerTitleStyle: { color: "#fff", fontWeight: "600" },
        headerTintColor: "#fff",
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#fff",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#1D4ED8",
          borderTopWidth: 0,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <FontAwesome name="user" size={size} color={color} />
            ) : (
              <FontAwesome name="user-o" size={size} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Ionicons name="settings" size={size} color={color} />
            ) : (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
