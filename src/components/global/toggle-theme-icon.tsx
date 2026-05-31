import { useColorScheme } from "nativewind";
import { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";

import Button from "../ui/button";

const ToggleThemeIcon = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const handleToggleColorScheme = useCallback(() => {
    toggleColorScheme();
  }, [toggleColorScheme]);

  return (
    <Button
      title=""
      onPress={handleToggleColorScheme}
      leftIcon={
        <Ionicons
          name={colorScheme === "dark" ? "moon" : "sunny"}
          size={24}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      }
      className="max-w-fit"
      variant="outline"
      fullWidth={false}
    />
  );
};

export default ToggleThemeIcon;
