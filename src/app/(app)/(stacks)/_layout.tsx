import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";

const StackLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#000" },
          headerTitleStyle: { color: "white" },
          headerLeft: () => (
            <TouchableOpacity
              className="mr-5 items-center justify-center"
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen name="achievements" options={{ title: "Achievements" }} />
      </Stack>
    </>
  );
};

export default StackLayout;
