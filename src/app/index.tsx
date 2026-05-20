import {useColorScheme} from "nativewind";
import {useCallback} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function Index() {
  const {colorScheme, toggleColorScheme} = useColorScheme();

  const handleToggleColorScheme = useCallback(() => {
    toggleColorScheme();
  }, [toggleColorScheme]);

  return (
    <View className="flex-1 items-center justify-center bg-blue-50 dark:bg-black">
      <Text className="text-2xl font-bold mb-2 text-primary">
        Welcome to AI Byte Expo!
      </Text>
      <Text className="text-base text-gray-600">
        This is a dummy index screen using NativeWind.
      </Text>
      <View>
        <TouchableOpacity
          className="flex-row items-center p-4 rounded-lg mb-2"
          style={{
            backgroundColor: colorScheme === "light" ? "#e5e5e5" : "#1f2937",
          }}
          disabled={colorScheme === "light"}
          onPress={handleToggleColorScheme}
        >
          <Ionicons
            name="sunny"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <Text className="text-lg ml-3 dark:text-white">
            Light {colorScheme === "light" && "(Active)"}
          </Text>
          {colorScheme === "light" && (
            <Ionicons
              name="checkmark-circle"
              size={20}
              color="#155dfc"
              style={{marginLeft: "auto"}}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center p-4 rounded-lg mb-2"
          style={{
            backgroundColor: colorScheme === "dark" ? "#1f2937" : "#e5e5e5",
          }}
          disabled={colorScheme === "dark"}
          onPress={handleToggleColorScheme}
        >
          <Ionicons
            name="moon"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <Text className="text-lg ml-3 dark:text-white">
            Dark {colorScheme === "dark" && "(Active)"}
          </Text>
          {colorScheme === "dark" && (
            <Ionicons
              name="checkmark-circle"
              size={20}
              color="#155dfc"
              style={{marginLeft: "auto"}}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
